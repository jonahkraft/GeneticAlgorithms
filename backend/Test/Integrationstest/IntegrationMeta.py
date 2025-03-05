
from ..Logging import *
from ..MetaTest import MetaTest


class IntegrationMeta(MetaTest):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        pass

    def connect(self):
        pass

    def disconnect(self):
        pass

    def isinterfaceDefiniert(self):
        pass