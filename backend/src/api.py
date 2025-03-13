from flask import Flask, request, jsonify

"""Used to handle user tokens and protect routes"""
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from app import app as api

import database as db
from simulation import main as sim

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
        db.write_log(f"Failed to log in user '{username}', because user does not exists")
        return jsonify(response), 401

    response["registered"] = True

    if not db.check_password(username, password):
        db.write_log(f"Failed to log in user '{username}', because password was incorrect")
        return jsonify(response), 401

    response["password_correct"] = True

    response["access_token"] = create_access_token(identity=username)
    response["role"] = db.get_role(username)

    db.write_log(f"Logged in user '{username}'")
    return jsonify(response), 200

def register(username: str, password: str, role: str):
    possible_roles = {"data_analyst", "administrator", "simulator"}
    response = {
        "success": False,
        "already_registered": False,
        "invalid_role": False
    }

    response["invalid_role"] = role not in possible_roles

    if db.user_exists(username):
        response["already_registered"] = True

    if response["invalid_role"] or response["already_registered"]:
        db.write_log(f"Failed to register user '{username}', because user already exists")
        return jsonify(response), 400

    db.add_user(username, password, role)

    response["success"] = True

    db.write_log(f"Registered user '{username}'")
    return jsonify(response), 200

@api.route("/api/login", methods=["POST"])
def api_login():
    """Handles login request (No Authorization required)

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
        "role": "data_analyst | simulator | administrator"
    }

    """

    data = request.get_json()

    try:
        username = data["username"]
        password = data["password"]
    except NameError as e:
        db.write_log(f"Failed to login user, because of {e}")
        return jsonify({"msg": f"{e}"}, 400)

    return login(username, password)

