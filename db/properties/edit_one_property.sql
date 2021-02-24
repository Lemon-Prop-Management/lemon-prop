UPDATE properties
SET address = $2
WHERE prop_id = $1;

UPDATE properties
SET lease_amt = $3
WHERE prop_id = $1;

UPDATE properties
SET lease_status = $4
WHERE prop_id = $1;