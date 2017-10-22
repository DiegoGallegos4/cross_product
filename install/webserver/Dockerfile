FROM alpine:3.6

RUN apk update \
  && apk --no-cache add python3 \
    python3-dev \
    py3-psycopg2 \
    && python3 -m ensurepip \
    && pip3 install --upgrade pip gunicorn 

WORKDIR /usr/src/app

COPY ./requirements.txt ./requirements.txt

RUN pip3 install --no-cache-dir -r requirements.txt

