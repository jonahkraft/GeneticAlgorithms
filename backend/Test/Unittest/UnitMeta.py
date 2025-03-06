from backend.Test.MetaTest import MetaTest
from typing import Callable

class UnitMeta(MetaTest):
    def __init__(self, *args, **kwargs):
        pass


    def CheckValidState(func : Callable, getState : Callable, *fargs : list):
        """
    /// <summary>
        Überprüft ob der State nach dem Aufruf einer gegebenen Funktion korrekt ist
        func - die Funktion die aufgerufen wird
        getState - Die Funktion die den aktuellen Status erfasst (keine Argumente!)
        finalState - Der geforderte finale Status
    /// </summary>
        """
        data = getState()
        func(fargs)
        return getState() == func(fargs)

