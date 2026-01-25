UPDATE "Users"
SET role = 'creator'
WHERE email = 'creator@gmail.com'


UPDATE "Users"
SET role = 'moderator'
WHERE email = 'creator@gmail.com'


SELECT email,
    role
FROM "Users";

DELETE FROM "Users" WHERE email = 'moderator@gmail.com';

INSERT INTO "Users" (
        "firstName",
        "lastName",
        "displayName",
        "password",
        "email",
        "avatar",
        "role",
        "balance",
        "rating"
    )
VALUES (
        'Moderator',
        'Moderator',
        'Moderator',
        '$2b$10$ssGEKydg.tdwEyVxplwI3eKUhRllzSirx3rH7ShmQXwv8a.Ag2uz6',
        'moderator@gmail.com',
        'anon.png',
        'moderator',
        0,
        0
    );