FROM alpine:3.12 AS builder

# COPY SOURCES
COPY app /app
COPY mew /mew

# BUILD BACKEND
WORKDIR /app
RUN apk add nodejs npm && \
    npm install

# BUILD FRONTEND
WORKDIR /mew
RUN npm install && \
    /mew/node_modules/.bin/vue-cli-service build example/app/src/main.js

########## ########## ##########

FROM alpine:3.12

# COPY ARTIFACTS
COPY --from=builder /app /app
COPY --from=builder /mew/dist /app/dist

ENV DELIVERY_PATH='/delivery.txt'
ENV TXS_PATH='/txs/'

WORKDIR /app

RUN apk add nodejs && \
    adduser -D -H node && \
    touch $DELIVERY_PATH && \
    mkdir -p $TXS_PATH && \
    chown -R node:node /app && \
    chown -R node:node $DELIVERY_PATH && \
    chown -R node:node $TXS_PATH

USER node

ENTRYPOINT ["node"]
CMD ["/app/index.js"]
