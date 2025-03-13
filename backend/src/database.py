import sqlite3
import csv
import hashlib
import os
import io

#user_connection = sqlite3.connect("../db/simulation_data.db")
#cur = user_connection.cursor()
#cur.execute("ALTER TABLE experiments RENAME COLUMN elasticity3_weight TO elasticity_3_weight")
#cur.execute("ALTER TABLE experiments RENAME COLUMN elasticity4_weight TO elasticity_4_weight")
#cur.execute("ALTER TABLE experiments RENAME COLUMN elasticity5_weight TO elasticity_5_weight")
#user_connection.commit()

def get_users(connection_path: str = "db/users.db") -> list[tuple[str, str]]:
    """
    Gets a list of all users with their roles.

    :param connection_path: path to the database
    :type connection_path: str

    :returns A list of users with their roles
    :type list[tuple[str, str]]
    """
    
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("SELECT username, role FROM users")

    return cur.fetchall()

def get_logs(connection_path: str = "db/logs.db") -> list[tuple[str, str]]:
    """
    Gets a list of all logs.

    :param connection_path: path to the database
    :type connection_path: str

    :returns A list of logs
    :type list[tuple[str, str]]
    """
    
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("SELECT time, log FROM logs")

    return cur.fetchall()

def add_user(username: str, password: str, role: str = "data_analyst", connection_path: str = "db/users.db")-> None:
    """
    Adds a user to the user database

    :param username: The first Name of the User
    :type username: str

    :param role: The users role
    :type role: str

    :param password: The users password
    :type password: str

    :param connection_path: path to the database
    :type connection_path: str

    :returns:
        bool: returns True if user has been added successfully, False otherwise

    """
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    h = hashlib.sha256()
    h.update(str.encode(password))

    user_added_successfully = True
    try:
        cur.execute("INSERT INTO users(username,role,hashed_password) VALUES(?,?,?)",(username,role,h.hexdigest()))
        connection.commit()
    except sqlite3.IntegrityError:
        user_added_successfully = False
    finally:
        connection.close()
        return user_added_successfully

def delete_user(username:str, connection_path: str = "db/users.db") -> bool:
    """
    Deletes the given user.

    :param username: The name of the user
    :type username: str

    :param connection_path: path to the database
    :type connection_path: str

    :returns: Returns true if deletion successful
    :retype: bool
    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    if not user_exists(username, connection_path):
        connection.close()
        return False
    cur.execute("DELETE FROM users WHERE username=?",[username])
    connection.commit()
    connection.close()
    return True

def change_password(username: str, new_password: str, connection_path: str = "db/users.db") -> bool:
    """
    Changes a users password in the user database

    :param username: The name of the User
    :type username: str

    :param new_password: The users new_password
    :type new_password: str

    :param connection_path: path to the database
    :type connection_path: str

    :returns: returns True if the password has been changed successfully, False otherwise
    :rytpe: bool

    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    h = hashlib.sha256()
    h.update(str.encode(new_password))

    if not user_exists(username,connection_path):
        connection.close()
        return False
    
    cur.execute("UPDATE users SET hashed_password = ? WHERE username=?",[h.hexdigest(),username])
    connection.commit()
    connection.close()
    return True

def change_username(old_username: str, new_username: str, users_connection_path: str = "db/users.db", simulation_data_connection_path: str = "db/simulation_data.db"):
    """
    Changes a users name in the user database

    :param old_username: The name of the User to change
    :type old_username: str

    :param new_username: The users new username
    :type new_username: str

    :param users_connection_path: path to the users database
    :type users_connection_path: str

    :param simulation_data_connection_path: path to the simulation data database
    :type simulation_data_connection_path: str

    :returns: returns True if the username has been changed successfully, False otherwise
    :rytpe: bool
    """

    connection = sqlite3.connect(users_connection_path)
    cur = connection.cursor()

    if not user_exists(old_username, users_connection_path):
        connection.close()
        return False

    cur.execute("UPDATE users SET username = ? WHERE username = ?", [new_username, old_username])

    connection.commit()
    connection.close()

    connection = sqlite3.connect(simulation_data_connection_path)
    cur = connection.cursor()

    cur.execute("UPDATE experiments SET username = ? WHERE username = ?", [new_username, old_username])

    connection.commit()
    connection.close()

    return True

