INSERT INTO users
(first_name, last_name, phone, email, hash, due_date, pet, approved, admin, prop_id)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning *;