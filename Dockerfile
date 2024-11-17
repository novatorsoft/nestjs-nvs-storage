FROM node:22 AS builder
WORKDIR /app

COPY package.json yarn.lock ./
COPY tsconfig*.json ./
COPY libs ./libs
COPY apps ./apps
COPY schema.gql ./

RUN yarn install && yarn build nvs-storage-service

FROM node:22-slim
WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock /app/schema.gql ./
RUN yarn install --production

COPY --from=builder /app/dist ./dist

RUN addgroup --system nonroot && \
    adduser --system nonroot --ingroup nonroot && \
    chown -R nonroot:nonroot /app && \
    chmod -R 755 /app

USER nonroot

CMD [ "node", "dist/apps/nvs-storage-service/src/main.js" ]
