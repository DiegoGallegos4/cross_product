from flask import Blueprint, render_template, jsonify

main = Blueprint('main', __name__, url_prefix='/')


@main.route('api/health')
def health():
    response = {
        "message": "ok"
    }
    return jsonify(response)


@main.route('')
def home():
    return render_template('home.html')
