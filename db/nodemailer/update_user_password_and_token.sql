UPDATE users 
SET hash =$2,
reset_password_token =$3, 
reset_password_expires =$4
WHERE email = $1