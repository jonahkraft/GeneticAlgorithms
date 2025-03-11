from flask import Flask, request, jsonify

"""Used to handle user tokens and protect routes"""
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from app import app as api

import database as db
from codesnippets import main as sim

api.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(api)


def login(username: str, password: str):
    response = {
        "registered": False,
        "password_correct": False,
        "access_token": "",
        "role": "simulator"
    }

    if not db.user_exists(username):
        return jsonify(response), 401

    response["registered"] = True

    if not db.check_password(username, password):
        return jsonify(response), 401

    response["password_correct"] = True

    response["access_token"] = create_access_token(identity=username)
    response["role"] = db.get_role(username)

    return jsonify(response), 200


def register(username: str, password: str, role: str):
    possible_roles = {"data_analyst", "administrator", "simulation_expert"}

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


@api.route("/api/echo", methods=["POST"])
@jwt_required()
def api_echo():
    """Echo the received message back to client"""
    current_user = get_jwt_identity()

    msg = request.json
    print(f"Echo sent by {current_user}: {msg}")
    return jsonify(msg), 200


@api.route("/api/login", methods=["POST"])
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
        "access_token": "<token>",
        "role": "data_analyst | simulation_expert | administrator"
    }

    """

    data = request.get_json()

    username = data["username"]
    password = data["password"]

    return login(username, password)


@api.route("/api/register", methods=["POST"])
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

    if db.get_role(current_user) != "administrator":
        return jsonify({}), 401

    data = request.get_json()

    username = data["username"]
    password = data["password"]
    role = data["role"]

    return register(username, password, role)


@api.route("/api/delete_user", methods=["POST"])
@jwt_required()
def api_delete_user():
    """Handles register request

    :param JSON
    {
        "username": "<username>"
    }

    :returns JSON
    {
        "success": bool
    }

    """

    current_user = get_jwt_identity()

    if db.get_role(current_user) != "administrator":
        return jsonify({}), 401

    data = request.get_json()
    username = data["username"]

    if db.delete_user(username):
        return jsonify({}), 200

    return jsonify({}), 404


@api.route("/api/change_password", methods=["POST"])
@jwt_required()
def api_change_password():
    """Changes the users password 

    :param JSON
    {
        "new_password": "<new password>"
    }

    :returns JSON
    {
        "success": bool
    }

    """

    current_user = get_jwt_identity()
    data = request.get_json()

    new_password = data["new_password"]

    if db.change_password(current_user, new_password):
        return jsonify({}, 200)
    return jsonify({}, 404)


@api.route("/api/get_generations", methods=["GET"])
@jwt_required()
def api_get_generations():
    current_user = get_jwt_identity()

    role = db.get_role(current_user)

    allowed_roles = {"data_analyst", "administrator"}

    if role not in allowed_roles:
        return jsonify({}), 401

    with open("./results/generations.csv", "r") as file:
        return jsonify({"content": file.read()}), 200

    return jsonify({}), 404


@api.route("/api/start_simulation", methods=["POST"])
@jwt_required()
def api_start_simulation():
    """Starts a simulation with the given parameters

    :param JSON
    {
        "population_size": int,
        "simulation_seed": int,
        "generation_count": int,
        "strategy": int,
        "aep": float,
        "elite_count": int,
        "alien_count": int,
        "weights": list[int]
    }

    :returns JSON
    {

    }

    """
    current_user = get_jwt_identity()

    role = db.get_role(current_user)
    allowed_roles = {"data_analyst", "administrator", "simulator"}

    if role not in allowed_roles:
        return jsonify({}), 401

    data = request.get_json()

    population_size = data["population_size"]
    simulation_seed = data["simulation_seed"]
    generation_count = data["generation_count"]
    strategy = data["strategy"]
    aep = data["aep"]
    elite_count = data["elite_count"]
    alien_count = data["alien_count"]
    weights = data["weights"]

    simulation_interface = sim.Schnittstelle(population_size, simulation_seed, weights)

    simulation_interface.evolute(generation_count, strategy, aep, elite_count, alien_count)

    simulation_interface.results()

    db.add_experiment_data_from_csv("./results/generations.csv")

    return jsonify({}), 200


@api.route("/api/get_simulation_data", methods = ["POST"])
@jwt_required()
def api_get_simulation_data():
    """Requests historic simulation data for further analysis

    :param JSON
    {
        "columns": list[str],
        "row_constraints": list[str]
    }

    :returns JSON
    {
        "content" : csv file
    }

    """
    current_user = get_jwt_identity()

    role = db.get_role(current_user)
    allowed_roles = {"data_analyst", "administrator"}

    if role not in allowed_roles:
        return jsonify({}), 401

    data = request.get_json()

    columns = data["columns"]
    row_constraints = data["row_constraints"]

    try:
        db.export_experiment_data_to_csv("./results/export_data.csv", columns, row_constraints)
    except sqlite3.Error as e:
        return jsonify({"msg": e}), 400

    with open("./results/export_data.csv", "r") as file:
        return jsonify({"content": file.read()}), 200

    return jsonify({}), 404


@api.route("/api/protected_test", methods=["POST"])
@jwt_required()
def api_protected_test():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify(logged_in_as=current_user), 200
