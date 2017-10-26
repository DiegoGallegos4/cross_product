import os

from app import create_app

port_env = os.getenv('PORT')
port = 8080
if port_env:
    port = int(port_env)

if __name__ == '__main__':
    app = create_app('config.Development')

    app.run(debug=True, host='0.0.0.0', port=port)
