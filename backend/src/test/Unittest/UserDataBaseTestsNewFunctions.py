import sqlite3

from UnitMeta import UnitMeta
from backend.src import database
from UserDatabaseTests import UserDatabaseTests
import DatabaseGrenzwertAnalyse
class UserDataBaseTestsNewFunctions(UnitMeta):
    def __init__(self):
        """
        Fügt alle Nutzer von der anderen Testklasse zur Datenbank hinzu um die neuen Funktionen zu testen
        """
        inst = UserDatabaseTests()
        inst.ClearTestDataBase()
        self.testConnection : str = "..\\TestUserDatabase.db"
        self.TestData : list[dict[str, str]] = [{"name": name, "pass": DatabaseGrenzwertAnalyse.GetRandomPassword(), "role": DatabaseGrenzwertAnalyse.GetRandomRole()} for name in [DatabaseGrenzwertAnalyse.GetRandomName() for _ in range(250)]]
        # add all
        self.addedData = False

    def TestChangePassword(self):
        if not self.addedData:
            # Daten hinzufügen
            for data in self.TestData:
                database.add_user(data["user"], data["pass"], data["role"], self.testConnection)
        changedPasswords = [DatabaseGrenzwertAnalyse.GetRandomPassword() for _ in range(len(self.TestData))]
        for ind in range(len(changedPasswords)):
            password = changedPasswords[ind]
            data = self.TestData[ind]
            database.change_password(data["user"], password, self.testConnection)
        con = sqlite3.connect(self.testConnection)
        cur = con.cursor()
        cur.execute("select username, hashed_password from users")
        vals = [{"user" : v[0], "pass": v[1]} for v in cur.fetchall()]

        cur.close()


    def TestDeleteUser(self):
        if not self.addedData:
         # Daten hinzufügen
           for data in self.TestData:
              database.add_user(data["name"], data["pass"], data["role"], self.testConnection)
        for data in self.TestData:
            database.delete_user(data["name"], self.testConnection)
        if any (database.user_exists(data["name"], self.testConnection) for data in self.TestData):
            return "Ein Nutzer wurde nicht korrekt gelöscht!"
        return True

def SetEquals(left : list[dict], right : list[dict]) -> bool:
    for val in left:
        if not any(DictEquals(val, b) for b in right):
            return False
    for val in right:
        if not any(DictEquals(val, b) for b in left):
            return False
    return True
def UserPassEquals(left : dict, right : dict) -> bool:
    return left["user"] == right["user"] and left["pass"] == right["pass"]
def DictEquals(left : dict, right : dict) -> bool:
    if len(left.keys()) != len(right.keys()):
        return False
    for val in left:
        if val not in right:
            return False
        if left[val] != right[val]:
            return False
    return True

if __name__ == "__main__":
    print(UserDataBaseTestsNewFunctions().TestDeleteUser())