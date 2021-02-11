FROM node:14-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

USER node

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .
RUN npm run build

EXPOSE 3333

CMD ["node", "dist/infra/http/server.js"]
