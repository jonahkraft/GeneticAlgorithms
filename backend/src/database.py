import sqlite3
import csv
import hashlib
import os
from redis import Redis

redis_host = os.getenv('REDIS_HOST', 'localhost')
redis_client = Redis(host=redis_host)


#user_connection = sqlite3.connect("../db/simulation_data.db")
#cur = user_connection.cursor()
#cur.execute("""CREATE TABLE experiment_owners(
#             experiment_id INTEGER PRIMARY KEY,
#             username text)""")
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

    cur.execute("SELECT user_name, role FROM users")

    return cur.fetchall()


def add_user(user_name: str, password: str, role: str = "data_analyst", connection_path: str = "db/users.db")-> None:
    """
    Adds a user to the user database

    :param user_name: The first Name of the User
    :type user_name: str

    :param role: The users role
    :type role: str

    :param password: The users password
    :type password: str

    :param conn: path to the database
    :type conn: str

    :returns:
        bool: returns True if user has been added successfully, False otherwise

    """
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    h = hashlib.sha256()
    h.update(str.encode(password))

    user_added_successfully = True
    try:
        cur.execute("INSERT INTO users(user_name,role,hashed_password) VALUES(?,?,?)",(user_name,role,h.hexdigest()))
        connection.commit()
    except sqlite3.IntegrityError:
        user_added_successfully = False
    finally:
        connection.close()
        return user_added_successfully

def delete_user(user_name:str, connection_path: str = "db/users.db") -> bool:
    """
    Deletes the given user.

    :param user_name: The name of the user
    :type user_name: str

    :param conn: path to the database
    :type conn: str

    :returns: Returns true if deletion successful
    :retype: bool
    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    if not user_exists(user_name, connection_path):
        connection.close()
        return False
    cur.execute("DELETE FROM users WHERE user_name=?",[user_name])
    connection.commit()
    connection.close()

def change_password(user_name: str, new_password: str, connection_path: str = "db/users.db") -> bool:
    """
    Changes a users password in the user database

    :param user_name: The name of the User
    :type user_name: str

    :param new_password: The users new_password
    :type new_password: str

    :param conn: path to the database
    :type conn: str

    :returns: returns True if the password has been changed successfully, False otherwise
    :rytpe: bool

    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    h = hashlib.sha256()
    h.update(str.encode(new_password))

    if user_exists(user_name,connection_path):
        cur.execute("UPDATE users SET hashed_password = ? WHERE user_name=?",[h.hexdigest(),user_name])

        connection.commit()
        connection.close()
        return True
    
    connection.commit()
    connection.close()
    return False

def get_role(user_name: str, connection_path: str = "db/users.db")-> str:
    """
    Returns the role of the entered user

    :param user_name: The name of the user
    :type user_name: str

    :param conn: path to the database
    :type conn: str

    :returns: The role of the user if one exists, None otherwise
    :rtype: str
    """
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()
    cur.execute("SELECT role FROM users WHERE ?=user_name",[user_name])
    try:
        res = cur.fetchone()[0]
    except TypeError:
        res = None
    finally:
        connection.close()
        return res

def check_password(user_name: str, password: str, connection_path: str = "db/users.db") -> bool:
    """
    Checks if an entered password is correct

    :param user_name: The name of the user
    :type user_name: str

    :param password: The entered password
    :type password: str

    :param conn: path to the database
    :type conn: str

    :returns: returns True if the password is correct, False otherwise
    :rtype: bool
    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("SELECT hashed_password FROM users WHERE ?=user_name",[user_name])

    users_hashed_password = cur.fetchone()[0]
    h = hashlib.sha256()
    h.update(str.encode(password))
    entered_hashed_password = h.hexdigest()
    connection.close()

    return users_hashed_password == entered_hashed_password

def user_exists(user_name: str, connection_path: str = "db/users.db") -> bool:
    """
    Checks if a user exists in the database

    :param user_name: The first Name of the User
    :type user_name: str

    :param conn: path to the database
    :type conn: str

    :returns: returns True if user exists, False otherwise
    :rtype: bool
    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("SELECT * FROM users WHERE ?=user_name",[user_name])
    res = len(cur.fetchall()) == 1
    connection.close()
    return res

def get_experiment_owner(experiment_id: int, connection_path: str = "db/simulation_data.db"):
    """
    Returns who ran which experiment

    :param experiment_id: The experiment_id
    :type experiment_id: int

    :param connection_path: The path to the database
    :type connection_path: str

    :returns The username of the one who ran the experiment  
    """ 
    
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("SELECT username FROM experiment_owners WHERE experiment_id = ?", [experiment_id])

    res = cur.fetchone()
    
    connection.close()

    return res

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

    cur.execute("SELECT experiment_id FROM experiment_owners WHERE username = ?", [username])
    ids = cur.fetchall()
    ids = [i[0] for i in ids]

    return ids

def add_experiment_data(username: str, data: list[list], connection_path: str = "db/simulation_data.db") -> None:
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

    cur.execute("INSERT INTO experiment_owners (experiment_id, username) VALUES(?,?)", [experiment_id, username])

    connection.commit()
    connection.close()
    
    return experiment_id

def export_experiment_data_to_csv(file_path: str, columns: list[str] = [], constraints: list[str] = [], connection_path: str = "db/simulation_data.db") -> str:
    """
    Exports the data from the database to csv

    :param file_path: The filepath of the resulting csv file
    :type file_path

    :param columns: The columns to be exported
    :type columns: list[str]

    :param constraints: The constraints to be applied. Contrainsts are in the form of "lhs op rhs" where lhs and rhs are either column names or numbers and op is one of the following operators: "<",">","<=",">=","="
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

    with open(file_path, "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        writer.writerows(results)

#print(get_users_experiments("simulation_expert", "./backend/db/simulation_data.db"))
