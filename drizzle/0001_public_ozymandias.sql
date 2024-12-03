DROP TABLE "napro_tech_users_to_cycles";--> statement-breakpoint
ALTER TABLE "napro_tech_cycle" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "napro_tech_cycle" ADD CONSTRAINT "napro_tech_cycle_user_id_napro_tech_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."napro_tech_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
