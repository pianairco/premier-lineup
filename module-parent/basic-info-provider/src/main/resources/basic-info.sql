create sequence IF NOT EXISTS master_seq START WITH 1000 INCREMENT BY 50;

CREATE TABLE IF NOT EXISTS user_avatar (
    id bigint primary key,
    user_id bigint,
    path varchar(128),
    image_data binary,
    format varchar(4),
    be_deleted number(1)
);
