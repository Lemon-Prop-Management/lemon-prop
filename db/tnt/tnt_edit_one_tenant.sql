UPDATE user
SET first_name = $2
AND last_name = $3
AND phone = $4
AND email = $5
WHERE user_id = $1;