
# 手順

terminalで以下を実行

```bash
touch Dockerfile docker-compose.yml
```

Dockerfile

```yml
FROM node:12.16.1
WORKDIR /usr/src/app
RUN yarn global add @vue/cli

ENV HOST 0.0.0.0
ENV PORT 3000
```

docker-compose.yml

```yml
version: "3"
services:
  app:
    build: .
    container_name: kanban
    ports:
      - "3000:3000"
    volumes:
      - .:/usr/src/app
    working_dir: /usr/src/app
    stdin_open: true
    tty: true
    command: sh -c "cd frontend && yarn dev"

```

初回や手動でパッケージインストールしたい場合、terminalで以下を順に実行

```bash
docker-compose build
docker-compose up -d
docker-compose exec app /bin/bash
yarn create nuxt-app frontend
cd frontend
yarn dev
```

次回から

```bash
docker-compose up
```

## Link

store/todo.js

[Nuxt.jsのストアをモジュールモードで使用するときのTips](https://qiita.com/y-miine/items/028c73aa3f87e983ed4c)

store/index.js

[Vuexのモジュールモードで localStorage に保存する方法](https://www.tomatoaiu.com/entry/2018/06/01/195741)

pages/List.vue

[VueでのDrag & Drop](https://www.tohuandkonsome.site/entry/2018/01/22/223224#dropvue%E3%81%AB%E3%83%89%E3%83%A9%E3%83%83%E3%82%B0--%E3%83%89%E3%83%AD%E3%83%83%E3%83%97%E3%81%A7%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E9%81%B8%E6%8A%9E%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B)
