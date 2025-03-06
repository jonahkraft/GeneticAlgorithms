import sqlite3
import hashlib

import UnitMeta
from backend import database
from typing import *
# Test Connection
testConnection = "..\\TestUserDataBase.db"
#testConnection : sqlite3.Connection = sqlite3.connect("..\\TestUserDatabase.db")

# Allgemeine Nutzer Sample Daten
TestData : list[dict[str, str]] = [{ "name": "Max", "role": "Admin", "pass": "password0" }, 
                                   {"name": "Peter", "role": "Guest", "pass": "lustig"}, 
                                   {"name": "Tester U", "role": "Datenanalyst", "pass": "a!!9487w5793" }
                                   ]

class UserDatabaseTests(UnitMeta):
    def CheckConnectionPropertlyClosed(this, func : Callable, *args) -> bool:
        _ = func(args)
        try:
            sqlite3.connect(testConnection)
        except:
            return False
        return True

    def ClearTestDataBase(this):
        con = sqlite3.connect(testConnection)
        con.execute("delete from " + "users")
        con.commit()
        con.close()
    def __init__(this, *args, **kwargs):
        super().__init__(args, kwargs)
        this.createdUsers = False


    def checkAddUsersUsersExist(this) -> bool | str:
        for data in TestData:
            database.add_user(data["name"], data["role"], data["pass"], testConnection)
        
        # Checked if added correctly
        # First Check Names
        for data in TestData:
            if not database.user_exists(data["name"], testConnection):
                return "Nutzer wurde nicht hinzugef�gt (oder user_exists falsch), fehler bei add_user!"
        # Now check passes
        for data in TestData:
            if not database.check_password(data["name"], data["pass"], testConnection):
                return "Falsche Login Daten bei Add User hinzugef�gt oder check_password falsch"
        
        # Now Check Roles
        for data in TestData:
            if database.get_role(data["name"], testConnection) != data["role"]:
                return "Falsche Rolle wurde bei add_user eingef�gt, oder get_role ist fehlerhaft"
        return True
    def __call__(this, *args, **kwargs):
        # Connection Checks first
        if not this.CheckConnectionPropertlyClosed(database.add_user):
            return "add_user schlie�t die Connection nicht korrekt"
        if not this.CheckConnectionPropertlyClosed(database.add_experiment_data):
            return "add_experiement_data schlie�t die Connection nicht korrekt"
        if not this.CheckConnectionPropertlyClosed(database.check_password):
            return "check_password schlie�t die Connection nicht korrekt"
        if not this.CheckConnectionPropertlyClosed(database.get_role):
            return "get_role schlie�t die Connection nicht korrekt"
        if not this.CheckConnectionPropertlyClosed(database.user_exists):
            return "user_exists schlie�t die Connection nicht korrekt"
        # Type Checks first
        first : str | bool = this.checkAddUsersUsersExist()
        sec : str | bool | None = None
        if not isinstance(first, str):
            print("Passed checkAddUsersUsersExist")
            sec = this.hashingCheck(hashlib.sha256) # Hashing Function
            if isinstance(sec, str):
                print("Errors bei hashPasses" + str(sec))
                return
            else:
                print("Passes hashedPasses")
        else:
            print("Errors bei checkAddUsersUsersExist: " + first)
            return
        
    """
    Testfallentwurf von der Hashing Function
    Wichtig: hashingFunction hat (string name, string pass, string role) Signatur!


    """
    def hashingCheck(this, hashingFunction : Callable[str], str) -> bool:
        if not this.createdUsers:
            test : str | bool = this.checkAddUsersUsersExist() 
            if isinstance(test, str):
                return "Hashen wurde nicht durchgef�hrt weil add_user/check_password/get_role fehlerhaft ist. Error f�r diesen Test: " + test
        con = sqlite3.connect(testConnection)
        con.cursor()
        # get passes
        con.execute("select hashed_password from users")
        passes : list[str] = [vals[0] for vals in con.fetchall()]
        con.close() # .Dispose()
        ind : int = 0
        for data in TestData:
            ps = passes[ind]
            ind += 1
            hashed: str = hashingFunction(data["pass"])
            userPass: str = ps
            if hashed != userPass:
                con.close() # .Dispose()
                return "Passw�rter wurden nicht korrekt gehashed!"
 
        return True
    
