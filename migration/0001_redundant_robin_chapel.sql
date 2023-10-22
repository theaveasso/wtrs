CREATE TABLE `users_to_roles` (
	`organization_id` integer NOT NULL,
	`role_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	PRIMARY KEY (`organization_id`, `role_id`, `user_id`),
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
