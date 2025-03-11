# How to use docker
1. Download Docker Desktop and start it
2. Navigate to the ```/backend``` directory
3. Run the following command:
```bash
docker compose build
```
4. Run the following command:
```bash
docker compose up
```
Docker should run the backend service for now. 

# How to test the web api
The web api is REST-based. To test it, we used [Postman](https://www.postman.com/downloads/).

1. Start the docker container (See prior section)
2. Start Postman
3. Enter ```https://localhost:5000/api/<endpoint>``` where ```<endpoint>``` is
   the endpoint you want to test
4. Select the correct method (POST, GET, ...)
5. Under Headers, add the key ```Content-Type``` with the value ```application/json```
6. Under Body, select raw and enter the json that shoud be sent

This works for all endpoints that do not require a login. Most of the endpoints
require an access token. This token can be found in the response to a ```login``` request.

As a test user, you may use ```username: user, password: password```. This user has admin privileges.

7. To use the acquired access token, under Headers, add the key ```Authorization``` with the value
   ```Bearer <token>``` where ```<token>``` is the access token

The Available endpoints and their specification can be found in the documentation in the api section.

# Docstring example
```python
"""Gets and prints the spreadsheet's header columns

:param file_loc: The file location of the spreadsheet
:type file_loc: str
:param print_cols: A flag used to print the columns to the console
    (default is False)
:type print_cols: bool
:returns: a list of strings representing the header columns
:rtype: list
"""
```
