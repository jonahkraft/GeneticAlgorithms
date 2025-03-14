import sqlite3
from typing import Callable
import hashlib



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
        self.TestData : list[dict[str, str]] = [{"user": name, "pass": DatabaseGrenzwertAnalyse.GetRandomPassword(), "role": DatabaseGrenzwertAnalyse.GetRandomRole()} for name in [DatabaseGrenzwertAnalyse.GetRandomName() for _ in range(20)]]
        # add all
        self.addedData = False

    def TestChangePassword(self):
        """
        Testet die db.change_password Funktion
        :return:
        """
        if not self.addedData:
            # Daten hinzufügen
            for data in self.TestData:
                database.add_user(data["user"], data["pass"], data["role"], self.testConnection)
        changedPasswords = [DatabaseGrenzwertAnalyse.GetRandomPassword() for _ in range(len(self.TestData))]

        for ind in range(len(changedPasswords)):
            password = changedPasswords[ind]
            data = self.TestData[ind]
            database.change_password(data["user"], password, self.testConnection)
            self.TestData[ind]["pass"] = password
        con = sqlite3.connect(self.testConnection)
        cur = con.cursor()
        cur.execute("select username, hashed_password from users")
        vals = [{"user" : v[0], "pass": v[1]} for v in cur.fetchall()]
        print(vals)
        cur.close()
        con.close()
        if not SetEquals(vals, [{"user": data["user"], "pass": HashFunction(data["pass"]) } for data in self.TestData], UserPassEquals):
            return "Passwörter wurden nicht korrekt geändert"
        return True


    def TestDeleteUser(self):
        """
        Testet die Delete User Funktion von der Datenbank
        :return:
        """
        if not self.addedData:
         # Daten hinzufügen
           for data in self.TestData:
              database.add_user(data["user"], data["pass"], data["role"], self.testConnection)
        for data in self.TestData:
            database.delete_user(data["user"], self.testConnection)
        if any (database.user_exists(data["user"], self.testConnection) for data in self.TestData):
            return "Ein Nutzer wurde nicht korrekt gelöscht!"
        return True

def SetEquals(left : list, right : list, comparingFunction : Callable[[object, object], bool]) -> bool:
    """
    Überprüft ob 2 Listen bzgl. eines Kriteriums als Set gleichsind, d.h. das die Menge bzgl. Gleichheit der comparingFunction gleich sind
    :param left:
    :param right:
    :param comparingFunction:
    :return:
    """
    for val in left:
        if not any(comparingFunction(val, b) for b in right):
            return False
    for val in right:
        if not any(comparingFunction(val, b) for b in left):
            return False
    return True
def HashFunction(input : str) -> str:
        """
        Die SHA-256 Hashfunktion in Python.
        :param input: Der zu hashende String
        :return: Der gehaste String.
        """
        hash_object = hashlib.sha256();
        hash_object.update(input.encode("utf-8"));
        return hash_object.hexdigest();

def UserPassEquals(left : dict[str, str], right : dict[str, str]) -> bool:
    """
    Überprüft ob user und pass übereinstimmen
    :param left:
    :param right:
    :return:
    """
    return left["user"] == right["user"] and left["pass"] == right["pass"]
# [Obsolete]

def DictEquals(left : dict, right : dict) -> bool:
    """
    [Obsolete]
    :param left:
    :param right:
    :return:
    """
    if len(left.keys()) != len(right.keys()):
        return False
    for val in left:
        if val not in right:
            return False
        if left[val] != right[val]:
            return False
    return True

if __name__ == "__main__":
    """
    Führt die Tests aus
    """
    inst = UserDataBaseTestsNewFunctions()
    print(inst.TestChangePassword())
    print(inst.TestDeleteUser())