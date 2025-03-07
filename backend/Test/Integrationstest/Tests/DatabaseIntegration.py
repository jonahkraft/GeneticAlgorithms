from typing import Optional

from backend.Test.Integrationstest.IntegrationMeta import IntegrationMeta
import sqlite3
from flask.wrappers import Response


class DatabaseIntegrationTest(IntegrationMeta):

    """
    This class implements the database integration tests.
    Integration only complete if all the tests return true
    """

    def connect(self, **kwargs) -> bool:
        """
        Test for the correct initialization of the database connection
        possible keyword arguments: database_path
        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict
        :return: returns true if the database connection is established
        :type: bool
        """
        database = sqlite3.connect(kwargs['database_path'])
        assert isinstance(database, sqlite3.Connection),\
            f"Success, connected to database {kwargs['database_path'].split("/")[-1].split(".")[0]}"

        database.close()

        return True

    def databaseToDatabase(self, **kwargs) -> bool:

        """
        Test to ensure that database connection accually works.
        Possible keyword arguments: database_path
        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict
        :return: returns true if the database can be reached
        """

        database = sqlite3.connect(kwargs['database_path'])

        test_username = "TestUser"
        test_password = "TestPassword"

        database.add_user(test_username, test_password, connnection_path=kwargs['database_path'])

        cursor = database.cursor()
        cursor.execute("SELECT * FROM users WHERE ?=user_name",[test_username])

        response = cursor.fetchone()
        if response is not None: response = response[0]

        database.close()
        assert response is not None, "Failure, Got no response from database"

        return True


    def databaseToServer(self, **kwargs) -> bool:

        """
        Test to integration database into the server.
        Possible keyword arguments: database_path, server
        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict
        :return: returns true if the database can communicate with the server
        """

        database = sqlite3.connect(kwargs['database_path'])
        server = kwargs['server']

        test_username = "TestUser"
        test_password = "TestPassword"

        database.add_user(test_username, test_password, connnection_path=kwargs['database_path'])

        serverResponse : Optional[Response, None] = server.login(test_username, test_password)

        assert serverResponse[-1] is 200, f"Failure, Got response {serverResponse[-1]} from server"
        database.close()

        return True

    def integrationInDocker(self, **kwargs) -> bool:
        pass


    def disconnect(self, **kwargs) -> bool:

        """
        Tests for the correct closure of the database connection
        Possible keyword arguments: database_path
        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict
        :return: returns true if the database can be disconnected
        """

        database : sqlite3.Connection = kwargs['database']
        assert database.close() is None, "Success, closed database connection"

        return True

    def __call__(self, *args, **kwargs) -> bool:

        # TODO: run all tests and make sure all are true then return true
        return True





