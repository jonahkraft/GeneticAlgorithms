from flask import Flask, request, jsonify

"""Used to handle user tokens and protect routes"""
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


from app import app as api

import sqlite3

import database as db

api.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(api)

@api.route("/api/echo", methods = ["POST"])
@jwt_required()
def echo():
    """Echo the received message back to client"""
    current_user = get_jwt_identity()

    msg = request.json
    print(f"Echo sent by {current_user}: {msg}")
    return jsonify(msg), 200

@api.route("/api/login", methods = ["POST"])
def login():
    """Handles login request

    :param JSON
    {
       "username": "<username>",
       "password": "<password>"
    }

    :returns JSON
    {
        "registered": bool,
        "passwordCorrect": bool,
    }

    """
    connection = sqlite3.connect("db\\users.db")
    
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    response = {
        "registered": False,
        "passwordCorrect": False,
    }

    if not db.user_exists(username, connection):
        return jsonify(response), 401

    response["registered"] = True

    if not db.check_password(username, password, connection):
       return jsonify(response), 401 

    response["passwordCorrect"] = True

    access_token = create_access_token(identity=username)
    return jsonify(response, access_token=access_token)

@api.route("/api/register", methods = ["POST"])
def register():
    """Handles register request
    
    :param JSON
    {
        "username": "<username>",
        "password": "<password>"
    }

    :returns JSON
    {
        "success"
    }

    """
