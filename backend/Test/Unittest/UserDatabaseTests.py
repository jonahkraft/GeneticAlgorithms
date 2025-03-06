import sqlite3
import hashlib

import UnitMeta
from backend import database
from typing import *
# Test Connection
testConnection = "..\\TestUserDataBase.db"
# Allgemeine Nutzer Sample Daten
TestData : list[dict[str, str]] = [{ "name": "Max", "role": "Admin", "pass": "password0" },
                                   {"name": "Peter", "role": "Guest", "pass": "lustig"},
                                   {"name": "Tester U", "role": "Datenanalyst", "pass": "a!!9487w5793" }
                                   ]

class UserDatabaseTests(UnitMeta.UnitMeta):
    def CheckConnectionPropertlyClosed(this, func : Callable, **args) -> bool:
        _ = func(args);
        try:
            sqlite3.connect(testConnection);
        except:
            return False;
        return True;

    def ClearTestDataBase(this):
        con = sqlite3.connect(testConnection);
        con.execute("delete from " + "users")
        con.commit();
        con.close();
    def __init__(this, *args, **kwargs):
        super().__init__(args, kwargs)
        this.createdUsers = False;


    def checkAddUsersUsersExist(this) -> bool | str:
        for data in TestData:
            database.add_user(data["name"], data["pass"], data["role"], testConnection);

        # Checked if added correctly
        # First Check Names
        for data in TestData:
            if not database.user_exists(data["name"], testConnection):
                return "Nutzer wurde nicht hinzugefügt (oder user_exists falsch), fehler bei add_user!";
        # Now check passes
        for data in TestData:
            if not database.check_password(data["name"], data["pass"], testConnection):
                return "Falsche Login Daten bei Add User hinzugefügt oder check_password falsch";

        # Now Check Roles
        for data in TestData:
            if database.get_role(data["name"], testConnection) != data["role"]:
                return "Falsche Rolle wurde bei add_user eingefügt, oder get_role ist fehlerhaft";
        this.createdUsers = True;
        return True;
    def __call__(this, *args, **kwargs):
        # Connection Checks first
        """if not this.CheckConnectionPropertlyClosed(database.add_user, user_name = "__user", password = "__pass",  role  = "__role", connection_path = testConnection):
            return "add_user schließt die Connection nicht korrekt";
        if not this.CheckConnectionPropertlyClosed(database.add_experiment_data, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, testConnection):
            return "add_experiement_data schließt die Connection nicht korrekt";
        if not this.CheckConnectionPropertlyClosed(database.check_password,"__user", "__pass", testConnection):
            return "check_password schließt die Connection nicht korrekt";
        if not this.CheckConnectionPropertlyClosed(database.get_role, "__user", testConnection):
            return "get_role schließt die Connection nicht korrekt";
        if not this.CheckConnectionPropertlyClosed(database.user_exists, "__user", testConnection):
            return "user_exists schließt die Connection nicht korrekt";"""

        # Type Checks first
        first : str | bool = this.checkAddUsersUsersExist();
        sec : str | bool | None = None;
        if not isinstance(first, str):
            print("Passed checkAddUsersUsersExist")
            sec = this.hashingCheck(hashlib.sha256) # Hashing Function
            if isinstance(sec, str):
                print("Errors bei hashPasses" + str(sec));
                return;
            else:
                print("Passes hashedPasses")
        else:
            print("Errors bei checkAddUsersUsersExist: " + first);
            return;

    """
    Testfallentwurf von der Hashing Function
    Wichtig: hashingFunction hat (string name, string pass, string role) Signatur!


    """
    def hashingCheck(this, hashingFunction : Callable[[str], str]) -> bool:
        if not this.createdUsers:
            test : str | bool = this.checkAddUsersUsersExist()
            if isinstance(test, str):
                return "Hashen wurde nicht durchgeführt weil add_user/check_password/get_role fehlerhaft ist. Error für diesen Test: " + test;
        con = sqlite3.connect(testConnection);
        cur : sqlite3.Cursor = con.cursor();
        # get passes
        cur.execute("select hashed_password from users");
        passes : list[str] = [vals[0] for vals in cur.fetchall()];
        cur.close(); # .Dispose();
        con.commit();
        ind : int = 0;
        for data in TestData:
            ps = passes[ind];
            ind += 1;
            hashed : str = hashingFunction(data["pass"])
            userPass : str = ps;
            if hashed != userPass:
                con.close(); # .Dispose();
                return "Passwörter wurden nicht korrekt gehashed!";

        return True;

UserDatabaseTests()()