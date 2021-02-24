SELECT * FROM maint_req
WHERE is_compl = $1
ORDER BY date_sub;