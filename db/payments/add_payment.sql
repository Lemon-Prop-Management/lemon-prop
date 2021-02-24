INSERT INTO payments
(user_id, amt_paid, date_paid)
VALUES
($1, $2, $3)
returning *;