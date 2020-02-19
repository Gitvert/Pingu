drop table if exists users;
drop table if exists matches;

create table "users" (
	"id" integer primary key,
	"name" text not null
);

create table "matches" (
    "id" integer primary key,
	"date" text not null,
	"winner_user_id" integer not null,
	"loser_user_id"	integer not null,
	foreign key("winner_user_id") references "users"("id"),
	foreign key("loser_user_id") references "users"("id")
);