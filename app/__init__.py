import os

from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URI') or 'postgresql://dev:dev@localhost:5432/cross_product'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)

from app.cross_product.controllers import cross_product as cross_product_module
from app.config.controllers import main as main_module

# Register blueprints
app.register_blueprint(cross_product_module)
app.register_blueprint(main_module)
db.create_all()
