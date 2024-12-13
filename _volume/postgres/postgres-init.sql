

create database project_film;
create user user_project_film with encrypted password 'password';
grant all privileges on database project_film to user_project_film

\c project_film;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table public.films
(
    id          uuid default uuid_generate_v4() not null
        constraint "PK_697487ada088902377482c970d1"
            primary key,
    rating      double precision                not null,
    director    varchar                         not null,
    tags        text                            not null,
    image       varchar                         not null,
    cover       varchar                         not null,
    title       varchar                         not null,
    about       varchar                         not null,
    description varchar                         not null
);

alter table public.films
    owner to user_project_film;

create table public.schedules
(
    id       uuid default uuid_generate_v4() not null
        constraint "PK_7e33fc2ea755a5765e3564e66dd"
            primary key,
    daytime  varchar                         not null,
    hall     integer                         not null,
    rows     integer                         not null,
    seats    integer                         not null,
    price    double precision                not null,
    taken    text                            not null,
    "filmId" uuid
        constraint "FK_1c2f5e637713a429f4854024a76"
            references public.films
);

alter table public.schedules
    owner to user_project_film;

INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('92b8a2a7-ab6b-4fa9-915b-d27945865e39',8.1,'Амелия Хьюз','Рекомендуемые','/bg6s.jpg','/bg6c.jpg','Сон в летний день','Фэнтези-фильм о группе друзей попавших в волшебный лес, где время остановилось.','Причудливый фэнтези-фильм, действие которого происходит в волшебном лесу, где время остановилось. Группа друзей натыкается на это заколдованное царство и поначалу проникается беззаботным духом обитателей, но потом друзьям приходится разойтись. А как встретиться снова, если нет ни времени, ни места встречи?');
INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('0354a762-8928-427f-81d7-1656f717f39c',9.5,'Оливер Беннет','Рекомендуемые','/bg4s.jpg','/bg4c.jpg','Парадокс Нексуса','Фильм об эксперименте по соединению человеческих умов. Исследует вопросы неприкосновенности частной жизни, идентичности и самой природы человеческого сознания','В фильме исследуются последствия новаторского эксперимента по соединению человеческих умов. По мере развития проекта участники сталкиваются с вопросами неприкосновенности частной жизни, идентичности и самой природы человеческого сознания.');
INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('5b70cb1a-61c9-47b1-b207-31f9e89087ff',8.9,'Лила Васкес','Рекомендуемые','/bg2s.jpg','/bg2c.jpg','Стражи Гримуара','Фэнтезийное приключение об истинном значении дружбы, мужества и силы знаний','Захватывающее фэнтезийное приключение, которое рассказывает о группе героев, которые должны защитить древний магический том от попадания в руки тёмного колдуна. История об истинном значении дружбы, мужества и силы знаний.');
INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('3bedbc5a-844b-40eb-9d77-83b104e0cf75',8.5,'Элиза Уиттакер','Рекомендуемые','/bg5s.jpg','/bg5c.jpg','Звёздное путешествие','Научно-фантастический фильм о команде астронавтов, исследующий темы жизнестойкости, надежды и силы человеческих связей','«Звёздное путешествие» — прекрасный научно-фантастический фильм о команде астронавтов, путешествующих по галактике в поисках нового дома для человечества. Помимо потрясающей работы оператора и специалистов по визуальным эффектам, можно отметить темы, исследуемые в фильме: жизнестойкости, надежды и силы человеческих связей.');
INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('51b4bc85-646d-47fc-b988-3e7051a9fe9e',9,'Харрисон Рид','Рекомендуемые','/bg3s.jpg','/bg3c.jpg','Недостижимая утопия','Провокационный фильм-антиутопия, исследующий темы свободы, контроля и цены совершенства.','Провокационный фильм-антиутопия режиссера Харрисона Рида. Действие фильма разворачивается в, казалось бы, идеальном обществе, и рассказывает о группе граждан, которые начинают подвергать сомнению систему. Фильм исследует темы свободы, контроля и цены совершенства.');
INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',2.9,'Итан Райт','Документальный','/bg1s.jpg','/bg1c.jpg','Архитекторы общества','Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.','Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.');
