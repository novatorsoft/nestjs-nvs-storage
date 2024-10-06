FROM node:22 
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
COPY libs ./libs
COPY apps ./apps
COPY schema.gql ./

RUN yarn install \
    && yarn build nvs-storage-service \
    && addgroup --system nonroot \
    && adduser --system nonroot --ingroup nonroot

USER nonroot

CMD [ "node", "dist/apps/nvs-storage-service/src/main.js" ]
