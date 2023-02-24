FROM python:3.9.10-alpine as builder
MAINTAINER "WilliamGuo <634206396@qq.com>"

ARG APP_NAME=app
RUN apk update && \
    apk add binutils && \
    apk add openssl && \
    apk add gcc && \
    apk add g++ && \
    apk add libjpeg && \
    apk add python3-dev


WORKDIR /build/
COPY / /build/
RUN pip install --upgrade pip && \
    pip3 install -r requirement
RUN python -OO -m PyInstaller --onefile ${APP_NAME}.py --clean --name ${APP_NAME} \
    --key=`openssl rand -base64 16 | cut -c1-16`



FROM alpine:3.14
MAINTAINER "WilliamGuo <634206396@qq.com>"

WORKDIR /app/
COPY --from=builder /build/dist/${APP_NAME} /app/
COPY --from=builder /build/static /app/static
COPY --from=builder /build/templates /app/templates
RUN chmod +x /app/${APP_NAME}

ENTRYPOINT ["/app/app"]
