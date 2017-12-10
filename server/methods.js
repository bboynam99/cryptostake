Meteor.methods({
	signUp: function(data){
		var id = Accounts.createUser({
			username:	data.username,
			email:		data.email,
			password:	data.password,
			firstName:	data.firstName,
			lastName:	data.lastName,
			birthDate:	data.birthDate
		});
	},
	checkUsernameExists: function(data){
		var found = Meteor.users.findOne({$or: [{_id: data}, {username: new RegExp("^" + data + "$", "i")}]});
		if (found)	return true;
		return false;
	},
	checkEmailExists: function(data){
		var found = Meteor.users.findOne({"emails.address": { $regex: new RegExp("^" + data + "$", "i")}});
		if (found)	return true;
		return false;
	}
});
