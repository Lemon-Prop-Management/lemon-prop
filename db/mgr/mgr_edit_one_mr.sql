UPDATE maint_req
SET is_compl = $2
WHERE maint_req_id = $1;