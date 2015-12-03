FROM python:3.4
RUN apt-get update && apt-get upgrade -y
ADD . /web/
WORKDIR /web
RUN pip install -r requirements.txt
RUN ./manage.py migrate
