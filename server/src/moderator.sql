UPDATE "Users"
SET role = 'moderator'
WHERE email = 'creator@gmail.com'


SELECT email, role
FROM "Users";