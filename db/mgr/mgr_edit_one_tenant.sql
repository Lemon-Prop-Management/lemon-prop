UPDATE user
SET first_name = $2
AND last_name = $3
AND phone = $4
AND email = $5
AND pet = $6
AND approved = $7
AND prop_id = $8
WHERE id = $1;