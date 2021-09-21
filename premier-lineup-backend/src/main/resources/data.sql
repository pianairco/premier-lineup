CREATE TABLE IF NOT EXISTS MENU (
                      ID number(18) primary key,
                      PARENT_ID number(18),
                      TITLE varchar(128) not null,
                      LINK varchar(64) not null,
                      constraint UK_MENU_LINK unique (LINK)
);

insert into MENU select * from (
    select 1 ID, null PARRENT_ID, 'گزارشات' TITLE, 'reports' LINK FROM DUAL UNION
    select 100, 1, 'دفتر کل', 'general-ledger' FROM DUAL UNION
    select 101, 1, 'دفتر تفضیل', 'detail-ledger' FROM DUAL UNION
    select 102, 1, 'دفتر معین', 'subsidiary-ledger' FROM DUAL UNION
    select 2, null, 'اطلاعات پایه', 'basic-info' FROM DUAL UNION
    select 200, 2, 'سرمایه گذار سجامی', 'sejam-customer' FROM DUAL union
    select 3, null, 'سهم و اوراق', 'portfolio-bond' FROM DUAL union
    select 300, 3, 'محاسبه دارایی سهام', 'portfolio-calc' FROM DUAL
) where not exists(select * from MENU);
