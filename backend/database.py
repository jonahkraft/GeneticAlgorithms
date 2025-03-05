import sqlite3
import hashlib

conn = sqlite3.connect("backend\\db\\users.db")

cur = conn.cursor()

#cur.execute("""CREATE TABLE users(
#            id INTEGER PRIMARY KEY,
#            first_name text NOT NULL,
#            last_name text NOT NULL,
#            role text NOT NULL,
#            hashed_password text NOT NULL)""")

def add_user(conn: sqlite3.Connection, fist_name:str, last_name: str, role: str, password: str)-> None:
    """
    Adds a user to the user database
    
    :param conn: connection to the database
    :type conn: sqlite3.Connection

    :param first_name: The first Name of the User
    :type first_name: str

    :param last_name: The last Name of the User
    :type last_name: str

    :param role: The users role
    :type role: str

    :param password: The users password
    :type password: str

    """
    sql = ("INSERT INTO users(first_name,last_name,role,hashed_password) VALUES(?,?,?,?)")
    
    cur = conn.cursor()

    h = hashlib.sha256()
    h.update(str.encode(password))
    cur.execute(sql,(fist_name,last_name,role,h.hexdigest()))

    conn.commit()

def check_password(conn: sqlite3.Connection, users_first_name: str, users_last_name: str, password: str) -> bool:
    """
    Checks if an entered password is correct

    :param conn: connection to the database
    :type conn: sqlite3.Connection

    :param users_first_name: The first Name of the User
    :type users_first_name: str

    :param users_last_name: The last Name of the User
    :type users_last_name: str

    :param password: The entered password
    :type password: str
    """

    cur = conn.cursor()

    cur.execute(f"SELECT hashed_password FROM users WHERE ?=first_name AND ?=last_name",[users_first_name,users_last_name])

    users_hashed_password = cur.fetchone()[0]
    h = hashlib.sha256()
    h.update(str.encode(password))
    entered_hased_password = h.hexdigest()

    return users_hashed_password == entered_hased_password


if __name__ == "__main__":
    con = sqlite3.connect("backend\\db\\users.db")
    
    #add_user(con, "Simon", "Lauberheimer", "Guest", "password")
    #add_user(con, "Thomas", "Kottenhahn", "Admin", "1234")

    print(check_password(con,"Thomas","Kottenhahn","1234"))
