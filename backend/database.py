import sqlite3
import hashlib

#user_connection = sqlite3.connect("backend\\db\\users.db")
#cur.cursor()
#cur.execute("""CREATE TABLE users(
#            id INTEGER PRIMARY KEY,
#            user_name text NOT NULL UNIQUE,
#            role text NOT NULL,
#            hashed_password text NOT NULL)""")

def add_user(user_name: str, role: str, password: str, connection_path: str)-> None:
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

def get_role(user_name:int, connection_path: str)-> str:
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

def check_password(user_name: str, password: str, connection_path: str) -> bool:
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

    users_hashed_password = cur.fetcone()[0]
    h = hashlib.sha256()
    h.update(str.encode(password))
    entered_hased_password = h.hexdigest()

    return users_hashed_password == entered_hased_password

def user_exists(user_name: str, connection_path: str) -> bool:
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

if __name__ == "__main__":
    con = sqlite3.connect("backend\\db\\users.db")
    
    #add_user("Simon Lauberheimer", "Guest", "aab")
    #add_user("Thomas Kottenhahn", "Admin", "1234")

    print(get_role("Thomas Kottenhahn"))
