
UPDATE "Users" u
SET balance = balance + (
    SELECT SUM(c.prize) * 0.1
    FROM "Contests" c
    WHERE c."userId" = u."id"  AND c."createdAt" BETWEEN '2025-12-25' AND '2026-01-14'
)
WHERE u."role" = 'customer'
AND EXISTS (
    SELECT 1
    FROM "Contests" c
    WHERE c."userId" = u."id" AND c."createdAt" BETWEEN '2025-12-25' AND '2026-01-14'
)