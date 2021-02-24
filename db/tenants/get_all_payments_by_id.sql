SELECT * from payments
WHERE user_id = $1
ORDER BY date_paid DESC;