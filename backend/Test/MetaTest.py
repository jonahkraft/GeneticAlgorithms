from typing import Any, Callable, Iterable, Sequence, Optional

#ERRORS



class MetaTest:

    def __init__(self, *args, **kwargs):
        pass

    # q
    def typeCheck(self, inferredTypes : list[Any]|Any, actualTypes : list[Any]|Any) -> list[bool]:

        return [isinstance(i, a) for i, a in zip(inferredTypes, actualTypes)] if isinstance(inferredTypes, Iterable) \
            else isinstance(actualTypes, actualTypes)

    def getData(self, func : Callable, **kwargs) -> Any:

        #falls types dann überprufen
        types : list[type]|None = None

        if "types" in kwargs:
            types = kwargs["types"]

        if types is not None:
            kwargs = kwargs.pop("types")

        funcCall : Any = func(**kwargs)
        if funcCall is None: return     #TODO


        if isinstance(funcCall, Sequence):

            for i in range(len(funcCall)):

                if not self.typeCheck(funcCall[i], types[i]):

                    return          #TODO ERROR LOGGING LOGIK




    #getData
    #senddata
    #deletedata
    #connect
    #disconnect





if __name__ == '__main__':

    pass