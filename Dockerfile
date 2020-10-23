FROM alpine:3.12

ENV DELIVERY_PATH='/delivery.txt'
ENV TXS_PATH='/txs/'

COPY app /app
WORKDIR /app

RUN apk add nodejs npm && \
    npm install && \
    adduser -D node && \
    touch $DELIVERY_PATH && \
    mkdir -p $TXS_PATH && \
    chown -R node:node $DELIVERY_PATH && \
    chown -R node:node $TXS_PATH

USER node

ENTRYPOINT ["node"]
CMD ["/app/index.js"]
