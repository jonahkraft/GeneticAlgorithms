from flask import Flask, jsonify, send_from_directory, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
import json
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)  # Allow frontend to communicate with backend

import api

protected_paths_analyst = ["register.html"]  # Pfade auf den der Analyst keinen Zugriff haben soll
protected_paths_simulation = ["register.html"]  # Pfad auf den der Simulationsexperte keinen Zugriff haben soll
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path: str):
    if path in protected_paths_analyst or path in protected_paths_simulation:
        return serve_protected_react(path)
    else:
        return serve_unprotected_react(path)

@jwt_required()
def serve_protected_react(path: str):
    current_user = get_jwt_identity()
    absolute_path = os.path.join(app.static_folder, path)
    if os.path.exists(absolute_path):
        if current_user == "admin":
            return send_from_directory(app.static_folder, path)
        if current_user == "data_analyst" and path not in protected_paths_analyst:
            return send_from_directory(app.static_folder, "index.html")
        if current_user == "simulation_expert" and path not in protected_paths_simulation:
            return send_from_directory(app.static_folder, "index.html")
        return send_from_directory(app.static_folder, "path")
    return send_from_directory(app.static_folder, "index.html")

def serve_unprotected_react(path: str):
    absolute_path = os.path.join(app.static_folder, path)
    if os.path.exists(absolute_path):
        return send_from_directory(app.static_folder, path)


if __name__ == "__main__":
    app.run(debug=True)
