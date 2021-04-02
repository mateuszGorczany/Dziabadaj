from flask import Flask, send_from_directory
from flask_restx import api
from apiv1 import blueprint as apiv1
import os


app = Flask(__name__, static_folder='../client/build')
# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.config["SECRET_KEY"] = "superSecret"

    app.register_blueprint(apiv1)
    app.run(host="0.0.0.0", port=1999)
