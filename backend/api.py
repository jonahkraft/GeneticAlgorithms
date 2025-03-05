from flask import Flask, request, jsonify
from app import app


@app.route("/api/echo", methods = ["POST"])
def echo():
    """Echo the received message back to client"""
    msg = request.json
    print(f"Echo: {msg}")
    return jsonify(msg), 200

