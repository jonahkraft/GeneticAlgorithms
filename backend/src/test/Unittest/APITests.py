import sqlite3
import requests, json
import hashlib
from UnitMeta import UnitMeta
import DatabaseGrenzwertAnalyse


class APITests(UnitMeta):
    def __init__(self):
        self.ClearDataBase()
        self.registered = False
        COUNT = 100
        self.TestData = [{"username": DatabaseGrenzwertAnalyse.GetRandomName(), "password": DatabaseGrenzwertAnalyse.GetRandomPassword(), "role": DatabaseGrenzwertAnalyse.GetRandomRole(True)} for _ in range(COUNT)]

        pass
    def ClearDataBase(self):
        con = sqlite3.connect("../../../db/users.db")
        con.execute("delete from users where username <> \'user\'")
        con.commit()



    def TestRegister(self):
        # login as admin
        adminToken = self.GetAdminToken()
        for data in self.TestData:
            if not self.RegisterData(data, adminToken):
                return "Fehler bei api_register"
        self.registered = True
        return True
    def LoginData(self, data : dict[str, str], registered : bool, password_correct : bool, role : str) -> str | bool:
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        val = json.loads(requests.post("http://localhost:5000/api/login", data = json.dumps(data), headers = headers).text)
        token = val["access_token"]
        valid = val["registered"] == registered
        if not valid:
            return False
        if not registered:
            return True
        if not password_correct:
            return val["password_correct"] == password_correct
        if val["role"] == role:
            return token

        return False
    def TestLoginDeleteUser(self):
        for data in self.TestData:

            # Test with wrong password
            pw, data["password"] =  data["password"], "wrongpass0"
            if not self.LoginData(data, data["role"] != "invalid-role", False, data["role"]):
                return "Fehler beim falschen Login"
            data["password"] = pw
            # Test with right password

            token = self.LoginData(data, data["role"] != "invalid-role", True, data["role"])
            if not token:
                return "Fehler bei dem Login"

            # now delete
            if not self.DeletaData(data, data["role"] == "administrator", token): # Nur der Admin darf sich löschen
                return "Fehler bei Delete"
            if data["role"] == "invalid-role":
                continue

        return True

    def TestChangePassword(self):
        for data in self.TestData:
            # jetzt mit falschem Pass und user token
            token = self.LoginData(data, data["role"] != "invalid-role", True, data["role"])
            if type(token) == bool:
                # test mit invalid token, invalid username
                if not self.ChangePassword(data, False, "invalid-token"):
                    return "Das Passwort sollte nicht geändert werden, wenn der Account nicht existiert und das Token falsch ist"
                continue # Invalid Role, hier kein weiterer Test
            data["old_password"] = "Schwachsinn"
            data["new_password"] = "egal"
            if not self.ChangePassword(data, False, token):
                return "Fehler bei Change Password, falsches Passwort sollte nicht geändert werden"
            # Erstmal korrekt mit User-Token Passwort ändern
            data["old_password"] = data["password"]
            data["new_password"] = DatabaseGrenzwertAnalyse.GetRandomPassword()


            if not self.ChangePassword(data, True, token):
                return "Das Passwort wurde nicht korrekt geändert obwohl alle Daten stimmen"


            # jetzt mit admin; weiterhin korrekt; passwort jetzt aber falsch (Admin darf immer ändern)
            token = self.GetAdminToken()
            if not self.ChangePassword(data, True, token):
                return "Das Passwort sollte auch vom Admin geändert werden können"

            return True


    def ChangePassword(self, data : dict[str, str], should_succeed : bool, token : str) -> bool:
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain', "Authorization": f"Bearer {token}"}
        res = requests.post("http://localhost:5000/api/change_password", data = json.dumps(data), headers= headers)
        con = sqlite3.connect("../../../db/users.db")
        if token == "invalid-token":
            return res.status_code != 200
        cur = con.cursor()
        cur.execute("select hashed_password from users where username = " + "\"" + data["username"] + "\"")
        try:
            actual = cur.fetchone()[0]
        except:
            actual = None
            expected = "other"
        expected = HashFunction(data["new_password"])
        cur.close()
        con.close()
        return should_succeed == (expected == actual)

    def DeletaData(self, data : dict[str, str], should_succeed : bool, token : str) -> bool:
        """
        Überprüft ob die Daten korrekt gelöscht werden.
        :param data:
        :param should_succeed: Bei False sollte die Funktion fehlschlagen.
        :param token:
        :return:
        """
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain', "Authorization": f"Bearer {token}"}
        res = requests.post("http://localhost:5000/api/delete_user", data = json.dumps(data), headers= headers)
        return (res.status_code == 200) == should_succeed
    def RegisterData(self, data : dict[str, str], token : str) -> bool:
        """
        Registriert sich mit den gegebenen Daten, überprüft zudem ob die Registrierung korrekt erfolgen soll oder nicht.
        :param data:
        :param token:
        :return:
        """
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain', "Authorization": f"Bearer {token}"}
        res = requests.post("http://localhost:5000/api/register", data = json.dumps(data), headers= headers)
        res = json.loads(res.text)
        valid = not res["already_registered"]
        return valid and (data["role"] == "invalid-role") == res["invalid_role"] and res["success"] == (not res["invalid_role"])
    def GetAdminToken(self):
        """
        Loggt sich mit einem Admin Account ein und gibt das Token zurück.
        :return:
        """
        obj = {
            "username": "user",
            "password": "password"
        }
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        data = requests.post("http://localhost:5000/api/login", data = json.dumps(obj), headers = headers)
        return json.loads(data.text)["access_token"]

    def __call__(self, *args, **kwargs):
        print(self.TestRegister())
        print(self.TestLoginDeleteUser())
        self.ClearDataBase()
        print(self.TestRegister())
        print(self.TestChangePassword())



def HashFunction(input : str) -> str:
    """
    Die SHA-256 Hashfunktion in Python.
    :param input: Der zu hashende String
    :return: Der gehaste String.
    """
    hash_object = hashlib.sha256();
    hash_object.update(input.encode("utf-8"));
    return hash_object.hexdigest();


if __name__ == "__main__":
    APITests()()