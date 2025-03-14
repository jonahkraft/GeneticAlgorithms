
import sqlite3, os
import requests, json

from typing import Optional, Union, Callable
from flask.wrappers import Response
from flask import jsonify, request
from flask.app import Flask
from typing import Sequence, Any
from sqlite3 import Connection, Cursor
from threading import Thread

from backend.src.test.Integrationstest.IntegrationMeta import IntegrationMeta, TestResult


class ServerIntegrationTest(IntegrationMeta):

    """
    This class implements the server integration tests.
    Integration only complete if all the tests return true realised by the call function.
    All interface communications go through the server
    """

    def __init__(self):
        super().__init__()
        self.usedUserNames : list = []

    def connect(self, **kwargs) -> bool:

        """
        Test for the correct implementation of server initialization.
        Possible keyword arguments: server
        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict
        :return: returns true if server is correctly initialized
        :type: bool
        """

        assert self.typeCheck(kwargs['server'], kwargs['server_obj_type']), "Failure (Connect), Server not correctly initialized"

        return True

    def serverToDatabase(self, **kwargs) -> bool:

        """
        Test for integration of server into database.
        Possible keyword arguments: database_path, server_address, database_module
        :param kwargs: a sequence of required variable-value pairs for the function
        :return: returns true if the server can communicate with the database
        """


        test_username_admin : str = "TestUser"
        test_password : str = "TestPassword"

        databaseModule = kwargs['database_module']

        databaseModule.add_user(test_username_admin, test_password, role="administrator", connection_path=kwargs['database_path'])
        database : Connection = sqlite3.connect(kwargs['database_path'])

        server_address : str = kwargs['server_address'] if kwargs['server_address'] is not None else "http://localhost:5000/api"
        serverResponseForAdmin = requests.post(f"{server_address}/login",
                                       json={"username": test_username_admin, "password": test_password})

        test_username = "TestUser10"
        serverResponseUserRegistration = requests.post(f"{server_address}/register",
                                       json={"username": f"{test_username}", "password": test_password, "role": "data_analyst"},
                                       headers={
                                           "Authorization": f"Bearer {serverResponseForAdmin.json()['access_token']}",
                                           "Content-type" : "application/json"
                                       }).status_code

        cursor : Cursor = database.cursor()
        cursor.execute("SELECT * FROM users WHERE ?= user_name", [test_username_admin])

        databaseResponse : Any = cursor.fetchone()
        if databaseResponse is Sequence: databaseResponse = databaseResponse[0]

        assert serverResponseUserRegistration == serverResponseForAdmin.status_code == 200 and databaseResponse is not None, f"Failure (Server to Database), Got response {serverResponseForAdmin} from server"
        database.close()

        self.usedUserNames.append(test_username_admin)
        self.usedUserNames.append(test_username)
        return True

    def serverToServer(self, **kwargs) -> bool:

        """
         Test for the server to server communication.
         Possible keyword arguments: server_address
         :param kwargs: a sequence of required variable-value pairs for the function
         :return: returns true if the server can communicate with the database
         """

        server_address : str = kwargs['server_address'] if kwargs['server_address'] is not None else "http://localhost:5000/api"
        serverResponse = requests.get(f"{server_address}/integration/empty_ping").status_code

        assert serverResponse == 200, "Failure (Server to Server), Server not responding"

        return True


    def serverToUserRendering(self, **kwargs) -> bool:

        """
         Test for the correct implementation of server endpoints under specific conditions.
         Possible keyword arguments: server_address, personells, rounting_matrix
         :param kwargs: a sequence of required variable-value pairs for the function
         :return: returns true if the server can returns a 200 when it should render and anything except 200 if
         server should not render
         """

        personells : Sequence[str] = kwargs['personells']
        userdataTemp : dict[str, str] = {"username": "TestUser", "password": "TestPassword", "role": None}
        testUserDatas : list[dict] = []

        count = 5
        for each in personells:

            userdataTemp["username"] += f"{count}"
            self.usedUserNames.append(userdataTemp["username"])
            userdataTemp["role"] = each

            testUserDatas.append(userdataTemp.copy())
            count += 1

        server_address : str = kwargs['server_address'] if kwargs['server_address'] is not None else "http://localhost:5000/api"

        serverResponseForAdmin = requests.post(f"{server_address}/login",
                                               json={"username": "TestUser", "password": "TestPassword"})

        serverResponses = [
            requests.post(f"{server_address}/register",
                          json=testUserDatas[i],
                          headers={
                              "Authorization": f"Bearer {serverResponseForAdmin.json()['access_token']}",
                              "Content-type" : "application/json"}
                          ).status_code for i in range(len(testUserDatas))
        ]

        assert serverResponses == [200] * len(serverResponses), "Failure (Internal Server Communication), Server cannot register users"

        # 2d list of [[(endpoints, METHOD), [allowed personell]] ...] als eingabe
        multiDRoutingMatrix : list[list[Union[tuple[str], list[str]]]] = kwargs['rounting_matrix']

        #login the users
        testUserDatas = [
            {
               "username" : testUserDatas[i]['username'],
                "password" : testUserDatas[i]['password'],
                "role" : testUserDatas[i]['role'],
                "access_token" : requests.post(f"{server_address}/login", json=testUserDatas[i]).json()['access_token']
            }
            for i in range(len(testUserDatas))
        ]

        header = lambda x : {"Authorization" : f"Bearer {x['access_token']}"}

        serverRequest = lambda method, url, headers, json : requests.request(method=method.lower(), url=url, headers=headers, json=json)

        for i in range(len(multiDRoutingMatrix)):

            endpoint = multiDRoutingMatrix[i][0]
            personellAllowed = multiDRoutingMatrix[i][1]

            usersAllowed = [testUserDatas[i] for i in range(len(testUserDatas)) if testUserDatas[i]['role'] in personellAllowed]
            usersForbidden = [testUserDatas[i] for i in range(len(testUserDatas)) if testUserDatas[i]['role'] not in personellAllowed]

            for each in range(len(usersAllowed)):

                # print("allowed ", usersAllowed[each]['role'], endpoint[0])
                assert not (serverRequest(method=endpoint[1], url=f"{server_address}/{endpoint[0]}",
                             headers=header(usersAllowed[i]), json=usersAllowed[each]).status_code
                        == 401), "Failure (Server Authentication Error), Server failed to render to authorized user"


            for each in range(len(usersForbidden)):

                # print("forbidden ", usersForbidden[each]['role'], endpoint[0])
                assert (serverRequest(method=endpoint[1], url=f"{server_address}/{endpoint[0]}",
                                      headers=header(usersForbidden[i]), json=usersForbidden[each]).status_code
                        == 401), "Failure (Server Authentication Error), Server rendered to unauthorized user"

        return True


    def __call__(self, *args, **kwargs) -> bool:

        """
        Call the integration instance to run the tests
        :return: returns true if all tests passed
        """

        return (self.connect(**kwargs) is self.serverToServer(**kwargs) is self.serverToDatabase(**kwargs)
                is self.serverToUserRendering(**kwargs) is self.disconnect(testUserNames=self.usedUserNames, **kwargs))



if __name__ == '__main__':

    from backend.src import database as database_module

    serverIntegrationInstance = ServerIntegrationTest()
    serverIntegrationResult = serverIntegrationInstance(server_address="http://127.0.0.1:5000/api",
                                                        server=Flask,                               #TODO do it right
                                                        database_path="../../../../db/users.db",
                                                        server_obj_type=type(Flask),
                                                        database_module=database_module,
                                                        personells=["data_analyst", "simulator"],
                                                        # rounting_matrix = [[(endpoints, METHOD), [allowed personell]] ...]
                                                        rounting_matrix=[[("get_simulation_data", "POST"), ["data_analyst", "administrator"]],
                                                                         [("get_users", "GET"), ["administrator"]],
                                                ]
                                                        )

    print(serverIntegrationResult)





