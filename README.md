# FILM!

Проект выполнен в рамках практической работы учебного курса Яндекс.Практикум. Представляет из себя онлайн-сервис бронирования билетов в кинотеатр. В котором пользователь может: просмотреть список фильмов, ознакомиться с конкретным фильмом и его сеансами, создать заказ.

## В ходе работы над ним были выполнены следующие задачи в бэкенд-части приложения:
1. :white_check_mark: Установлен Nest.js
2. :white_check_mark: К проекту подключен и настроен mongoose для взаимодействия с Mongo
3. :white_check_mark: К проекту подключен и настроен TypeORM для взаимодействия с Postgres
4. :white_check_mark: Созданы контроллеры и сервисы обработки запросов клиентной части
5. :white_check_mark: Созданы репозитории, которые взаимодействует с одной из БД (Mongo или Postgres) в зависимости от значения переменной окружения
6. :white_check_mark: Реализован механизм бронирования билетов и обновления информации о свободных местах
7. :white_check_mark: Реализован модуль чтения настроек из переменных среды
8. :white_check_mark: Созданы логгеры DevLogger, JsonLogger и TSKVLogger, подключение осуществляется через переменные окружения ("json, tskv, dev")
9. :white_check_mark: Написаны тесты для проверки работы логгеров, контролеров и сервисов приложения:
* (запуск из `FILM-REACT-NEST/backend/` команда `npm run test`)
10. :white_check_mark: Приложение докеризировано, создан Github Action, который при новых коммитах собирает образы Docker и публикует их в GitHub Registry.
11. :black_square_button: Настроен удаленный сервер, прикреплено доменное имя и выполнен деплой проекта
12. :black_square_button: Выпущен сертификат, настроено подключение к сайту по https и редирект с http на https

## Запуск в Docker (DB Postgresql)

В директориях:

`FILM-REACT-NEST/backend/`
Создайте `.env` файл из примера `.env.example`

`FILM-REACT-NEST/frontend/`
Создайте `.env` файл из примера `.env.example`

`FILM-REACT-NEST/pgadmin/`
Создайте `.env` файл из примера `.env.example`

`FILM-REACT-NEST/postgres/`
Создайте `.env` файл из примера `.env.example`

Установите зависимости в `FILM-REACT-NEST/backend/`, `FILM-REACT-NEST/frontend/`

`npm i`

Запуск Docker:

`docker compose up -d --build`

Через PGAdmin (http://localhost:8080/) авторизуйтесь (email, password из .env `FILM-REACT-NEST/pgadmin/`).
Создайте сервер и настройте его Connection (Host, Maintenance database, Username, Password из .env `FILM-REACT-NEST/backend/`).
После наполните базу данными из директории проекта `FILM-REACT-NEST/backend/test`:
* `prac.init.Docker.sql` создает таблицы
* `prac.films.sql` данные для таблицы films
* `prac.schedules.sql` данные для таблицы schedules

Приложение доступно на http://localhost/ 

## Установка локально

### MongoDB

Установите MongoDB скачав дистрибутив с официального сайта или с помощью пакетного менеджера вашей ОС. Также можно воспользоваться Docker (см. ветку `feat/docker`.)

Выполните скрипт `test/mongodb_initial_stub.js` в консоли `mongo` для заполнения БД.

### PostgresDB
Установите СУБД PostgreSQL и запустить её (можно воспользоваться запуском СУБД в Docker). Подключившись от лица супер-пользователя postgres создайте отдельного пользователя.
Используйте заготовки запросов для заполнения СУБД тестовыми данными фильмов и заказов, эти запросы размещены в проекте:
`backend/test/prac.init.sql` — создаёт БД и таблицы
`backend/test/prac.films.sql` — заполняет таблицу фильмами
`backend/test/prac.shedules.sql` — заполняет таблицу расписанием сеансов

### Бэкенд

Перейдите в папку с исходным кодом бэкенда

`cd backend`

Установите зависимости

`npm i`

Создайте `.env` файл из примера `.env.example`, в нём укажите:

* `DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `mongodb` или `postgres`
* `DATABASE_URL` - адрес СУБД MongoDB, например `mongodb://127.0.0.1:27017/afisha`
* `DATABASE_USERNAME` - username созданный от лица супер-пользователя Postgres
* `DATABASE_PASSWORD` - пароль к username Postgres
* `DATABASE_DATABASE` - database name в Postgres

Базы данных должны быть запущены.

Запустите бэкенд:

`npm run start:dev`

### Фронтенд

Перейдите в папку с исходным кодом фронтенд

`cd frontend`

Создайте `.env` файл из примера `.env.example`

Установите зависимости

`npm i`

Запустите фронтенд:

`npm run dev`

Приложение доступно на http://localhost:5173/ 
В зависимости от выбранного DATABASE_DRIVER приложение взаимодействует с Mongo или Postgres БД