@api.route("/api/register", methods=["POST"])
@jwt_required()
def api_register():
    """Handles register request (Authorization required: administrator)

    :param JSON
    {
        "username": "<username>",
        "password": "<password>",
        "role": "<data_analyst | simulator | administrator>"
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

    try:
        username = data["username"]
        password = data["password"]
        role = data["role"]
    except NameError as e:
        db.write_log(f"Failed to register user, because of: {e}")
        return jsonify({"msg": f"{e}"}, 400)

    return register(username, password, role)

@api.route("/api/delete_user", methods=["POST"])
@jwt_required()
def api_delete_user():
    """Deletes a user (Authorization required: administrator)

    :param JSON
    {
        "username": "<username>"
    }

    :returns JSON { }

    """

    current_user = get_jwt_identity()

    data = request.get_json()
    try:
        username = data["username"]
    except NameError as e:
        db.write_log(f"Failed to delete user, because of: {e}")
        return jsonify({"msg": f"{e}"}, 400)

    if db.get_role(current_user) != "administrator":
        db.write_log(f"Failed to delete user '{username}', because {current_user} is no administrator")
        return jsonify({}), 401

    if db.delete_user(username):
        db.write_log(f"Deleted user '{username}'")
        return jsonify({}), 200

    return jsonify({}), 404

@api.route("/api/change_password", methods=["POST"])
@jwt_required()
def api_change_password():
    """Changes the users password  

    :param JSON
    {
        "username": "<username>",
        "old_password": "<old password>",
        "new_password": "<new password>"
    }

    :returns JSON
    {
        "msg": "<error message, if failed>"
    }

    """

    current_user = get_jwt_identity()
    data = request.get_json()

    try:
        username = data["username"]
        old_password = data["old_password"]
        new_password = data["new_password"]
    except NameError as e:
        db.write_log(f"Failed to change password, because of: {e}")
        return jsonify({"msg": f"{e}"}, 400)

    if current_user == username:
        if db.check_password(username,old_password):
            if db.change_password(username,new_password):
                db.write_log(f"Changed password of '{username}'")
                return jsonify({}, 200)
            else:
                db.write_log(f"Failed change '{username}'s password, because user does not exist")
                return jsonify({"msg": f"Cannot find user '{username}'"}, 404)
        else:
            db.write_log(f"Failed change '{username}'s password, because old password was incorrect or user does not exist")
            return jsonify({"msg": "Invalid old password or user does not exist"}, 401)
    else:
        if db.get_role(current_user) == "administrator":
            if db.change_password(username,new_password):
                db.write_log(f"Changed '{username}'s password")
                return jsonify({}, 200)
            else:
                db.write_log(f"Failed change '{username}'s password, because user does not exist")
                return jsonify({"msg": f"Cannot find user '{username}'"}, 404)
        else:
            db.write_log(f"Failed change '{username}'s password, because only administrators can change other users passwords")
            return jsonify({"msg": f"Only administrators can change other users passwords"}, 401)

@api.route("/api/change_username", methods=["POST"])
@jwt_required()
def api_change_username():
    """Changes the users username  

    :param JSON
    {
        "old_username": "<old username>",
        "new_username": "<old username>"
    }

    :returns JSON
    {
        "msg": "<error message, if failed>"
    }

    """

    current_user = get_jwt_identity()
    data = request.get_json()

    try:
        old_username = data["old_username"]
        new_username = data["new_username"]
    except NameError as e:
        db.write_log(f"Failed to change username, because of: {e}")
        return jsonify({"msg": f"{e}"}, 400)

    if current_user == old_username:
        if db.change_username(old_username, new_username):
            db.write_log(f"Changed {old_username} to {new_username}")
            return jsonify({}, 200)
        else:
            db.write_log(f"Failed to change {old_username}, because user does not exist")
            return jsonify({"msg": f"Cannot find user '{old_username}'"}, 404)
    else:
        if db.get_role(current_user) == "administrator":
            if db.change_username(old_username, new_username):
                db.write_log(f"Changed {old_username} to {new_username}")
                return jsonify({}, 200)
            else:
                db.write_log(f"Failed to change {old_username}, because user does not exist")
                return jsonify({"msg": f"Cannot find user '{old_username}'"}, 404)
        else:
            db.write_log(f"Failed to change {old_username}, because only administrators can change other users usernames")
            return jsonify({"msg": f"Only administrators can change other users usernames"}, 401)

@api.route("/api/change_role", methods=["POST"])
@jwt_required()
def api_change_role():
    """Changes the users role  

    :param JSON
    {
        "username": "<username>",
        "role": "<role>"
    }

    :returns JSON
    {
        "msg": "<error message, if failed>"
    }

    """

    current_user = get_jwt_identity()
    data = request.get_json()

    try:
        username = data["username"]
        role = data["role"]
    except NameError as e:
        db.write_log(f"Failed to change role of '{username}', because of: {e}")
        return jsonify({"msg": f"{e}"}, 400)

    allowed_roles = {"data_analyst", "administrator", "simulator"}

    if role not in allowed_roles:
        db.write_log(f"Failed to change role of '{username}', because role '{role}' is invalid") 
        return jsonify({"msg": f"Invalid role '{role}'"}), 400

    if db.get_role(current_user) != "administrator":
        db.write_log(f"Failed to change change role of '{username}', because {current_user} is no administrator")
        return jsonify({"msg": f"Only administrators can change user roles"}, 401)

    if db.change_role(username, role):
        db.write_log(f"Changed role of '{username}' to '{role}'")
        return jsonify({}, 200)
    else:
        db.write_log(f"Failed to change role of '{username}', because user does not exist")
        return jsonify({"msg": f"Cannot find user '{username}'"}, 404)

@api.route("/api/start_simulation", methods=["POST"])
@jwt_required()
def api_start_simulation():
    """Starts a simulation with the given parameters (Authorization required: administrator, data_analyst, simulator)

    :param JSON
    {
        "population_size": int,
        "simulation_seed": int,
        "generation_count": int,
        "strategy": int,
        "aep": float,
        "elite_count": int,
        "alien_count": int,
        "weights": list[float]
    }

    :returns JSON 
    {
    "eperiment_id": int
    }

    """
    current_user = get_jwt_identity()

    role = db.get_role(current_user)
    allowed_roles = {"data_analyst", "administrator", "simulator"}

    if role not in allowed_roles:
        db.write_log(f"Failed to start simulation, because {current_user} is not allowed to do start simulations")
        return jsonify({}), 401

    data = request.get_json()

    try:
        population_size = int(data["population_size"])
        simulation_seed = int(data["simulation_seed"])
        generation_count = int(data["generation_count"])
        strategy = int(data["strategy"])
        aep = float(data["aep"])
        elite_count = int(data["elite_count"])
        alien_count = int(data["alien_count"])
        weights = [float(x) for x in data["weights"][1:-1].split(",")]
    except NameError as e:
        db.write_log(f"Failed to start simulation, because of missing parameter: {e}")
        return jsonify({"msg": f"{e}"}, 400)

    simulation_interface = sim.Schnittstelle(population_size, simulation_seed, weights)

    simulation_interface.evolute(generation_count, strategy, aep, elite_count, alien_count)

    simulation_results = simulation_interface.results()
    exp_id = db.add_experiment(current_user, simulation_results, population_size, simulation_seed, generation_count, strategy, aep, elite_count, alien_count, weights)

    db.write_log(f"Started simulation and saved results to experiment {exp_id}")
    return jsonify({"experiment_id": exp_id}), 200

@api.route("/api/get_simulation_data", methods=["POST"])
@jwt_required()
def api_get_simulation_data():
    """Requests historic simulation data for further analysis (Authorization required: administrator, data_analyst, simulator (only their own data))


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
    allowed_roles = {"data_analyst", "administrator", "simulator"}

    if role not in allowed_roles:
        db.write_log(f"Failed to get simulation data, because {current_user} is not allowed to do so")
        return jsonify({}), 401

    data = request.get_json()

    try:
        columns: list[str] = [x for x in data["columns"][1:-1].split(",")]
        row_constraints: list[str] = [x for x in data["row_constraints"][1:-1].split(",")]
    except NameError as e:
        db.write_log(f"Failed to get simulation data, because of: {e}")
        return jsonify({"msg": f"{e}"}), 400

    if role == "simulator":
        allowed_ids = db.get_users_experiments(current_user)
        added_constraints = [f"experiment_id = {id}" for id in allowed_ids]
        for c in added_constraints:
            row_constraints.append(c)

    try:
        data = db.export_experiment_data(columns, row_constraints)
    except ValueError as e:
        db.write_log(f"Failed to export data to csv: {e}")
        return jsonify({"msg": f"{e}"}), 400

    db.write_log(f"Exported data to csv")
    return jsonify({"content": data}), 200


