CREATE TABLE IF NOT EXISTS images (
    id bigint default master_seq.nextval primary key,
    image_src char(70),
    image_type char(10),
    image_data binary(100000)
);
