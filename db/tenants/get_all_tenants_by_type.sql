SELECT * FROM users
WHERE admin = false AND approved = $1
ORDER BY last_name ASC;