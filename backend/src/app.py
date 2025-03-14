from flask import Flask, jsonify, send_from_directory, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
import json
import os
import database as db

app = Flask(__name__, static_folder="../static", template_folder="templates")
CORS(app)  # Allow frontend to communicate with backend

import api

# ToDo: Add protected paths
# Pfade auf denen Analyst bzw Simulationsexperte keinen Zugriff haben soll, wenn nur Admin zugriff haben soll
# path in beide Listen eintragen.
protected_paths_analyst = ["register.html"]
protected_paths_simulation = ["register.html"]

# Handelt alle eingehenden Routen und leitet diese an die entsprechenden Funktionen weiter
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path: str):
    if path:
        absolute_path = os.path.join(app.static_folder, path)
        if os.path.exists(absolute_path):
            return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(ssl_context=('cert.pem', 'key.pem'))
    #app.run(debug=True)
