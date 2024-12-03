CREATE TABLE IF NOT EXISTS "napro_tech_email_verification" (
	"code" text NOT NULL,
	"email" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "napro_tech_passkey_credential" (
	"algorithm" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"id" "bytea" PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"public_key" "bytea" NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "napro_tech_password_reset_session" (
	"code" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"two_factor_verified" boolean DEFAULT false NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "napro_tech_security_key_credential" (
	"algorithm" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"id" "bytea" PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"public_key" "bytea" NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "napro_tech_session" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"two_factor_verified" boolean DEFAULT false NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "napro_tech_totp_credential" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" "bytea" NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "napro_tech_user" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"google_id" text,
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"picture" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "napro_tech_user_email_unique" UNIQUE("email"),
	CONSTRAINT "napro_tech_user_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "napro_tech_cycle" (
	"end_date" timestamp,
	"id" serial PRIMARY KEY NOT NULL,
	"start_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "napro_tech_users_to_cycles" (
	"cycle_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "napro_tech_users_to_cycles_user_id_cycle_id_pk" PRIMARY KEY("user_id","cycle_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "napro_tech_email_verification" ADD CONSTRAINT "napro_tech_email_verification_user_id_napro_tech_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."napro_tech_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "napro_tech_passkey_credential" ADD CONSTRAINT "napro_tech_passkey_credential_user_id_napro_tech_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."napro_tech_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "napro_tech_password_reset_session" ADD CONSTRAINT "napro_tech_password_reset_session_user_id_napro_tech_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."napro_tech_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "napro_tech_security_key_credential" ADD CONSTRAINT "napro_tech_security_key_credential_user_id_napro_tech_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."napro_tech_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "napro_tech_session" ADD CONSTRAINT "napro_tech_session_user_id_napro_tech_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."napro_tech_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "napro_tech_totp_credential" ADD CONSTRAINT "napro_tech_totp_credential_user_id_napro_tech_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."napro_tech_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "napro_tech_users_to_cycles" ADD CONSTRAINT "napro_tech_users_to_cycles_cycle_id_napro_tech_cycle_id_fk" FOREIGN KEY ("cycle_id") REFERENCES "public"."napro_tech_cycle"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "napro_tech_users_to_cycles" ADD CONSTRAINT "napro_tech_users_to_cycles_user_id_napro_tech_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."napro_tech_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "google_id_index" ON "napro_tech_user" USING btree ("google_id");