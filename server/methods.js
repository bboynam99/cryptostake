Meteor.methods({
	signUp: function(data){
		var id = Accounts.createUser({
			username:	data.username,
			email:		data.email,
			password:	data.password,
			firstName:	data.firstName,
			lastName:	data.lastName,
			birthDate:	data.birthDate,
			picture:	data.picture,
			avatar:		data.avatar
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
	},
	setTempFiles: function(id, type){
		if (type == "picture") {
			Pictures.update({_id: id},	{$set: {temp: true}});
		}
		if (type == "avatar") {
			Avatars.update({_id: id},	{$set: {temp: true}});
		}
	},
	unsetTempFiles: function(id, type){
		if (type == "picture") {
			Pictures.update({_id: id},	{$set: {temp: false}});
		}
		if (type == "avatar") {
			Avatars.update({_id: id},	{$set: {temp: false}});
		}
	}
});
