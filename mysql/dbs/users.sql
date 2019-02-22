drop database if exists users;
create database users CHARACTER SET latin2 COLLATE latin2_hungarian_ci;
use users;

CREATE TABLE users (
    user_id char(18) not null unique,
    name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    password_hash char(255) default null,
    is_active tinyint default 0,
    privilage enum ('user', 'admin', 'super-admin'),
    user_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (user_id),
    UNIQUE KEY email (email)
);

CREATE TABLE temporary_passwords (
    user_id char(18) not null unique,
    tmp_password_hash char(255) NOT NULL,
    tmp_password_expiry TIMESTAMP NOT NULL,
    foreign key (user_id) references users (user_id) 
    on delete cascade
);