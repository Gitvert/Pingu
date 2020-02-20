drop table if exists players;
drop table if exists matches;

create table "players" (
	"id" integer primary key,
	"name" text not null unique
);

create table "matches" (
    "id" integer primary key,
	"date" text not null,
	"winner_user_id" integer not null,
	"loser_user_id"	integer not null,
	foreign key("winner_user_id") references "players"("id"),
	foreign key("loser_user_id") references "players"("id")
);