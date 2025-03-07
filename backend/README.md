# How to use the docker image

Navigate to the ```/backend``` directory,
then run the following command:

```bash
docker build --tag genetic-algorithms .
```

To run the docker image use:

```bash
docker run -p 5000:5000 genetic-algorithms
```

On Linux/Unix systems docker commands require root privileges by default.

# Docstrings:

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


For persistent storage, use the following command:
```bash
docker compose build
```
```bash
docker compose up
```