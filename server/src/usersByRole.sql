SELECT role, count(*) AS users_count
FROM "Users"
GROUP BY role