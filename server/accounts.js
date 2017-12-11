Accounts.onCreateUser(function(options, user){
								user.profile				= options.profile	||	{};
								user.username				= options.username;
								user.group					= options.group;
								user.deactivated			= options.deactivated;
								user.status					= options.status;

	if (options.firstName)		user.profile.firstName		= options.firstName;
	if (options.lastName)		user.profile.lastName		= options.lastName;
	if (options.birthDate)		user.profile.birthDate		= options.birthDate;
	if (options.picture)		user.profile.picture		= options.picture;
	if (options.avatar)			user.profile.avatar			= options.avatar;
	return user;
});

Accounts.config({
	forbidClientAccountCreation:	false
});

Accounts.emailTemplates.siteName	= "Cryptostake";
Accounts.emailTemplates.from		= "NoReply <noreply@blablabla.org>";
Accounts.emailTemplates.verifyEmail	= {
	subject() {
		return "[Cryptostake] Verify Your Email Address";
	},
	html(user, url) {
		let emailAddress	= user.emails[0].address,
		supportEmail		= "support@blablabla.org",
		emailBody			= `To verify your email address (${emailAddress}) visit the following <a href="${url}">link</a>.\n\n\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;
		return emailBody;
	}
};
