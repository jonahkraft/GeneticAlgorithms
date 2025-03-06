from typing import Callable

from backend.Test.Integrationstest.IntegrationMeta import IntegrationMeta
import backend.api as server
from flask_jwt_extended import jwt_required
from flask import request
import backend.database as database

class ServerIntegrationTest:

    def connect(self, users : dict, responses : list):

        returnList = []
        if request.method == "GET":

            for i in range(len(users)):

                username = users[i][0]
                password = users[i][1]

                if database.user_exists(username, "TEST DATENBANK"):
                    pass

                _, response = server.login(username, password)

                returnList.append(response == responses[i])

        return returnList


if __name__ == '__main__':


    server = ServerIntegrationTest()
    server.connect({
        "username": "",
        "password": ""
    }, [True])
