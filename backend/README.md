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

# How to start the frontend 
1. go to the frontend directory and run the following command: (only once!)
```bash
npm install vite 
``` 
2. Now you can start the frontend dev server with the following command: 
```bash
npm run dev
```
3. Open your browser and navigate to ```http://localhost:3000/```
4. You should see the frontend running with backend functionality.



# Notizen der der alten Vorgehensweise: 
```bash
docker build --tag genetic-algorithms .
```
To run the docker image use:
```bash
docker run -p 5000:5000 genetic-algorithms
```

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

# How to use main.py/ Schnittstelle
1.  Initialise Schnittstelle object with a population size, a seed and a weight for an explanation on those see the doc.
2. If you want to generate all desired generations at once, use evolute with generation_count equal to the number of generations you want and strategy 1.
3. If you want to run one desired generation in singular increments, use evolute equal to one with strategy 2 and a desired aep value (between 0 and 1, the smaller your value is, the lower your mutationrate will be).