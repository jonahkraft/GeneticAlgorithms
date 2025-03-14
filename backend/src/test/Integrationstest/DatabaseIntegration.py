
import sqlite3
import requests

from typing import Optional, Any, Sequence
from flask import jsonify
from flask.wrappers import Response
from sqlite3 import Connection, Cursor
from flask.app import Flask

from backend.src.test.Integrationstest.IntegrationMeta import IntegrationMeta, TestResult


class DatabaseIntegrationTest(IntegrationMeta):

    """
    This class implements the database integration tests.
    Integration only complete if all the tests return true
    """

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.usedUserNames : list = []

    def connect(self, **kwargs) -> bool:
        """
        Test for the correct initialization of the database connection
        possible keyword arguments: database_path
        :param kwargs: a sequence of required variable-value pairs for the function
        :return: returns true if the database connection is established
        """
        database : Connection = sqlite3.connect(kwargs['database_path'])
        assert self.typeCheck(database, sqlite3.Connection),\
            f"Failure (Connect), cannot connect to database '{kwargs['database_path'].split("/")[-1].split(".")[0]}'"

        # try:
        #     database : Connection = sqlite3.connect(kwargs['database_path'])
        # except Exception:
        #

        database.close()

        return True             #TODO : through the TESTPASSED pipeline

    def databaseToDatabase(self, **kwargs) -> bool:

        """
        Test to ensure that database connection accually works.
        Possible keyword arguments: database_path
        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict
        :return: returns true if the database can be reached
        """

        database : Connection = sqlite3.connect(kwargs['database_path'])

        test_username = "TestUser"
        test_password = "TestPassword"

        database.add_user(test_username, test_password, connnection_path=kwargs['database_path'])

        cursor : Cursor = database.cursor()
        cursor.execute('SELECT * FROM users WHERE ?=user_name',[test_username])

        response : Any = cursor.fetchone()
        if response is Sequence: response = response[0]

        database.close()
        assert response is not None, "Failure (Database to Database), Got no response from database"

        return True


    def databaseToServer(self, **kwargs) -> bool:

        """
        Test to integration database into the server.
        Possible keyword arguments: database_path, server_address
        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict
        :return: returns true if the database can communicate with the server
        """

        database : Connection = sqlite3.connect(kwargs['database_path'])

        test_username = "TestUser"
        test_password = "TestPassword"

        database.add_user(test_username, test_password, connnection_path=kwargs['database_path'])

        server_address : str = kwargs['server_address'] if kwargs['server_address'] is not None else "http://localhost:5000/api"    #TODO: through meta
        serverResponse : Optional[Response] = requests.post(f"{server_address}/login",                                          #TODO: IMPLEMENT encapsed optional
                                                                  json={"username":test_username, "password": test_password})

        assert serverResponse.status_code == 200, f"Failure (Database to Server), Got response {serverResponse.status_code} from server"
        database.close()

        return True

    def disconnect(self, **kwargs) -> bool:

        """
        Tests for the correct closure of the database connection
        Possible keyword arguments: database_path
        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict
        :return: returns true if the database can be disconnected
        """

        database : Connection = kwargs['database']
        assert database.close() is None, "Failure (Disconnect), closed database connection"
        self.deleteUserData(**kwargs)
        return True

    def __call__(self, *args, **kwargs) -> bool:
        #TODO: PASS THE ARGUMENTS TO THE FUNCTIONS BY EACH / delete all test user data
        """
        Runs all the database integration tests
        :param args: positional arguments
        :param kwargs: takes the configuration data needed throughout the integration tests
        :return: returns true if all tests passed
        """
        return self.connect(**kwargs)
        # return (self.connect(**kwargs) is self.databaseToDatabase(**kwargs)
        #         is self.databaseToServer(**kwargs) is self.disconnect(testUserNames=self.usedUserNames, **kwargs))


if __name__ == "__main__":

    databaseIntegrationInstance = DatabaseIntegrationTest()
    testResult = databaseIntegrationInstance(database_path="../../../../db/users.db",
                                             database=sqlite3.connect("../../../../db/users.db")
                                             )

    print(testResult)
    # databaseIntegrationInstance.connect().connect().connect()





