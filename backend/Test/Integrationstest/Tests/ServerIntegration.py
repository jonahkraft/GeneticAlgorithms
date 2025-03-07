import backend.api as interface
import backend.app as app
from flask import request
import backend.database as database
from flask import Flask
from backend.Test.Integrationstest import IntegrationMeta

class ServerIntegrationTest(IntegrationMeta):

    """
    This class implements the server integration tests.
    Integration only complete if all the tests return true realised by the call function
    """

    def __init__(self):
        super().__init__()

    def connect(self, **kwargs):

        """
        Test for the correct implementation of server initialization.
        Possible keyword arguments: server
        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict
        :return: returns true if server is correctly initialized
        :type: bool
        """

        assert kwargs['server'] is Flask, "Failure, Server not correctly initialized"

        return True

    def serverToDatabase(self, **kwargs):
        pass

    def serverToServer(self, **kwargs):
        pass

    def integrationInDocker(self, **kwargs):
        pass





if __name__ == '__main__':

    # app.app.config['TESTING'] = True
    # app.app.run(debug=True)

    interface = ServerIntegrationTest()
    returnList = interface.connect({
        "username": "Etwas",
        "password": "Etwas"
    }, [True])

    print(returnList)

