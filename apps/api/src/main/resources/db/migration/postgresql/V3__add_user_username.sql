ALTER TABLE users ADD COLUMN username VARCHAR(50);
CREATE UNIQUE INDEX uq_users_username ON users (lower(username)) WHERE username IS NOT NULL;