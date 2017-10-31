from flask import Flask, jsonify
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from werkzeug.exceptions import HTTPException

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()


def create_app(config=None):
    app = Flask(__name__)
    if config:
        app.config.from_object(config)
    else:
        app.config.from_object('config.Development')

    # init dependencies
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    # set error handlers
    set_error_handler(app)

    # register blueprints
    from app.cross_product.controllers import cross_product as cross_product_module
    from app.config.controllers import main as main_module

    app.register_blueprint(cross_product_module)
    app.register_blueprint(main_module)

    return app


def set_error_handler(app):
    @app.errorhandler(Exception)
    def internal_server_error(error):
        code = 500
        if isinstance(error, HTTPException):
            code = error.code
        return jsonify(error=str(error)), code
