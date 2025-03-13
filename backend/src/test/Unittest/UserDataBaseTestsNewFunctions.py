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
        for val in changedPasswords:

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
if __name__ == "__main__":
    print(UserDataBaseTestsNewFunctions().TestDeleteUser())