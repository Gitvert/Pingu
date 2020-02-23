drop table if exists players;
drop table if exists matches;

create table "players" (
	"id" integer primary key,
	"name" text not null unique
);

create table "matches" (
    "id" integer primary key,
	"date" text not null,
	"winner" integer not null,
	"loser"	integer not null,
	foreign key("winner") references "players"("id"),
	foreign key("loser") references "players"("id")
);