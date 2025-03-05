# syntax=docker/dockerfile:1

FROM python:3.13.2-slim-bookworm

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--cert=adhoc", "--host=127.0.0.1"]


