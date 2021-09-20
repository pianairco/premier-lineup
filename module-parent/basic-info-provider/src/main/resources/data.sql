create sequence IF NOT EXISTS master_seq START WITH 1000 INCREMENT BY 50;

CREATE TABLE IF NOT EXISTS user_avatar (
  id bigint primary key,
  user_id bigint,
  path varchar(128),
  image_data binary
);                                                                                                                                        select 1 id, 'admin' username, 'admin' user_uuid, '09128855402' mobile, 'rahmatii1366@gmail.com' email, 1 email_verified,
                                                                                                                                               '$2a$10$J.qCx8tB1axgUJFqzrk6NupFsQ/ObT1tmhhVVf3MDewdumSwkxsDO' password, 'fa' locale,
                                                                                                                                               'admin' given_name, 'https://lh3.googleusercontent.com/a-/AOh14Gg8K7kIHhlEo0-oJjPmGBG73ciHeRQnMFuRWRjQ4A=s96-c' picture_url
                                                                                                                                    ) where not exists(select * from users);
