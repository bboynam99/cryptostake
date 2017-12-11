Template.avatar.onCreated(function(){
	AVATAR_UPLOAD	= this.avatarUpload	= new ReactiveVar(false);
});

Template.avatar.onRendered(function(){
	function each(arr, callback) {
		var length = arr.length;
		var i;
		for (i = 0; i < length; i++) {
			callback.call(arr, arr[i], i, arr);
		}
		return arr;
	}

	this.croppable	= new ReactiveVar();

	CROPPABLE		= this.croppable;
	var checkLoaded	= Meteor.setInterval(function(){
		if (document.getElementById('avatar') != null && document.getElementById('avatar').src != null && document.getElementById('avatar').complete) {
			var avatar			= document.getElementById('avatar');
			this.cropper		= new Cropper(avatar, {
			aspectRatio:		1 / 1,
			viewMode:			2,
			cropBoxResizable:	true,
			zoomable:			false,
				ready: function () {
					var clone = this.cloneNode();
					clone.className = ''
					clone.style.cssText = (
						'display: block;' +
						'width: 100%;' +
						'min-width: 0;' +
						'min-height: 50vh;' +
						'max-width: none;' +
						'max-height: 100%;' +
						'border-radius: 50%;'
					);
					CROPPABLE.set(true);
				},
				crop: function(event) {
					var data				= event.detail;
					var imageData			= CROPPER.getImageData();
					var previewAspectRatio	= data.width / data.height;
				}
			});
			CROPPER = this.cropper;
			Meteor.clearInterval(checkLoaded);
		}
	}, 1);
});

Template.avatar.events({
	"click #left": function (event, template){
		CROPPER.rotate(-90);
	},
	"click #right": function (event, template){
		CROPPER.rotate(90);
	},
	"click #cancel": function (event, template){
		if (typeof(CROP_OR_UPLOAD) !== 'undefined' && CROP_OR_UPLOAD.get() == true) {
			CROP_OR_UPLOAD.set(null);
		}
		UPLOADED_FILE.set(null);
	},
	"click #crop": function (event, template){
		function getRoundedCanvas(sourceCanvas){
			var canvas	= document.createElement('canvas');
			var context	= canvas.getContext('2d');
			var width	= sourceCanvas.width;
			var height	= sourceCanvas.height;

			canvas.width	= width;
			canvas.height	= height;

			context.imageSmoothingEnabled = true;
			context.drawImage(sourceCanvas, 0, 0, width, height);
			context.globalCompositeOperation = 'destination-in';
			context.beginPath();
			return canvas;
		}

		var croppedCanvas;
		var roundedCanvas;
		var roundedImage;

		if (CROPPABLE.get() != true) {
			return;
		}
		// Crop
		croppedCanvas		= CROPPER.getCroppedCanvas();

		// Round
		roundedCanvas		= getRoundedCanvas(croppedCanvas);

		// Show
		roundedImage		= document.createElement('img');
		roundedImage.src	= roundedCanvas.toDataURL()

		var cropperbox		= document.getElementsByClassName('crop').item(0);
		cropperbox.style.display = 'none';

		$('#result').innerHTML	= '';
		$('#result').append(roundedImage);
		var data = $('#result img').attr('src');

		if (data) {
			var uploadInstance = Avatars.insert({
				file: data,
				isBase64: true,
				fileName: 'avatar.png'
			}, false);

			uploadInstance.on('start', function() {
				AVATAR_UPLOAD.set(this);
			});

			uploadInstance.on('end', function(error, fileObj){
				if (error) {
					Bert.alert('Error during cropping: ' + error.reason, 'danger', 'fixed-top');
				} else {
					Meteor.call("setTempFiles", fileObj._id, "avatar");
					UPLOADED_AVATAR.set(fileObj._id);
					TEMP_AVATARS.push(fileObj._id);
				}
				AVATAR_UPLOAD.set(false);
			});
			uploadInstance.start();
		}
	}
});

Template.avatar.helpers({
	data: function(){
		if (Template.parentData() != null &&
			Template.parentData().profile != null &&
			UPLOADED_FILE.get() == null)
			return Pictures.findOne(Template.parentData().profile.profilePic).link("reduced");
		else if (Template.parentData() != null &&
			Template.parentData().profilePic != null &&
			UPLOADED_FILE.get() == null)
			return Pictures.findOne(Template.parentData().profilePic).link("reduced");
		else
			return Pictures.findOne(UPLOADED_FILE.get()).link("reduced");
	},
	uploadingAvatar: function(){
		if (AVATAR_UPLOAD.get() != false) {
			$("[type='submit']").button('cropper') && $("[type='submit']").attr('disabled', 'disabled');
		} else {
			$("[type='submit']").button('reset') && $("[type='submit']").removeAttr('disabled');
		}
	}
});
