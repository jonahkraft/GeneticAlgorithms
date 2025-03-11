from flask import Flask, jsonify, send_from_directory, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
import json
import os
import database as db


app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)  # Allow frontend to communicate with backend

import api

# ToDo: Add protected paths
# Pfade auf denen Analyst bzw Simulationsexperte keinen Zugriff haben soll, wenn nur Admin zugriff haben soll
# path in beide Listen eintragen.
protected_paths_analyst = [register.html]
protected_paths_simulation = [register.html ]

# Handelt alle eingehenden Routen und leitet diese an die entsprechenden Funktionen weiter
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path: str):
    if path:
        if path in protected_paths_analyst or path in protected_paths_simulation:
            return serve_protected_react(path)
        else:
            return serve_unprotected_react(path)
    return send_from_directory(app.static_folder, "index.html")

# Behandelt die Routen welche einen Login benötigen bzw. handelt die Rollenberechtigung
@jwt_required()
def serve_protected_react(path: str):
    current_user = get_jwt_identity()
    role = db.get_role(current_user)
    absolute_path = os.path.join(app.static_folder, path)
    if os.path.exists(absolute_path):
        if role == "data_analyst" and path in protected_paths_analyst:
            return send_from_directory(app.static_folder, "index.html")
        if role == "simulator" and path in protected_paths_simulation:
            return send_from_directory(app.static_folder, "index.html")
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

# Behandelt unprotected Routes
def serve_unprotected_react(path: str):
    absolute_path = os.path.join(app.static_folder, path)
    if os.path.exists(absolute_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(ssl_context=('cert.pem', 'key.pem'))
    #app.run(debug=True)
