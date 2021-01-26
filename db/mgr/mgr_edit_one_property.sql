UPDATE properties
SET address = $2
WHERE id = $1;

UPDATE properties
SET lease_amt = $3
WHERE id = $1;

UPDATE properties
SET lease_status = $4
WHERE id = $1;