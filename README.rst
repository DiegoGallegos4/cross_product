########
CrossCon
########

Folder Structure
----------------

The app directory contains all flask modules. Each module is composed by:

* Controllers (controllers.py) - view and api handlers
* Models (models.py) - SQLAlchemy Models
* Serializers (serializers.py) - Marshmallow Serializers


Static files and templates are defined in its own directories:

* **static**: it contains directories for css, js and images. React files will be on js/build.
* **templates**: each module has it own directory. (i.e cross_product has a directory with the same in name in templates)

React files and automation tooling for development can be found on :
* ui: containes __tests__ directory for jest tests and src directory for javascript files


API
---

- Health endpoint: **/api/health**
- Cross product endpoint: **/cross_product/api/compute**

Docker
------

Run docker-compose services: ::

  docker-compose run 

The docker-compose services are:

* **Web**: Flask app serve by gunicorn http server.
* **Proxy**: Nginx image that serves as a proxy to the web service and loads backend static files.
* **Db**: Postgres database.

Open browser and visit `<http://127.0.0.1:8003>`_

NPM scripts
-----------

Run tests: ::

  npm run tests

Run development webpack: ::

  npm run dev

Build production js files : ::

  npm run build-prod


.. image:: ./merlin/static/merlin.png
   :align: center


Development
-----------

Build javascript packages: ::

  yarn install

Or: ::

  npm install
