import sqlite3
import hashlib
from Unittest import UnitMeta;
import UnitMeta
from backend import database
from typing import *
import random;
# Grenzwert Tests hier
# Test Connection
testConnection = "..\\TestUserDataBase.db"
#testConnection : sqlite3.Connection = sqlite3.connect("..\\TestUserDatabase.db");
# Nutzer Daten hier Random
UserData : list[dict[str, str]] = [{"name": str(n), "pass": str(n) + str(p), "role": str(r)} for n in random.choices(range(1000), k = 70) for p in range(20) for r in range(4)]
neededResult : list[dict[str, str]] = []
for data in UserData:
    if not any(t["name"] == data["name"] and t["pass"] == data["pass"] and t["role"] == data["role"] for t in neededResult):
        neededResult.append(data);
# Dopplungen erw�nscht!
assert len(neededResult) < len(UserData);
class UserDBGrenzwertAnalyse(UnitMeta):
    def __init__(this):
        pass
    def GrenzwertAnalyse(this) -> str | bool:
        test : str = this.SimAddUserTwice();
        pass

    def SimAddUserTwice(this) -> str | bool:
        for data in UserData:
            try:
                database.add_user(data["name"], data["role"], data["pass"], testConnection);
            except:
                return "add_user throws an exception where there shouldn\'t be an exception to be thrown!";
        if not all(database.user_exists(data["name"], testConnection) for data in neededResult):
            return "Es wurde ein Nutzer zu wenig durchgef�hrt";
        if not all(database.check_password(data["name"], data["pass"], testConnection) for data in neededResult):
            return "Es wurde ein Nutzer mit falschen Credentials eingef�gt, irgendwas gecrashed";
        # Jetzt checken ob Dopplungen hinzugef�gt wurden
        con = sqlite3.connect(testConnection);
        cur : sqlite3.Cursor = con.cursor();
        cur.execute("select * from users")
        vals = cur.fetchall()
        if len(vals) != len(neededResult):
            return "add_user hat die Grenzwertanalyse nicht bestanden, es sind die zu viele Rows nach dem Add vorhanden.";
        # durch die vorherigen Invarianten wissen wir das die vals jetzt korrekt sind
        return True

            

