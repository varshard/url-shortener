FROM node:lts

ENV HOME=/usr/src/app
WORKDIR $HOME

USER root

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm ci --only=production \
    && chown -R node $HOME

USER node

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