@api.route("/api/get_experiment_inputs", methods=["POST"])
@jwt_required()
def api_get_experiment_inputs():
    """Requests experiment inputs for further analysis (Authorization required: administrator, data_analyst, simulator (only their own data))

    :param JSON
    {
        "experiment_id": int
    }

    :returns JSON
    {
        "population_size": int,
        "simulation_seed": int,
        "generation_count": int,
        "strategy": int,
        "aep": float,
        "elite_count": int,
        "alien_count": int,
        "weights": list[float]
    }

    """

    current_user = get_jwt_identity()

    role = db.get_role(current_user)
    allowed_roles = {"data_analyst", "administrator", "simulator"}

    if role not in allowed_roles:
        db.write_log(f"Failed to get experiment inputs, because {current_user} is not allowed to do so")
        return jsonify({}), 401

    data = request.get_json()

    try:
        experiment_id = int(data["experiment_id"])
    except NameError as e:
        db.write_log(f"Failed to get experiment inputs, because of: {e}")
        return jsonify({"msg": f"{e}"}), 400

    if role == "simulator":
        allowed_ids = db.get_users_experiments(current_user)
        if experiment_id not in allowed_ids:
            db.write_log(f"Failed to get experiment inputs, because {current_user} is not allowed to do so")
            return jsonify({}), 401

    data = db.get_experiment_inputs(experiment_id)

    db.write_log(f"Requested experiment inputs for experiment {experiment_id}")
    return jsonify({"generation_count": data[0], "simulation_seed": data[1], "population_size": data[2], "strategy": data[3], "aep": data[4], "elite_count": data[5], "alien_count": data[6], "weights": data[7:]}), 200

@api.route("/api/get_users", methods=["GET"])
@jwt_required()
def api_get_users():
    """Get name and role for every user.

    :returns JSON
    {
        "users" : [ { "username": "<username>", "role": "<role>" } ]
    }

    """
    current_user = get_jwt_identity()

    role = db.get_role(current_user)
    allowed_roles = {"administrator"}

    if role not in allowed_roles:
        db.write_log(f"Failed to get users, because {current_user} is no administrator")
        return jsonify({}), 401
    
    data = db.get_users()
    db.write_log(f"{current_user} requested all users")
    return jsonify({"users": [{"username": user, "role": role} for user,role in data]}, 200)

@api.route("/api/get_logs", methods=["GET"])
@jwt_required()
def api_get_logs():
    """Get all logs

    :returns JSON
    {
        "logs" : [ { "timestamp": "<timestamp>", "message": "<message>" } ]
    }

    """
    current_user = get_jwt_identity()

    role = db.get_role(current_user)
    allowed_roles = {"administrator"}

    if role not in allowed_roles:
        db.write_log(f"Failed to get logs, because {current_user} is no administrator")
        return jsonify({}), 401

    data = db.get_logs()
    db.write_log(f"{current_user} requested all logs")
    return jsonify({"logs": [{"timestamp": timestamp, "message": message} for timestamp,message in data]}, 200)