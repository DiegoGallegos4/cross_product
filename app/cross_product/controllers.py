from flask import Blueprint, jsonify, render_template, request

from app import db
from .models import CrossProduct
from .serializers import cross_product_schema, cross_products_schema

cross_product = Blueprint('cross_product', __name__, url_prefix='/cross_product')


@cross_product.route('/api/compute', methods=['GET', 'POST'])
def api_compute():
    def compute_cross_product(v1, v2):
        return [
            v1[1] * v2[2] - v2[1] * v1[2],
            v2[0] * v1[2] - v1[0] * v2[2],
            v1[0] * v2[1] - v2[0] * v1[1]
        ]

    if request.method == 'GET':
        cross_products = CrossProduct.query.all()
        results = cross_products_schema.dump(cross_products)
        return jsonify({'results': results.data})
    elif request.method == 'POST':
        try:
            if not request.is_json:
                return jsonify({'error': 'Invalid request content-type.' +
                                'Must be application/json'}), 400
            else:
                data = request.get_json()
                vector1 = data['vector1']
                vector2 = data['vector2']
        except KeyError as e:
            response = {}
            response[e] = "Missing or incorrectly formatted data supplied."
            return jsonify(response), 400
        # Validation
        _, errors = cross_product_schema.load(
            {'vector1': vector1, 'vector2': vector2, 'result': []})
        if errors:
            return jsonify({'message': errors}), 400

        result = compute_cross_product(vector1, vector2)
        cp = CrossProduct(vector1=vector1, vector2=vector2, result=result)
        db.session.add(cp)
        db.session.commit()

        return cross_product_schema.jsonify(cp)


@cross_product.route('/')
def compute():
    return render_template('cross_product/compute.html')
