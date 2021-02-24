SELECT * 
FROM properties p
JOIN users u ON p.prop_id = u.prop_id
WHERE user_id = $1;