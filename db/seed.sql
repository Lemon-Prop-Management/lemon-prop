CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar(50),
  "last_name" varchar(50),
  "phone" varchar(10),
  "email" varchar(50),
  "hash" text,
  "due_date" datetime,
  "pet" boolean,
  "approved" boolean,
  "admin" boolean,
  "prop_id" int
);

CREATE TABLE "properties" (
  "id" SERIAL PRIMARY KEY,
  "address" text,
  "lease_amt" numeric,
  "lease_status" boolean
);

CREATE TABLE "payments" (
  "invoice_id" SERIAL PRIMARY KEY,
  "amt_paid" numeric,
  "date_paid" date,
  "user_id" numeric
);

CREATE TABLE "maint_req" (
  "id" SERIAL PRIMARY KEY,
  "subject" text,
  "date_sub" date,
  "is_compl" boolean,
  "request" text,
  "user_id" int,
  "photo" bytea,
  "prop_id" int
);

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "payments" ("user_id");

ALTER TABLE "properties" ADD FOREIGN KEY ("id") REFERENCES "user" ("prop_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "maint_req" ("user_id");

ALTER TABLE "user" ADD FOREIGN KEY ("prop_id") REFERENCES "maint_req" ("prop_id");