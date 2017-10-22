from app import ma
from .models import CrossProduct


class CrossProductSchema(ma.ModelSchema):
    class Meta:
        model = CrossProduct
    result = ma.List(ma.Number())
    vector1 = ma.List(ma.Number())
    vector2 = ma.List(ma.Number())

cross_product_schema = CrossProductSchema()
cross_products_schema = CrossProductSchema(many=True)
