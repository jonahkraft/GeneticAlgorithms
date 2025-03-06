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


def login(username: str, password: str):
    response = {
        "registered": False,
        "password_correct": False,
        "access_token": ""
    }

    if not db.user_exists(username):
        return jsonify(response), 401

    response["registered"] = True

    if not db.check_password(username, password):
       return jsonify(response), 401 

    response["password_correct"] = True

    response["access_token"] = create_access_token(identity=username)

    return jsonify(response), 200

def register(username: str, password: str, role: str):
    possible_roles = { "data_analyst", "administrator", "simulation_expert" }

    response = {
        "success": False,
        "already_registered": False,
        "invalid_role": False
    }

    response["invalid_role"] = role not in possible_roles

    if db.user_exists(username):
        response["already_registered"] = True

    if response["invalid_role"] or response["already_registered"]:
        return jsonify(response), 400

    db.add_user(username, password, role)

    response["success"] = True

    return jsonify(response), 200


@api.route("/api/echo", methods = ["POST"])
@jwt_required()
def api_echo():
    """Echo the received message back to client"""
    current_user = get_jwt_identity()

    msg = request.json
    print(f"Echo sent by {current_user}: {msg}")
    return jsonify(msg), 200

@api.route("/api/login", methods = ["POST"])
def api_login():
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
    
    return login(username, password)

@api.route("/api/register", methods = ["POST"])
@jwt_required()
def api_register():
    """Handles register request
    
    :param JSON
    {
        "username": "<username>",
        "password": "<password>",
        "role": "data_analyst | simulation_expert | administrator"
    }

    :returns JSON
    {
        "success": bool,
        "already_registered": bool,
        "invalid_role": bool
    }

    """
    
    current_user = get_jwt_identity()

    if db.get_role(current_user) != "admin":
        return jsonify({}), 401

    data = request.get_json()

    username = data["username"]
    password = data["password"]
    role = data["role"]

    return register(username, password, role) 


@api.route("/api/get_generations", methods = ["GET"])
@jwt_required()
def api_get_generations():
    current_user = get_jwt_identity()
    
    role = db.get_role(current_user)

    allowed_roles = { "data_analyst", "administrator" }

    if role not in allowed_roles:
        return jsonify({}), 401

    with open("./results/generations.csv", "r") as file:
        return jsonify({ "content": file.read() }), 200

    return jsonify({}), 404 


@api.route("/api/protected_test", methods = ["POST"])
@jwt_required()
def api_protected_test():
     # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify(logged_in_as=current_user), 200

