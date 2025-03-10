from flask import Flask, jsonify, send_from_directory, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)  # Allow frontend to communicate with backend

# import api

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path: str):
    """Serve the react frontend (only called by flask)"""
    if path:
        absolute_path = os.path.join(app.static_folder, path)

        if os.path.exists(absolute_path):
            return send_from_directory(app.static_folder, path)

    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(ssl_context=('cert.pem', 'key.pem'))
    #app.run(debug=True)
