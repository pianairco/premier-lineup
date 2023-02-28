create sequence IF NOT EXISTS master_seq START WITH 1000 INCREMENT BY 50;

CREATE TABLE IF NOT EXISTS users (
    id bigint primary key,
    mobile char(11) NOT NULL,
    username varchar(64),
    password char(128),
    picture_url varchar(256),
    locale char(2),
    name varchar(64),
    family_name varchar(64),
    given_name varchar(64),
    user_uuid char(36),
    email varchar(256),
    email_verified number(1)
);

-- image => https://lh3.googleusercontent.com/a-/AOh14Gg8K7kIHhlEo0-oJjPmGBG73ciHeRQnMFuRWRjQ4A=s96-c
INSERT INTO users (id, username, user_uuid, mobile, email, email_verified, password, locale, given_name, picture_url) select * from (
    select 1 id, 'admin' username, 'admin' user_uuid, '09128855402' mobile, 'rahmatii1366@gmail.com' email, 1 email_verified,
           '$2a$10$J.qCx8tB1axgUJFqzrk6NupFsQ/ObT1tmhhVVf3MDewdumSwkxsDO' password, 'fa' locale,
           'admin' given_name, 'https://lh3.googleusercontent.com/a-/AOh14Gg8K7kIHhlEo0-oJjPmGBG73ciHeRQnMFuRWRjQ4A=s96-c' picture_url
) where not exists(select * from users);

CREATE TABLE IF NOT EXISTS user_roles (
    id bigint default master_seq.nextval primary key,
    user_id bigint not null,
    role_name varchar(64) NOT NULL,
    constraint fk_user_roles_2_user_by_id FOREIGN KEY (user_id)
        REFERENCES users(id)
);

INSERT INTO user_roles (id, user_id, role_name) select * from (
    select 1 id, 1 user_id, 'ROLE_ADMIN' role_name union
    select 2, 1, 'ROLE_USER'
) where not exists(select * from user_roles);

CREATE TABLE IF NOT EXISTS invitation_request (
    id bigint primary key,
    inviter_id bigint not null,
    unique_link char(36) not null,
    try_count number(6) default 0,
    registered_count number(6) default 0,
    is_free number(1) default 1
);
