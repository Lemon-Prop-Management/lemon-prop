CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(50),
  "last_name" VARCHAR(50),
  "phone" VARCHAR(10),
  "email" VARCHAR(50),
  "password" VARCHAR(20),
  "due_date" DATE,
  "pet" BOOLEAN,
  "approved" BOOLEAN,
  "admin" BOOLEAN,
  "prop_id" INT
);

CREATE TABLE "properties" (
  "id" SERIAL PRIMARY KEY,
  "address" TEXT UNIQUE,
  "lease_amt" NUMERIC,
  "lease_status" BOOLEAN
);

CREATE TABLE "payments" (
  "invoice_id" SERIAL PRIMARY KEY,
  "amt_paid" NUMERIC,
  "date_paid" DATE,
  "user_id" NUMERIC
);

CREATE TABLE "maint_req" (
  "id" SERIAL PRIMARY KEY,
  "subject" TEXT,
  "date_sub" DATE,
  "is_compl" BOOLEAN,
  "request" TEXT,
  "user_id" INT,
  "photo" BYTEA,
  "prop_id" INT
);

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "payments" ("user_id");

ALTER TABLE "properties" ADD FOREIGN KEY ("id") REFERENCES "user" ("prop_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "maint_req" ("user_id");

ALTER TABLE "user" ADD FOREIGN KEY ("prop_id") REFERENCES "maint_req" ("prop_id");