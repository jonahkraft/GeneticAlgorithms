
from backend.Test.Integrationstest.IntegrationMeta import IntegrationMeta
import sqlite3


class DatabaseIntegrationTest(IntegrationMeta):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def connect(self, **kwargs):
        """

        :param kwargs: a sequence of required variable-value pairs for the function
        :type kwargs: dict

        :return: returns true if the database connection is established
        :type: bool
        """

        return isinstance(sqlite3.connect(kwargs['database_path']), sqlite3.Connection)

    def disconnect(self, **kwargs):
        pass



