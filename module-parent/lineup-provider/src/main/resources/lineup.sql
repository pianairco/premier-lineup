create sequence IF NOT EXISTS master_seq START WITH 1000 INCREMENT BY 50;

CREATE TABLE IF NOT EXISTS groups (
    id bigint primary key,
    user_id bigint,
    is_public number(1) default 0,
    uuid varchar(64),
    name varchar(128),
    constraint fk_groups_2_users foreign key (user_id) references users(id)
);

INSERT INTO groups (id, user_id, is_public, name) select * from (
    select 1 id, 1 user_id, 1 is_public, 'vahdat' name
) where not exists(select * from groups);


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

INSERT INTO groups_member (id, group_id, user_id) select * from (
    select 1 id, 1 group_id, 1 user_id
) where not exists(select * from groups_member);

CREATE TABLE IF NOT EXISTS from_group_invitation_request (
    id bigint primary key,
    group_id bigint not null,
    unique_id char(36) not null,
    try_count number(6) default 0,
    registered_count number(6) default 0,
    is_free number(1),
    constraint fk_from_group_invitation_request_2_groups foreign key (group_id) references groups(id)
);

INSERT INTO from_group_invitation_request (id, group_id, unique_id, is_free) select * from (
    select 1 id, 1 group_id, 'ea60c897-e447-4bd9-9f5f-a9eb5a8eb6e0' unique_id, 1 is_free
) where not exists(select * from from_group_invitation_request);

CREATE TABLE IF NOT EXISTS group_invitation_request (
    id bigint primary key,
    unique_id char(36) not null,
    group_id bigint not null,
    mobile char(11) not null,
    constraint fk_group_invitation_request_2_groups
    foreign key (group_id) references groups(id)
);

CREATE TABLE IF NOT EXISTS group_join_request (
    id bigint primary key,
    user_id bigint,
    group_id bigint,
    accepted number(1) default 0,
    constraint fk_groups_join_request_2_users foreign key (user_id) references users(id),
    constraint fk_groups_join_request_2_groups foreign key (group_id) references groups(id)
);