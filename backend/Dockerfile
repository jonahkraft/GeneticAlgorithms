# syntax=docker/dockerfile:1

FROM python:3.12-alpine

# Install necessary packages
RUN apk add g++ openssl
RUN apk add wine

WORKDIR /backend/

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Generate the certificate and key
RUN openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365 -subj "/CN=localhost"

COPY . .

#CMD [ "python3", "-m" , "flask", "--app", "src/app.py", "run",  "--cert=adhoc", "--host=0.0.0.0"]
#CMD [ "python3", "-m" , "flask", "--app", "src/app.py", "run", "--cert=cert.pem", "--key=key.pem", "--host=0.0.0.0"]
CMD [ "python3", "-m" , "flask", "--app", "src/app.py", "run", "--host=0.0.0.0"]