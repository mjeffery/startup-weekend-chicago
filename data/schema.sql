CREATE TABLE IF NOT EXISTS test_table (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user2 (
    id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS playlist (
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES user2(id)
);

CREATE TABLE IF NOT EXISTS song (
    id SERIAL PRIMARY KEY,
    playlist_id int REFERENCES playlist(id)
);

ALTER TABLE user2 ADD name text;

ALTER TABLE song ADD url text;