import { _ }					from 'meteor/underscore';
import { check }				from 'meteor/check';
import { Meteor }				from 'meteor/meteor';
import { Random }				from 'meteor/random';
import { FilesCollection }		from 'meteor/ostrio:files';
import { _app, Collections }	from '/lib/__globals.js';

process.env.DOCUMENTS_PATH		=	'/home/vaqif/uploads/user/documents';
process.env.PICTURES_PATH		=	'/home/vaqif/uploads/user/pictures';
process.env.AVATARS_PATH		=	'/home/vaqif/uploads/user/avatars';

Pictures = new FilesCollection({
	debug: false,
	collectionName: 'pictures',
	storagePath: process.env.PICTURES_PATH,
	downloadRoute: '/pictures',
	// protected(fileObj) {
	// 	if (this.userId) {
	// 		var profile = Meteor.users.findOne(fileObj.userId).profile;
	// 		if (profile.companyName == this.user().profile.companyName) {
	// 			return true;
	// 		} else {
	// 			return false;
	// 		}
	// 	} else {
	// 		return false;
	// 	}
	// },
	allowClientCode: false, // Disallow remove files from Client
	onBeforeUpload: function (file) {
		// Allow upload files under 10MB, and only in png/jpg/jpeg formats
		if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
			return true;
		} else {
			return 'Please upload image, with size equal or less than 10MB';
		}
	}
});

Avatars = new FilesCollection({
	debug: false,
	collectionName: 'avatars',
	storagePath: process.env.AVATARS_PATH,
	downloadRoute: '/avatars',
	// protected(fileObj) {
	// 	if (this.userId) {
	// 		var profile = Meteor.users.findOne(fileObj.userId).profile;
	// 		if (profile.companyName == this.user().profile.companyName) {
	// 			return true;
	// 		} else {
	// 			return false;
	// 		}
	// 	} else {
	// 		return false;
	// 	}
	// },
	allowClientCode: false, // Disallow remove files from Client
	onBeforeUpload: function (file) {
		// Allow upload files under 10MB, and only in png/jpg/jpeg formats
		if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
			return true;
		} else {
			return 'Please upload image, with size equal or less than 10MB';
		}
	}
});

if (Meteor.isServer) {
	Pictures.denyClient();
	Meteor.publish('pictures', function () {
		return Pictures.find().cursor;
	});
	Avatars.denyClient();
	Meteor.publish('avatars', function () {
		return Avatars.find().cursor;
	});;

	this.Pictures.on('afterUpload', function(fileRef) {
		if (/png|jpe?g/i.test(fileRef.extension || '')) {
			_app.createThumbnails("pictures", this, fileRef, (error, fileRef) => {
				if (error) {
					console.error(error);
				}
			});
		}
	});

	this.Avatars.on('afterUpload', function(fileRef) {
		if (/png|jpe?g/i.test(fileRef.extension || '')) {
			_app.createThumbnails("avatars", this, fileRef, (error, fileRef) => {
				if (error) {
					console.error(error);
				}
			});
		}
	});
}

if (Meteor.isClient) {
	Meteor.subscribe('pictures');
	Meteor.subscribe('avatars');
}
