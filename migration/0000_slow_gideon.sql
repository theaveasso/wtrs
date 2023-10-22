CREATE TABLE `gists` (
	`id` integer,
	`title` text NOT NULL,
	`description` text,
	`body` text NOT NULL,
	`organization_id` integer,
	`author_id` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	PRIMARY KEY(`author_id`, `organization_id`),
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `organizations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`picture_url` text,
	`created_at` integer,
	`updated_at` integer
);

CREATE TABLE `positions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);

CREATE TABLE `roles` (
	`id` integer,
	`title` text NOT NULL,
	`organization_id` integer,
	`permissions` text,
	`created_at` integer,
	`updated_at` integer,
	PRIMARY KEY(`organization_id`, `title`),
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `users` (
	`id` integer,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`organization_id` integer,
	`role` text,
	`position_id` integer,
	`picture_url` text,
	`joined_at` integer,
	`leaved_at` integer,
	`created_at` integer,
	`updated_at` integer,
	`deleted_at` integer,
	PRIMARY KEY(`email`, `organization_id`),
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`position_id`) REFERENCES `positions`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE INDEX `name_index` ON `organizations` (`name`);
CREATE INDEX `roles_id_index` ON `roles` (`id`);
CREATE INDEX `users_id_index` ON `users` (`id`);