SELECT * FROM users
WHERE admin = false AND approved = $1;