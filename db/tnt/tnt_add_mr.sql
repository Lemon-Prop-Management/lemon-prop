INSERT INTO maint_req
(user_id, prop_id, subject, date_sub, request, photo, is_comp)
VALUES
($1, $2, $3, $4, $5, $6, $7)
returning * WHERE user_id = $1;