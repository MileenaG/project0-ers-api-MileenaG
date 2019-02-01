create table users (
	userId serial not null, -- primary key
	username varchar(200) not null, --unique
	password varchar(200) not null, 
	firstName varchar(200) not null,
	lastName varchar(200) not null, 
	email varchar(200) not null,
	role varchar(200) not null
);

insert into users 
values (default, 'macg', 'password0', 'Mileena', 'Garcia', 'mg@gmail.com', 'finance-manager'),
	(default, 'jsmith', 'password1', 'Jane', 'Smith', 'js@yahoo.com', 'admin'),
	(default, 'Mac', 'password2', 'Ronald', 'MacDonald', 'rm@gmail.com', 'finance-manager'),
	(default, 'Dee', 'password3', 'Diandra', 'Renolds', 'dee@hotmil.com', 'admin'),
	(default, 'GoldenGod', 'password4', 'Dennis', 'Renolds', 'dr@gmail.com', 'admin');
select * from users;