def change_role(username: str, role: str, connection_path: str = "db/users.db"):
    """
    Changes a users name in the user database

    :param username: The name of the User to change the role of
    :type username: str

    :param role: The users new role (simulator | data_analyst | administrator)
    :type role: str

    :param connection_path: path to the database
    :type connection_path: str

    :returns: returns True if the role has been changed successfully, False otherwise
    :rytpe: bool
    """

    allowed_roles = {"data_analyst", "administrator", "simulator"}

    if role not in allowed_roles:
        return False

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    if not user_exists(username, connection_path):
        connection.close()
        return False

    cur.execute("UPDATE users SET role = ? WHERE username = ?", [role, username])

    connection.commit()
    connection.close()

    return True

def get_role(username: str, connection_path: str = "db/users.db")-> str:
    """
    Returns the role of the entered user

    :param username: The name of the user
    :type username: str

    :param connection_path: path to the database
    :type connection_path: str

    :returns: The role of the user if one exists, None otherwise
    :rtype: str
    """
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()
    cur.execute("SELECT role FROM users WHERE ?=username",[username])
    try:
        res = cur.fetchone()[0]
    except TypeError:
        res = None
    finally:
        connection.close()
        return res

def check_password(username: str, password: str, connection_path: str = "db/users.db") -> bool:
    """
    Checks if an entered password is correct

    :param username: The name of the user
    :type username: str

    :param password: The entered password
    :type password: str

    :param connection_path: path to the database
    :type connection_path: str

    :returns: returns True if the password is correct, False otherwise
    :rtype: bool
    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("SELECT hashed_password FROM users WHERE ?=username",[username])

    users_hashed_password = cur.fetchone()[0]
    h = hashlib.sha256()
    h.update(str.encode(password))
    entered_hashed_password = h.hexdigest()
    connection.close()

    return users_hashed_password == entered_hashed_password

def user_exists(username: str, connection_path: str = "db/users.db") -> bool:
    """
    Checks if a user exists in the database

    :param username: The first Name of the User
    :type username: str

    :param connection_path: path to the database
    :type connection_path: str

    :returns: returns True if user exists, False otherwise
    :rtype: bool
    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("SELECT * FROM users WHERE ?=username",[username])
    res = len(cur.fetchall()) == 1
    connection.close()
    return res

def get_experiment(experiment_id: int, connection_path: str = "db/simulation_data.db"):
    """
    Returns who ran which experiment

    :param experiment_id: The experiment_id
    :type experiment_id: int

    :param connection_path: The path to the database
    :type connection_path: str

    :returns The inputs used to run the experiment as well as username of the one who ran the experiment  
    :type dict
    """ 
    
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("SELECT username, population_size, simulation_seed, generation_count, strategy, aep, elite_count, alien_count, consumption_weight, elasticity_3_weight, elasticity_4_weight, elasticity_5_weight FROM experiments WHERE experiment_id = ?", [experiment_id])

    res = cur.fetchone()

    experiment = {
        "username": res[0],
        "population_size": res[1],
        "simulation_seed": res[2],
        "generation_count": res[3],
        "strategy": res[4],
        "aep": res[5],
        "elite_count": res[6],
        "alien_count": res[7],
        "weights": [res[8], res[9], res[10], res[11]]
    }

    connection.close()

    return experiment

