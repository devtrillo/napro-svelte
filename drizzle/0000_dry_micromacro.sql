CREATE TABLE IF NOT EXISTS "nt_email_verification" (
	"code" text NOT NULL,
	"email" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nt_passkey_credential" (
	"algorithm" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"id" "bytea" PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"public_key" "bytea" NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nt_password_reset_session" (
	"code" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"two_factor_verified" boolean DEFAULT false NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nt_security_key_credential" (
	"algorithm" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"id" "bytea" PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"public_key" "bytea" NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nt_session" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"two_factor_verified" boolean DEFAULT false NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nt_totp_credential" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" "bytea" NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nt_user" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"google_id" text,
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"picture" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "nt_user_email_unique" UNIQUE("email"),
	CONSTRAINT "nt_user_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nt_cycle" (
	"end_date" timestamp,
	"id" serial PRIMARY KEY NOT NULL,
	"ppp" smallint,
	"score" numeric,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nt_day" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"cycle_id" integer NOT NULL,
	"observation_date" timestamp NOT NULL,
	"discharge_type" varchar(4) NOT NULL,
	"flow_type" varchar(4) NOT NULL,
	"frequency" varchar(4) NOT NULL,
	"lubrication_status" varchar(4) NOT NULL,
	"notes" text,
	CONSTRAINT "nt_day_cycle_id_observation_date_pk" PRIMARY KEY("cycle_id","observation_date")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nt_email_verification" ADD CONSTRAINT "nt_email_verification_user_id_nt_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nt_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nt_passkey_credential" ADD CONSTRAINT "nt_passkey_credential_user_id_nt_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nt_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nt_password_reset_session" ADD CONSTRAINT "nt_password_reset_session_user_id_nt_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nt_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nt_security_key_credential" ADD CONSTRAINT "nt_security_key_credential_user_id_nt_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nt_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nt_session" ADD CONSTRAINT "nt_session_user_id_nt_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nt_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nt_totp_credential" ADD CONSTRAINT "nt_totp_credential_user_id_nt_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nt_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nt_cycle" ADD CONSTRAINT "nt_cycle_user_id_nt_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nt_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nt_day" ADD CONSTRAINT "nt_day_cycle_id_nt_cycle_id_fk" FOREIGN KEY ("cycle_id") REFERENCES "public"."nt_cycle"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "google_id_index" ON "nt_user" USING btree ("google_id");