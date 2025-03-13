import sqlite3
import requests, json
from flask import jsonify, request
from UnitMeta import UnitMeta
import DatabaseGrenzwertAnalyse
class APITests(UnitMeta):
    def __init__(self):
        self.ClearDataBase()
        self.registered = False
        self.TestData = [{"username": DatabaseGrenzwertAnalyse.GetRandomName(), "password": DatabaseGrenzwertAnalyse.GetRandomPassword(), "role": DatabaseGrenzwertAnalyse.GetRandomRole()} for _ in range(100)]

        pass
    def ClearDataBase(self):
        con = sqlite3.connect("..\\..\\..\\db\\users.db")
        con.execute("delete from users where user_name <> \'user\'")
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
        data = json.loads(requests.post("http://localhost:5000/api/login", data = json.dumps(data), headers = headers).text)
        token = data["access_token"]
        if data["registered"] == registered and (not registered or (data["password_correct"] == password_correct and (not password_correct or data["role"] == role))):
            return token
        return False
    def TestLoginDeleteUser(self):
        for data in self.TestData:
            token = self.LoginData(data, data["role"] != "invalid-role", True, data["role"])
            if not token:
                return "Fehler bei dem Login"
            # now delete
            if not self.DeletaData(data, data["role"] != "invalid-role", token):
                return "Fehler bei Delete"
        return True


    def DeletaData(self, data : dict[str, str], user_exists : bool, token : str) -> bool:
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain', "Authorization": f"Bearer {token}"}
        res = requests.post("http://localhost:5000/api/register", data = json.dumps(data), headers= headers)
        return json.loads(res.text)["success"] == user_exists
    def RegisterData(self, data : dict[str, str], token : str) -> bool:
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain', "Authorization": f"Bearer {token}"}
        res = requests.post("http://localhost:5000/api/register", data = json.dumps(data), headers= headers)
        res = json.loads(res.text)
        return not res["already_registered"] and not res["invalid_role"] == (data["role"] != "invalid-role") and res["success"]
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