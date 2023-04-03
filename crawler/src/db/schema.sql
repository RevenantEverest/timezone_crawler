CREATE TABLE guildwars_event_categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE guildwars_events(
    id SERIAL PRIMARY KEY,
    category_id INT,
    name VARCHAR(255),
    interval INT,
    start_time TIMESTAMP
);

CREATE TABLE guildwars_event_times(
    id SERIAL PRIMARY KEY,
    event_id INT,
    
);