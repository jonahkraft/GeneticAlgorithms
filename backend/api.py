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
        "password_correct": bool,
        "access_token": "<token>"
    }

    """
    
    data = request.get_json()

    username = data["username"]
    password = data["password"]

    response = {
        "registered": False,
        "password_correct": False,
        "access_token": ""
    }

    if not db.user_exists(username, "db/users.db"):
        return jsonify(response), 200

    response["registered"] = True

    if not db.check_password(username, password, "db/users.db"):
       return jsonify(response), 200 

    response["password_correct"] = True

    response["access_token"] = create_access_token(identity=username)

    return jsonify(response), 200

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

@api.route("/api/protected_test", methods = ["POST"])
@jwt_required()
def protected_test():
     # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

