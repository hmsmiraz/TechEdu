-- Runs automatically on first container start only (MySQL skips this on
-- subsequent restarts once the data volume already exists).
--
-- The username here ("techedu") is fixed and must match MYSQL_USER in
-- your .env file — usernames aren't secrets, only MYSQL_PASSWORD is,
-- and that's handled entirely by the official mysql image via env vars,
-- never appearing in this file.
CREATE DATABASE IF NOT EXISTS auth_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS content_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- MYSQL_USER only gets access to MYSQL_DATABASE by default when created
-- automatically by the mysql image — grant it the second database too.
GRANT ALL PRIVILEGES ON auth_db.* TO 'techedu'@'%';
GRANT ALL PRIVILEGES ON content_db.* TO 'techedu'@'%';
FLUSH PRIVILEGES;
