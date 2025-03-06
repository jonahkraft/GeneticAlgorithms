import sqlite3
import csv
import hashlib
import os
from redis import Redis

redis_host = os.getenv('REDIS_HOST', 'localhost')
redis_client = Redis(host=redis_host)


#user_connection = sqlite3.connect("backend/db/users.db")
#cur = user_connection.cursor()
#cur.execute("""CREATE TABLE users(
#            id INTEGER PRIMARY KEY,
#            user_name text NOT NULL UNIQUE,
#            role text NOT NULL,
#            hashed_password text NOT NULL)""")
#

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
    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("SELECT hashed_password FROM users WHERE ?=user_name",[user_name])

    users_hashed_password = cur.fetchone()[0]
    h = hashlib.sha256()
    h.update(str.encode(password))
    entered_hased_password = h.hexdigest()
    connection.close()

    return users_hashed_password == entered_hased_password

def user_exists(user_name: str, connection_path: str = "db/users.db") -> bool:
    """
    Checks if a user exists in the database

    :param user_name: The first Name of the User
    :type user_name: str

    :param conn: path to the database
    :type conn: str
    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("SELECT * FROM users WHERE ?=user_name",[user_name])
    res = len(cur.fetchall()) == 1
    connection.close()
    return res

def add_experiment_data(
        data : list[float],
        connection_path: str = "db/simulation_data.db"
    ) -> None:

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    cur.execute("""INSERT INTO car_data (generation, final_drive, roll_radius, gear_3, gear_4, gear_5, consumption, elasticity_3, elasticity_4, elasticity_5) VALUES (?,?,?,?,?,?,?,?,?,?)""", data)

    connection.commit()

def add_experiment_data_from_csv(file_path: str, connection_path: str = "db/simulation_data.db") -> None:
    """
    Adds the given csv data to the given connection

    :param file_path: The path to the csv file
    :type file_path: str 

    :param connection_path: The path to the database
    :type connection_path: str

    """
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    with open(file_path,'r') as file:
        reader = csv.reader(file)
        
        rows = [row[0].split(";") for row in reader]
        to_db = [(int(i[0]),float(i[1]),float(i[2]),float(i[3]),float(i[4]),float(i[5]),float(i[6]),float(i[7]),float(i[8]),float(i[9])) for i in rows[1:]]

    cur.executemany("INSERT INTO car_data (generation, final_drive, roll_radius, gear_3, gear_4, gear_5, consumption, elasticity_3, elasticity_4, elasticity_5) VALUES (?,?,?,?,?,?,?,?,?,?);", to_db)
    connection.commit()
    connection.close()

def export_experiment_data_to_csv(file_path: str, columns: list[str] = [], constraints: list[str] = [], connection_path: str = "db/simulation_data.db") -> str:
    """
    Exports the data from the database to csv

    :param file_path: The filepath of the resulting csv file
    :type file_path

    """
    if columns == []:
        cols = "*"
    else:
        cols = ", ".join(columns)

    if constraints == []:
        rows = ""
    else:
        rows = " WHERE " + " AND ".join(constraints)

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    sql_query = f"SELECT {cols} FROM car_data{rows}"

    cur.execute(sql_query)
    results = cur.fetchall()

    header = [i[0] for i in cur.description]

    with open(file_path, "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        writer.writerows(results)

if __name__ == "__main__":
    #con = sqlite3.connect("backend/db/simulation_data.db")

    #cur = con.cursor()

    #cur.execute("""CREATE TABLE car_data(
    #            generation INT NOT NULL,
    #            final_drive REAL NOT NULL,
    #            roll_radius REAL NOT NULL,
    #            gear_3 REAL NOT NULL,
    #            gear_4 REAL NOT NULL,
    #            gear_5 REAL NOT NULL,
    #            consumption REAL NOT NULL,
    #            elasticity_3 REAL NOT NULL,
    #            elasticity_4 REAL NOT NULL,
    #            elasticity_5 REAL NOT NULL
    #            )""")
    #
    #con.commit()
    
    print(add_user("admin", "admin", "admin", connection_path="backend/db/users.db"))
    #get_experiment_data("test.csv", ["generation","consumption","elasticity_4", "gear_3"], ["generation > 5", "gear_3 < 1.5"], connection_path="backend/db/simulation_data.db")
    pass