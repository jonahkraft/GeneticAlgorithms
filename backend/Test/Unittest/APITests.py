import sqlite3, os
import requests, json

from typing import Optional, Union, Callable
from flask.wrappers import Response
from flask import jsonify, request
from flask.app import Flask
from typing import Sequence, Any
from sqlite3 import Connection, Cursor
from backend.app import app
from UnitMeta import  UnitMeta
import requests
from backend import api
class APITests(UnitMeta):
    # Da db.login/db.register correct folgt Korrektheit von api.register/login (siehe Integration Team)
    @app.route("/api/unit/login_test", methods = ["POST", "GET"])
    def TestLoginRegister(self):
        jsonVals = {
            "username": "Test",
            "password": "tester"
        }

if __name__ == "__main__":
    # constants
    ServerAddress : str = "http://localhost:5000/api"
    TestConnection ="../../../db/users.db"
