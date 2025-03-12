import random
import sqlite3
from backend.src import database
import UnitMeta


class UserDBGrenzwertAnalyse(UnitMeta.UnitMeta):
    def __init__(this):
        """
        Initialisiert die Klasse.
        """
        this.Init()
        pass
    def Init(this):
        """
        Diese Methode wird beim Initialisieren von dieser Instanz aufgerufen und löscht alle vorhandenen Daten aus der Testdatenbank.
        :return:  Nichts
        """
        this.ClearDataBase()

    def __call__(this, *args, **kwargs):
        """
        Führt die gesamte Test Analyse durch
        :param args: Sollten leer sein
        :param kwargs:  Sollten leer sein
        :return:
        """
        this.GrenzwertAnalyse()
    def ClearDataBase(this):
        """
        Diese Funktion löscht alle Testdaten
        :return:
        """
        con = sqlite3.connect(testConnection)
        con.execute("delete from users")
        con.commit()
        con.close()
    def GrenzwertAnalyse(this) -> str | bool:
        """
        Diese Funktion führt die Grenzwertanalyse aus.
        :param this:
        :return:
        """
        test : str = this.SimAddUserTwice()
        print(test)
        pass

    def SimAddUserTwice(this) -> str | bool:
        """
        Diese Funktionen fügt eine große Anzahl an Testdaten (mit Duplikaten im Namen) hinzu
        :param this:
        :return:
        """
        for data in UserData:
            try:
                if not database.add_user(data["name"], data["pass"], data["role"], testConnection):
                   # return "User wurde nicht hinzugefügt, war schon drin"
                    pass
            except:
                return "add_user throws an exception where there shouldn\'t be an exception to be thrown!"
        if not all(database.user_exists(data0["name"], testConnection) for data0 in neededResult):
            return "Es wurde ein Nutzer zu wenig durchgef�hrt"
        if not all(database.check_password(data0["name"], data0["pass"], testConnection) for data0 in neededResult):
            return "Es wurde ein Nutzer mit falschen Credentials eingef�gt, irgendwas gecrashed"
        # Jetzt checken ob Dopplungen hinzugef�gt wurden
        con = sqlite3.connect(testConnection)
        cur : sqlite3.Cursor = con.cursor()
        cur.execute("select * from users")
        vals = cur.fetchall()
        if len(vals) != len(neededResult):
            return "add_user hat die Grenzwertanalyse nicht bestanden, es sind die zu viele Rows nach dem Add vorhanden."
        # durch die vorherigen Invarianten wissen wir das die vals jetzt korrekt sind
        return True
def GetRandomRole():
    return random.choice(["administrator", "data_analyst", "simulator"])
def GetRandomName():
    alphabet : str = "abcdefghijklmnopqrstuvwxyz"
    length : int = 10 # smaller 26
    return str(random.choices(alphabet, k = length))

def GetRandomPassword():
    return GetRandomName() + str(random.randint(0, 1000))
if __name__ == "__main__":

    testConnection = "..\\TestUserDataBase.db"
    # empty DB
    con : sqlite3.Connection = sqlite3.connect(testConnection)
    con.execute("delete from users")
    con.commit()
    con.close()
    #print(database.add_user("Boaster", "pass", "role", testConnection))
    # Grenzwert Tests hier
    # Test Connection

    #testConnection : sqlite3.Connection = sqlite3.connect("..\\TestUserDatabase.db")
    # Nutzer Daten hier Random
   # UserData : list[dict[str, str]] = [{"name": GetRandomName(), "pass": GetRandomPassword(), "role": GetRandomRole() } for n in in range(7) for p in range(20) for r in range(4)]
    UserData : list[dict[str, str]] = [{"name": name, "pass": password, "role": role} for name in [GetRandomName() for _ in range(70)] for password in [GetRandomPassword() for _ in range(20)] for role in [GetRandomRole() for _ in range(4)]]
    neededResult : list[dict[str, str]] = []
    for data in UserData:
        if not any(data["name"] == d["name"] for d in neededResult):
            neededResult.append(data)
    #assert all(d in neededResult for d in UserData)
    #assert not True in [neededResult[d] == neededResult[d1] for d in range(0, len(neededResult)) for d1 in range(0, len(neededResult)) if d > d1]
    # Dopplungen erw�nscht!
    assert len(neededResult) < len(UserData)
    UserDBGrenzwertAnalyse()()


def Distinct(l : list) -> list:
    res : list = []
    for val in l:
        if val not in res:
            res.append(val)
    return res

