INSERT INTO maint_req
(user_id, prop_id, subject, date_sub, request, is_compl)
VALUES
($1, $2, $3, $4, $5, $6)
returning *;