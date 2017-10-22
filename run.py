import os

from app import app


port = int(os.getenv('PORT')) or 8080

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=port)
