SELECT * FROM maint_req
WHERE user_id = $1
ORDER BY is_compl ASC;