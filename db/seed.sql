DROP TABLE maint_req, payments, properties, users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name varchar(50),
  last_name varchar(50),
  phone varchar(20),
  email varchar(50),
  hash text,
  due_date date,
  pet boolean,
  approved boolean,
  admin boolean,
  prop_id int,
  resetPasswordToken text,
  resetPasswordExpires text
);

CREATE TABLE properties (
  prop_id SERIAL PRIMARY KEY,
  address text,
  lease_amt numeric,
  lease_status boolean
);

CREATE TABLE payments (
  invoice_id SERIAL PRIMARY KEY,
  amt_paid numeric,
  date_paid date,
  user_id int
);

CREATE TABLE maint_req (
  maint_req_id SERIAL PRIMARY KEY,
  subject text,
  date_sub date,
  is_compl boolean,
  request text,
  user_id int,
  photo BYTEA,
  prop_id int
);

ALTER TABLE maint_req ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE payments ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE maint_req ADD FOREIGN KEY (prop_id) REFERENCES properties (prop_id);

ALTER TABLE users ADD FOREIGN KEY (prop_id) REFERENCES properties (prop_id);

INSERT INTO users (first_name, last_name, phone, email, hash, approved, admin) VALUES ('The','Manager','(633) 578-4150','themanager@gmail.com','manager','True', 'True');

INSERT INTO properties (address,lease_amt,lease_status) 
VALUES ('2090 S 750 E, Lehi, UT 84043',1,'True'),
('44 E 300 S, Mount Pleasant, UT 84647',2,'True'),
('313 Horsley Dr, Pearisburg, VA 24134',3,'True');

INSERT INTO users (first_name, last_name, phone, email, hash, due_date, pet,approved, admin, prop_id) VALUES 
('Giselle','Castaneda','(759) 723-1746','tenant1@gmail.com','password','March 18, 2021','True','True','False',1),
('Griffith','Trevino','(205) 768-5648','tenant2@gmail.com','password','April 21, 2021','False','False','False',2),
('Maxine','Austin','(982) 157-1593','tenant3@gmail.com','password','May 4, 2021','True','True','False',3);

INSERT INTO maint_req (subject, date_sub, is_compl, request, user_id, prop_id) 
VALUES 
('Broken Faucet','Mar 14, 2020','True','Please come fix this!', 2, 1),
('Broken Window','Jan 27, 2021','False','Someone threw a brick through our window!', 3, 2),
('Broken Floorboards','Jan 7, 2021','False','My son stepped on a floorboard and fell through the floor!', 4, 3);

INSERT INTO payments (amt_paid, date_paid, user_id) 
VALUES 
(50.51,'Jan, 5 2021', 2),
(50.51,'Dec, 5 2020', 2),
(50.51,'Nov, 5 2020', 2),
(107.65,'Jan 24, 2021', 3),
(2003.54,'Jan 7, 2021', 4);