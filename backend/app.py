from flask import Flask, jsonify, send_from_directory, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__, static_folder="static/build", template_folder="templates")
CORS(app)  # Allow frontend to communicate with backend

@app.route("/api/echo", methods = ["POST"])
def api_echo():
    msg = request.json
    print(f"Echo: {msg}")
    return jsonify(msg), 200

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path:
        absolute_path = os.path.join(app.static_folder, path)

        if os.path.exists(absolute_path):
            return send_from_directory(app.static_folder, path)

    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)
