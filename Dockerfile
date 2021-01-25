FROM node:14-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

USER node

COPY --chown=node:node package.json yarn.* ./

RUN yarn

COPY --chown=node:node . .
RUN yarn build

EXPOSE 3333

CMD ["node", "dist/infra/http/server.js"]
