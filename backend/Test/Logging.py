

#Error Classen

class ServerError(Exception):

    def __init__(self, message):
        super(ServerError, self).__init__(message)
        self.message = message


#TODO projektspezifishe Errors definieren