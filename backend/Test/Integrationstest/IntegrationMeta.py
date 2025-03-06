
# from ..Logging import *
# from ..MetaTest import MetaTest
from backend.Test.MetaTest import MetaTest
from typing import Callable, Sequence, Any, Union
import sqlite3
# from Tests import DatabaseIntegration, DockerIntegration, ServerIntegration, SimulationIntegration
import backend.api as server


class IntegrationMeta(MetaTest):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        pass

    def connect(self, checkingFunc : Callable, connectionInterface : Callable, **kwargs) -> bool:
        """
        :interface: The interface to be checked for a successful connection

        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict

        :return: returns true if the connection is established
        :type: bool
        """

        #if checking data avialable then follow

        return checkingFunc(connectionInterface(**kwargs))

    def disconnect(self):
        pass

    def isinterfaceDefiniert(self):
        pass

    def send(self, promt: Union[Sequence[Any], Any, None], return_ok : Union[Sequence[Any], Any]) -> bool:
        """
        Checks if an interface communication is possible.
        :param promt: data(s) to be sent
        :param return_ok: the expected return value(s)
        :return: returns true if the interface communication is possible
        """


    def __call__(self, *args, **kwargs):
        self.connect(**kwargs)
        self.isinterfaceDefiniert()
        self.disconnect()


if __name__ == '__main__':
    pass
    #Integrations


    #SHOULD BE IN OWN INTEGRATION
    #
    # #DATABASE INTEGRATION
    # DatabaseIntegrationInstance = DatabaseIntegration.DatabaseIntegrationTest()
    # DatabaseIntegrationInstance(connectionInterface=sqlite3.connect, database_path = "")
    #
    #
    #
    # #DOCKER INTEGRATION
    # ServerIntegrationInstance = DockerIntegration.DockerIntegrationTest()
    # ServerIntegrationInstance()