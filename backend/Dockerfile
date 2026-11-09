FROM node:22-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && mkdir -p /app/certs \
    && curl -fsSL \
       https://truststore.pki.rds.amazonaws.com/us-east-1/us-east-1-bundle.pem \
       -o /app/certs/rds-ca-bundle.pem \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_EXTRA_CA_CERTS=/app/certs/rds-ca-bundle.pem

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]