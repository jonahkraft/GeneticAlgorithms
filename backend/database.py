import sqlite3
import hashlib

#user_connection = sqlite3.connect("backend\\db\\users.db")
#cur.cursor()
#cur.execute("""CREATE TABLE users(
#            id INTEGER PRIMARY KEY,
#            user_name text NOT NULL UNIQUE,
#            role text NOT NULL,
#            hashed_password text NOT NULL)""")

def add_user(user_name: str, role: str, password: str, connection_path: str = "backend\\db\\users.db")-> None:
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

    """
    sql = ("INSERT INTO users(user_name,role,hashed_password) VALUES(?,?,?)")
    
    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()

    h = hashlib.sha256()
    h.update(str.encode(password))
    cur.execute(sql,(user_name,role,h.hexdigest()))

    connection.commit()

def get_role(user_name: str, connection_path: str = "backend\\db\\users.db")-> str:
    """
    Returns the role of the entered user

    :param user_name: The name of the user
    :type user_name: str

    :param conn: path to the database
    :type conn: str
    """

    connection = sqlite3.connect(connection_path)
    cur = connection.cursor()
    cur.execute("SELECT role FROM users WHERE ?=user_name",[user_name])
    return cur.fetchone()[0]

def check_password(user_name: str, password: str, connection_path: str = "backend\\db\\users.db") -> bool:
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

    return users_hashed_password == entered_hased_password

def user_exists(user_name: str, connection_path: str = "backend\\db\\users.db") -> bool:
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
    return len(cur.fetchall()) == 1

def add_experiment_data(
        data : list[float],
        connection_path: str
    ) -> None:

    con = sqlite3.connect(connection_path)
    cur = con.cursor()

    cur.execute("""INSERT INTO car_data (final_drive, roll_radius, gear_3, gear_4, gear_5, consumtion, elasticity_3, elasticity_4, elasticity_5) VALUES (?,?,?,?,?,?,?,?,?)""", data)

    con.commit()

if __name__ == "__main__":
    con = sqlite3.connect("backend\\db\\simulation_data.db")

    cur = con.cursor()

    #cur.execute("""CREATE TABLE car_data(
    #            final_drive REAL NOT NULL,
    #            roll_radius REAL NOT NULL,
    #            gear_3 REAL NOT NULL,
    #            gear_4 REAL NOT NULL,
    #            gear_5 REAL NOT NULL,
    #            consumtion REAL NOT NULL,
    #            elasticity_3 REAL NOT NULL,
    #            elasticity_4 REAL NOT NULL,
    #            elasticity_5 REAL NOT NULL
    #            )""")
    #
    #con.commit()
    
    #add_experiment_data([0.4,0.5,0.6,0.4,1.4,0.4,0.2,0.8,0.2],"backend\\db\\simulation_data.db")

    #add_user("Simon Lauberheimer", "Guest", "aab")
    #add_user("Thomas Kottenhahn", "Admin", "1234")
