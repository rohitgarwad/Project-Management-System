show databases;
create database dummypms;
use dummypms;

show tables;
select * from user;
select * from user_profiles;
select * from user_seq;
select * from project;
select * from project_team;
select * from messages;
select * from label;
select * from subscription;
select * from subscription_seq;
select * from issues;
select * from invitation;
select * from chats;
select * from chat_users;
select * from comments;
select * from address;
select * from password_reset_token;

delete from chats;
delete from messages;
delete from chat_users;
delete from subscription;
delete from issues;
delete from comments;

drop table label;
drop table issues;
drop table comments;

update issues set status = 'in-progress' where id = 5;


INSERT INTO subscription (id, is_valid, plan_type, subscription_end_date, subscription_start_date, user_id) VALUES ('1', 1, '0', '2025-07-06', '2024-07-06', '1');
desc subscription;

drop database dummypms;
