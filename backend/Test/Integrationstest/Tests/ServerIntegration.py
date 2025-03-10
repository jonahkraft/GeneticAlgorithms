
import sqlite3, os
import requests, json

from typing import Optional, Union, Callable
from flask.wrappers import Response
from flask import jsonify, request
from flask.app import Flask
from typing import Sequence, Any
from sqlite3 import Connection, Cursor

from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

from backend.Test.Integrationstest.IntegrationMeta import IntegrationMeta, TestResult


# TODO: INTEGRATION OF TESTING INTERFACE META WITH FLASK SERVER
# TODO: INTEGRATION OF TESTING INTERFACE META WITH DOCKER

class ServerIntegrationTest(IntegrationMeta):

    """
    This class implements the server integration tests.
    Integration only complete if all the tests return true realised by the call function.
    All interface communications go through the server
    """

    def connect(self, **kwargs) -> IntegrationMeta:

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

    def serverToDatabase(self, **kwargs) -> IntegrationMeta:

        """
        Test for integration of server into database.
        Possible keyword arguments: database_path, server, server_address, database_module
        :param kwargs: a sequence of required variable-value pairs for the function
        :return: returns true if the server can communicate with the database
        """


        test_username : str = "TestUser"
        test_password : str = "TestPassword"

        databaseModule = kwargs['database_module']

        databaseModule.add_user(test_username, test_password, role="administrator", connection_path=kwargs['database_path'])
        database : Connection = sqlite3.connect(kwargs['database_path'])

        serverResponseForAdmin = requests.post(f"{kwargs['server_address']}/login",
                                       json={"username": test_username, "password": test_password})

        print(serverResponseForAdmin.text)
        serverResponseForAdmin = json.loads(serverResponseForAdmin.text)
        print(serverResponseForAdmin)

        server_address : str = kwargs['server_address'] if kwargs['server_address'] is not None else "http://localhost:5000/api"
        serverResponse = requests.post(f"{server_address}/register",
                                       json={"username": test_username, "password": test_password, "role": "data_analyst"},
                                       headers={"Authorization": serverResponseForAdmin['access_token']}).status_code

        cursor : Cursor = database.cursor()
        cursor.execute("SELECT * FROM users WHERE ?= user_name", [test_username])

        databaseResponse : Any = cursor.fetchone()
        if databaseResponse is Sequence: databaseResponse = databaseResponse[0]

        print(serverResponseForAdmin, databaseResponse)
        assert serverResponse == serverResponseForAdmin.status_code == 200 and databaseResponse is not None, f"Failure (Server to Database), Got response {serverResponseForAdmin} from server"
        database.close()

        return True

    def serverToServer(self, **kwargs) -> IntegrationMeta:

        """
         Test for the server to server communication.
         Possible keyword arguments: server_address
         :param kwargs: a sequence of required variable-value pairs for the function
         :return: returns true if the server can communicate with the database
         """

        server_address : str = kwargs['server_address'] if kwargs['server_address'] is not None else "http://localhost:5000/api"
        serverResponse = requests.get(f"{server_address}/integration/empty_ping").status_code

        print(serverResponse)

        assert serverResponse == 200, "Failure (Server to Server), Server not responding"

        return True


    def serverToUserRendering(self, **kwargs) -> IntegrationMeta:

        """
         Test for the correct implementation of server endpoints under specific conditions.
         Possible keyword arguments: server_address, personells
         :param kwargs: a sequence of required variable-value pairs for the function
         :return: returns true if the server can returns a 200 when it should render and anything except 200 if
         server should not render
         """

        #TODO: set up test user data to be stored in the database with all the roles and get response 200 from allowed routes
        #TODO: set up test user data to be stored in the database with all the roles and get response 401 from not allowed routes

        # personells = ["data_analyst", "administrator", "simulation_expert"]        # should not be used directly
        personells : Sequence[str] = kwargs['personells']
        userdataTemp : dict[str, str] = {"username": "TestUser", "TestPassword": "<PASSWORD>", "role": None}
        testUserDatas : list[dict] = []

        for each in personells:

            userdataTemp["role"] = each
            testUserDatas.append(userdataTemp)

        server_address : str = kwargs['server_address'] if kwargs['server_address'] is not None else "http://localhost:5000/api"

        serverResponses = [
            requests.post(f"{server_address}/register", json=testUserDatas[i]).status_code for i in range(len(testUserDatas))
        ]

        assert serverResponses == [200] * len(serverResponses), "Failure (Internal Server Communication), Server cannot register users" #TODO with roles ...

        # TODO try to get routes allowed then not allowed

        # 2d list of [["personell", [(allowed endpoints, METHOD)]] ...] als eingabe
        # multiDRoutingMatrix : list[Union[str, list[tuple[str, str]]]] = kwargs['rounting_matrix']

        # 2d list of [[(endpoints, METHOD), [allowed personell]] ...] als eingabe
        multiDRoutingMatrix : list[list[Union[tuple[str], list[str]]]] = kwargs['rounting_matrix']       #TODO: allow flexible input signature

        #login the users
        testUserDatas = [
            {
               "username" : testUserDatas[i]['username'],
                "password" : testUserDatas[i]['password'],
                "role" : testUserDatas[i]['role'],
                "access_token" : dict(requests.post(f"{server_address}/login", json=testUserDatas[i]).json())['access_token']
            }
            for i in range(len(testUserDatas))
        ]

        header = lambda x : {"Authorization" : f"Bearer {x['access_token']}"}

        serverRequest = lambda method, url, headers : requests.request(method=method.lower(), url=url, headers=headers)

        for i in range(len(multiDRoutingMatrix)):

            endpoint = multiDRoutingMatrix[i][0]
            personellAllowed = multiDRoutingMatrix[i][1]

            usersAllowed = [testUserDatas[i] for i in range(len(testUserDatas)) if testUserDatas[i]['role'] in personellAllowed]
            usersForbidden = [testUserDatas[i] for i in range(len(testUserDatas)) if testUserDatas[i]['role'] not in personellAllowed]
            for each in range(len(usersAllowed)):

                assert (serverRequest(method=endpoint[0], url=f"{server_address}/{endpoint}",
                             headers=header(usersAllowed[i])).status_code
                        == 200), "Failure (Server Authentication Error), Server failed to rendered authorized user"


                # if endpoint[0].lower() == "get":
                #
                #     assert not (requests.get(f"{server_address}/{endpoint}",
                #                         headers=header(usersAllowed[i])).status_code
                #             == 200), "Failure (Server Authentication Error), Server failed to rendered authorized user"  #TODO specify
                #
                # elif endpoint[0].lower() == "post":
                #
                #     assert not (requests.post(f"{server_address}/{endpoint}",
                #                          headers=header(usersAllowed[i])).status_code
                #             == 200), "Failure (Server Authentication Error), Server failed to rendered authorized user" #TODO specify

            for each in range(len(usersForbidden)):

                assert (serverRequest(method=endpoint[0], url=f"{server_address}/{endpoint}",
                                      headers=header(usersForbidden[i])).status_code
                        == 200), "Failure (Server Authentication Error), Server rendered unauthorized user"

                # if endpoint[0].lower() == "get":
                #
                #     assert (requests.get(f"{server_address}/{endpoint}",
                #                          headers=header(usersForbidden[i])).status_code
                #             == 200), "Failure (Server Authentication Error), Server rendered unauthorized user"  #TODO specify
                #
                # elif endpoint[0].lower() == "post":
                #
                #     assert (requests.post(f"{server_address}/{endpoint}",
                #                           headers=header(usersForbidden[i])).status_code
                #             == 200), "Failure (Server Authentication Error), Server rendered unauthorized user" #TODO specify

        return True

    def integrationInDocker(self, **kwargs) -> IntegrationMeta:
        pass

    def __call__(self, *args, **kwargs) -> IntegrationMeta:

        """
        Call the integration instance to run the tests
        :return: returns true if all tests passed
        """

        #TODO run tests and delete all test user data from database
        self.deleteUserData(database_path=kwargs['database_path'])
        return (self.connect(**kwargs) is self.serverToServer(**kwargs) is self.serverToDatabase(**kwargs)
                is self.serverToUserRendering(**kwargs) is self.disconnect())



if __name__ == '__main__':

    from backend.app import app
    import backend.database as database_module

    @app.route("/api/integration/empty_ping", methods = ["GET"])
    def empty_ping() -> Response:

        return Response(response=None, status=200)

    @app.route("/api/integration/run_tests", methods=["GET", "POST"])
    def run_integration_tests():

        serverIntegrationInstance = ServerIntegrationTest()
        res = serverIntegrationInstance(server_address="http://localhost:5000/api",
                                  server=app,
                                  database_path="../../../db/users.db",
                                  server_obj_type=type(Flask),
                                  database_module=database_module
                                        )

        print(res)

        return jsonify("Integration successful"), 200


    app.run(debug=True)



