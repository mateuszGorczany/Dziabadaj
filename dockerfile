FROM python:3.8-slim

# set working directory
WORKDIR /app

# copy source code into working directory
COPY server/requirements.txt /tmp

# install required libraries
RUN pip install -r /tmp/requirements.txt

COPY . /app

# tell which port will be exposed to dind docker
EXPOSE 1999

CMD ["python", "server/app.py"]
