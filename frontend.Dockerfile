FROM hub.nexus.consyst.ru/node:20.12.2 AS builder

WORKDIR /frontend

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# RUN yarn global add react-scripts
# RUN yarn add typescript

RUN yarn build

FROM hub.nexus.consyst.ru/nginx:1.15-alpine
COPY --from=builder /frontend/dist /usr/share/nginx/html
EXPOSE ${FRONTEND_PORT}
CMD ["nginx", "-g", "daemon off;"]
