-- This file should undo anything in `up.sql`
ALTER TABLE movies
ALTER COLUMN release_date SET NOT NULL;
