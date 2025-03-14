import sys
sys.path.append("..")

import sqlite3

from MetaTest import MetaTest
from typing import Callable, Sequence, Any, Union
from sqlite3 import Connection, Cursor


class IntegrationMeta(MetaTest):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        pass

    def connect(self, **kwargs):
        """
        :interface: The interface to be checked for a successful connection

        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict

        :return: returns true if the connection is established
        :type: bool
        """

        #if checking data avialable then follow

        # return checkingFunc(connectionInterface(**kwargs))
        return self

    def isinterfaceDefiniert(self):
        return self

    def send(self, promt: Union[Sequence[Any], Any, None], return_ok : Union[Sequence[Any], Any]):
        """
        Checks if an interface communication is possible.
        :param promt: data(s) to be sent
        :param return_ok: the expected return value(s)
        :return: returns true if the interface communication is possible
        """
        pass

    def decompose(self) -> str:
        # TODO : recursive decomposition of the testpassed object
        pass

    @classmethod
    def deleteUserData(cls, **kwargs):

        usernames = kwargs["testUserNames"]

        database : Connection = sqlite3.connect(kwargs['database_path'])
        cursor : Cursor = database.cursor()

        if usernames:
            for username in usernames:
                print("deleted", username)
                cursor.execute('DELETE FROM users WHERE ?= user_name', [username])
        else: cursor.execute('DELETE FROM users WHERE ?= user_name', ["TestUser"])
        database.close()

    def disconnect(self, **kwargs):
        self.deleteUserData(**kwargs)

        return True

    def databaseConnection(self, database_path: str) -> Connection:

        pass




class TestResult(IntegrationMeta):

    def __init__(self, **kwargs) -> None:

        super().__init__(**kwargs)

        self.message = None
        self.isTestPassed = True

    def __eq__(self, other: Any) -> bool:

        return self.isTestPassed == other.isTestPassed


if __name__ == '__main__':
    pass
