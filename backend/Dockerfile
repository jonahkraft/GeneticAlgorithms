# syntax=docker/dockerfile:1

FROM python:3.12-alpine
RUN apk add g++ 

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

#CMD [ "python3", "-m" , "flask", "run", "--cert=adhoc", "--host=0.0.0.0"]
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
