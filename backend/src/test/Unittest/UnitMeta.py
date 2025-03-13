from backend.src.test.MetaTest import MetaTest
from typing import Callable


class UnitMeta(MetaTest):
    def __init__(self, *args, **kwargs):
        pass
    def __call__(self, *args, **kwargs):
        """
        Ruft alle Tests der Testklasse auf und gibt die Ergebnisse über I/O zurück (Console).
        :param args:
        :param kwargs:
        :return:
        """
        raise NotImplementedError("Die ableitende Testklasse sollte diese Funktion implementieren!")

    def CheckValidState(func : Callable, getState : Callable, *fargs : list):
        """
        Überprüft ob der State nach dem Aufruf einer gegebenen Funktion korrekt ist
        :param func - die Funktion die aufgerufen wird
        :param getState - Die Funktion die den aktuellen Status erfasst (keine Argumente!)
        :param finalState - Der geforderte finale Status
        :return Boolean ob der Ablauf korrekt war
        """
        data = getState()
        func(fargs)
        return getState() == func(fargs)

