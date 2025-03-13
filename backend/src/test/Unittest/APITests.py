import sqlite3
import requests, json
from flask import jsonify, request
from UnitMeta import UnitMeta
import DatabaseGrenzwertAnalyse
class APITests(UnitMeta):
    def __init__(self):
        self.ClearDataBase()
        self.registered = False
        self.TestData = [{"username": DatabaseGrenzwertAnalyse.GetRandomName(), "password": DatabaseGrenzwertAnalyse.GetRandomPassword(), "role": DatabaseGrenzwertAnalyse.GetRandomRole(True)} for _ in range(100)]

        pass
    def ClearDataBase(self):
        con = sqlite3.connect("..\\..\\..\\db\\users.db")
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
            # Test with right password
            token = self.LoginData(data, data["role"] != "invalid-role", True, data["role"])
            if not token:
                return "Fehler bei dem Login"
            # now delete
            if not self.DeletaData(data, data["role"] == "administrator", token): # Nur der Admin darf sich löschen
                return "Fehler bei Delete"
            if data["role"] == "invalid-role":
                continue
            # Test with wrong password
            data0 = data.copy()
            data0["password"] = "wrongpass0"
            if not self.LoginData(data0, True, False, data["role"]):
                return "Fehler beim falschen Login"
        return True


    def DeletaData(self, data : dict[str, str], should_succeed : bool, token : str) -> bool:
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain', "Authorization": f"Bearer {token}"}
        res = requests.post("http://localhost:5000/api/delete_user", data = json.dumps(data), headers= headers)
        return (res.status_code == 200) == should_succeed
    def RegisterData(self, data : dict[str, str], token : str) -> bool:
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain', "Authorization": f"Bearer {token}"}
        res = requests.post("http://localhost:5000/api/register", data = json.dumps(data), headers= headers)
        res = json.loads(res.text)
        valid = not res["already_registered"]
        return valid and (data["role"] == "invalid-role") == res["invalid_role"] and res["success"] == (not res["invalid_role"])
    def GetAdminToken(self):
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



if __name__ == "__main__":
    APITests()()