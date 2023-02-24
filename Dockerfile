FROM python:3.9.10-alpine as builder
MAINTAINER "WilliamGuo <634206396@qq.com>"

ARG APP_NAME=app
RUN apk update && \
    apk add binutils


WORKDIR /app/
COPY / /app/
RUN pip install --upgrade pip && \
    pip3 install -r requirement


ENTRYPOINT ["python","/app/app.py"]