def get_users_experiments(username: str, connection_path: str = "db/simulation_data.db"):
    """
    Returns the users experiments

    :param username: the users username
    :type str

    :param connection_path: The path to the database
    :type connection_path: str
    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("SELECT experiment_id FROM experiments WHERE username = ?", [username])
    ids = cur.fetchall()
    ids = [i[0] for i in ids]

    return ids

def add_experiment(username: str, data: list[list], population_size: int, simulation_seed: int, generation_count: int, strategy: int, aep: float, elite_count: int, alien_count: int, weights: list[int], connection_path: str = "db/simulation_data.db") -> None:
    """
    Adds the given csv data to the given connection

    :param username: The user adding the experiment data
    :type username: str

    :param data: The data to enter in the form list[list[generation: int, final_drive: float, roll_radius: float, gear_3: float, gear_4: float, gear_5: float, consumption: float, elasticity_3: float, elasticity_4: float, elasticity_5: float]]
    :type data: list[list]

    :param connection_path: The path to the database
    :type connection_path: str

    """
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()


    cur.execute("SELECT MAX(experiment_id) FROM car_data")
    experiment_id = cur.fetchone()[0]

    if experiment_id is None:
        experiment_id = 0
    else:
        experiment_id += 1

    rows = [row + [experiment_id] for row in data]
    to_db = [(int(i[0]),float(i[1]),float(i[2]),float(i[3]),float(i[4]),float(i[5]),float(i[6]),float(i[7]),float(i[8]),float(i[9]),int(experiment_id)) for i in rows[1:]]

    cur.executemany("INSERT INTO car_data (generation, final_drive, roll_radius, gear_3, gear_4, gear_5, consumption, elasticity_3, elasticity_4, elasticity_5,experiment_id) VALUES (?,?,?,?,?,?,?,?,?,?,?);", to_db)

    cur.execute("INSERT INTO experiments (experiment_id, username, population_size, simulation_seed, generation_count, strategy, aep, elite_count, alien_count, consumption_weight, elasticity_3_weight, elasticity_4_weight, elasticity_5_weight) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", [experiment_id, username, population_size, simulation_seed, generation_count, strategy, aep, elite_count, alien_count, weights[0], weights[1], weights[2], weights[3]])

    connection.commit()
    connection.close()
    
    return experiment_id

def export_experiment_data(columns: list[str] = [], constraints: list[str] = [], connection_path: str = "db/simulation_data.db") -> str:
    """
    Exports the data from the database to csv

    :param file_path: The filepath of the resulting csv file
    :type file_path

    :param columns: The columns to be exported
    :type columns: list[str]

    :param constraints: The constraints to be applied. Contrainsts are in the form of "lhs op rhs" where lhs and rhs are either column names or numbers and op is one of the following operators: "<",">","<=",">=","=", "<>"
    :type constraints: list[str]

    :param connection_path: The path to the database
    :type connection_path: str

    :returns: The path to the resulting csv file
    :rtype: str

    """
    def is_number(s: str) -> bool:
        try:
            float(s)
            return True
        except ValueError:
            return False

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    possible_operators = ["<",">","<=",">=","=", "<>"]
    cur.execute("SELECT * FROM car_data")
    possible_cols = cur.description
    possible_cols = [i[0] for i in possible_cols]
    cur.fetchall()

    if columns == []:
        cols = "*"
    else:
        for c in columns:
            if c not in possible_cols:
                raise ValueError((f"The Column '{c}' does not exist"))
        cols = ",".join(columns)

    if constraints == []:
        rows = ""
    else:
        for c in constraints:
            lhs, op, rhs = c.split(" ")
            if op not in possible_operators:
                raise ValueError((f"'{op}' is no valid operator"))
            if not(is_number(lhs) or lhs in possible_cols):
                raise ValueError((f"'{lhs}' is no valid operand"))
            if not(is_number(rhs) or rhs in possible_cols):
                raise ValueError((f"'{rhs}' is no valid operand"))
            
        rows = " WHERE " + " AND ".join(constraints)

    sql_query = f"SELECT {cols} FROM car_data{rows}"

    cur.execute(sql_query)
    results = cur.fetchall()

    header = [i[0] for i in cur.description]

    output = io.StringIO()

    writer = csv.writer(output)
    writer.writerow(header)
    writer.writerows(results)

    return output.getvalue()

def write_log(log: str, connection_path = "db/logs.db"):
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("INSERT INTO logs(time,log) VALUES(DATETIME(),?)",[log])
    connection.commit()
    connection.close()

#print(get_logs("./backend/db/logs.db"))
