FROM node:22 
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./

RUN yarn install

COPY libs ./libs
COPY apps ./apps

RUN yarn build nvs-storage-service

RUN addgroup --system nonroot \
    && adduser --system nonroot --ingroup nonroot

USER nonroot

CMD [ "node", "dist/apps/nvs-storage-service/src/main.js" ]