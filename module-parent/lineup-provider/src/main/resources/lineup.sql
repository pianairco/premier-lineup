create sequence IF NOT EXISTS master_seq START WITH 1000 INCREMENT BY 50;

CREATE TABLE IF NOT EXISTS groups (
    id bigint primary key,
    user_id bigint,
    is_public number(1) default 0,
    uuid varchar(64),
    name varchar(128),
    constraint fk_groups_2_users foreign key (user_id) references users(id)
);


CREATE TABLE IF NOT EXISTS groups_image (
    id bigint primary key,
    group_id bigint,
    path varchar(128),
    image_data binary,
    format varchar(4),
    be_deleted number(1),
    constraint fk_groups_image_2_groups foreign key (group_id) references groups(id)
);

CREATE TABLE IF NOT EXISTS groups_member (
    id bigint primary key,
    group_id bigint,
    user_id bigint,
    constraint fk_groups_member_2_groups foreign key (group_id) references groups(id),
    constraint fk_groups_member_2_users foreign key (user_id) references users(id)
);

CREATE TABLE IF NOT EXISTS groups_join_request (
    id bigint primary key,
    group_id bigint,
    user_id bigint,
    constraint fk_groups_join_request_2_groups foreign key (group_id) references groups(id),
    constraint fk_groups_join_request_2_users foreign key (user_id) references users(id)
);

