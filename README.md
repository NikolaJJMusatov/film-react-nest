# Проектная работа «FILM!»

Проект выполнен в рамках практической работы учебного курса **Яндекс.Практикум**, представляет из себя онлайн-сервис бронирования билетов в кинотеатр. В котором пользователь может: просмотреть список фильмов, ознакомиться с конкретным фильмом и его сеансами, создать заказ.

**Цель работы заключалась:** реализовать бэкенд на Nest.js для проекта «FILM!». 

**Стек технологий:** TypeScript, Mongodb, ODM Mongoose, PostgreSQL, TypeORM, Nest.js, Node.js.

### В ходе работы выполнены следующие задачи:  

:white_check_mark: Установлен Nest.js  
:white_check_mark: К проекту подключен и настроен mongoose для взаимодействия с Mongo  
:white_check_mark: К проекту подключен и настроен TypeORM для взаимодействия с Postgres  
:white_check_mark: Созданы контроллеры и сервисы обработки запросов клиентной части  
:white_check_mark: Созданы репозитории, которые взаимодействует с одной из БД (Mongo или Postgres) в зависимости от значения переменной окружения  
:white_check_mark: Реализован механизм бронирования билетов и обновления информации о свободных местах  
:white_check_mark: Реализован модуль чтения настроек из переменных среды  
:white_check_mark: Созданы логгеры DevLogger, JsonLogger и TSKVLogger, подключение осуществляется через переменные окружения ("json, tskv, dev")  
:white_check_mark: Написаны тесты для проверки работы логгеров, контролеров и сервисов приложения:  

запуск из `backend/`  
выполните команду
```
npm run test 
```

:white_check_mark: Приложение докеризировано, создан Github Action, который при новых коммитах собирает образы Docker и публикует их в GitHub Registry.  

## Установка и запуск локально

### MongoDB

Установите **MongoDB** скачав дистрибутив с официального сайта или с помощью пакетного менеджера вашей ОС.

Через **MongoDB Compass** создайте:  

`Connection`: `localhost:27017`  
`DataBase`: `afisha`  
`Collection`: `films` (для наполнения коллекции используйте `backend/test/mongodb_initial_stub.json`)  

### PostgreSQL

Установите **PostgreSQL** и запустите её. Подключившись от лица супер-пользователя PostgreSQL создайте отдельного пользователя. 
Используйте заготовки запросов для заполнения СУБД тестовыми данными фильмов и заказов, эти заготовки размещены в проекте:  

`backend/test/prac.init.sql` — создаёт БД и таблицы  
`backend/test/prac.films.sql` — заполняет таблицу фильмами  
`backend/test/prac.shedules.sql` — заполняет таблицу расписанием сеансов.

#### Бэкенд

Перейдите в папку с исходным кодом бэкенда

```
cd backend
```

Установите зависимости

```
npm ci
```

Создайте `.env` файл из примера `.env.example`, в нём укажите:

`DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `mongodb` или `postgres`  
`DATABASE_URL` - адрес DB: или `mongodb://localhost:27017/afisha`, или `postgres://your username:your password@localhost:5432/your database name`  

`DATABASE_USERNAME` - username созданный от лица супер-пользователя PostgreSQL  
`DATABASE_PASSWORD` - password к username PostgreSQL  
`DATABASE_DATABASE` - database name в PostgreSQL  

Базы данных должны быть запущены.

Запустите бэкенд:

```
npm run start:dev
```

бэкенд доступен на http://localhost:3000/

#### Фронтенд

Перейдите в папку с исходным кодом фронтенд

```
cd frontend
```

Установите зависимости

```
npm ci
```

Создайте `.env` файл из примера `.env.example`

Запустите фронтенд:

```
npm run dev
```

Приложение доступно на http://localhost:5173/  

В зависимости от выбранных `DATABASE_DRIVER`и `DATABASE_URL` в `.env` `backend/` приложение взаимодействует с **MongoDB** или с **PostgreSQL**.

## Установка и запуск в Docker

В директориях:

`backend/` cоздайте `.env файл` из `.env.example.docker`

`frontend/` cоздайте `.env файл` из `.env.example`

`pgadmin/` cоздайте `.env файл` из `.env.example`

`postgres/` cоздайте `.env файл` из `.env.example`

`mongodb/` cоздайте `.env файл` из `.env.example`

`mongo-express/` cоздайте `.env файл` из `.env.example`

Выполните команду:

```
docker compose up -d
```

Через PGAdmin (http://localhost:8080/) авторизуйтесь (email, password из `.env` `pgadmin/`).  
Создайте сервер и настройте его Connection (Host, Maintenance database, Username, Password из `.env` `backend/`).  
После наполните базу данными из директории проекта `/backend/test/`:  

`prac.init.Docker.sql` - создает таблицы  
`prac.films.sql` - данные для таблицы films  
`prac.schedules.sql` - данные для таблицы schedules  

Для **MongoDB** при создании контейнеров выполнится скрипт `_volume/mongo/mongo-init.js`, который создаст БД, коллекцию и наполнит нужными данными.
Также на http://localhost:8081/ доступен контейнер **mongo-express** для ручного взаимодействия с MongoDB.

Приложение доступно на http://localhost/

**Чтобы поменять DB:**

1. измените `DATABASE_DRIVER` и `DATABASE_URL` в `.env` `backend/`
2. остановите контейнеры командой:
```
docker stop $(docker ps -a -q)
```
3. запустите контейнеры командой:
```
docker compose up -d
```




