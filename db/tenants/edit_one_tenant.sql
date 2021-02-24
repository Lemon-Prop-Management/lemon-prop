UPDATE users
SET first_name = $2,
  last_name = $3,
  phone = $4,
  email = $5,
  pet = $6,
  approved = $7,
  prop_id = $8
WHERE user_id = $1;