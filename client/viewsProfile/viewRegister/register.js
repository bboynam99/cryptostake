Template.Register.onCreated(function(){
	this.emailEmpty			= new ReactiveVar();
	this.firstNameEmpty		= new ReactiveVar();
	this.lastNameEmpty		= new ReactiveVar();
	this.usernameEmpty		= new ReactiveVar();
	this.passwordEmpty		= new ReactiveVar();
	this.passRepeatEmpty	= new ReactiveVar();

	this.usernameExists		= new ReactiveVar();
	this.emailExists		= new ReactiveVar();
	this.passDontMatch		= new ReactiveVar();
	this.passSmallLength	= new ReactiveVar();
	this.passFirst			= new ReactiveVar();
	this.passSecond			= new ReactiveVar();

	this.fieldsNotComplete	= new ReactiveVar();
});

Template.Register.onRendered(function(){
	var self = this;
	this.autorun(function(){
		$('.eventblock').addClass('show-blk');
		$('.content-bet-info').addClass('show-blk');

		// placeholder-focus
		$(document).ready(function(){
			$('input,textarea').focus(function(){
				$(this).data('placeholder',$(this).attr('placeholder'))
				$(this).attr('placeholder','');
			});
			$('input,textarea').blur(function(){
				$(this).attr('placeholder',$(this).data('placeholder'));
			});
		});

		if (self.emailEmpty.get()		!= false
		|| self.firstNameEmpty.get()	!= false
		|| self.lastNameEmpty.get()		!= false
		|| self.usernameEmpty.get()		!= false
		|| self.passwordEmpty.get()		!= false
		|| self.passRepeatEmpty.get()	!= false
		|| self.usernameExists.get()	!= false
		|| self.emailExists.get()		!= false
		|| self.passDontMatch.get()		!= false
		|| self.passSmallLength.get()	!= false) {
			self.fieldsNotComplete.set(true);
		} else {
			self.fieldsNotComplete.set(false);
		}
	});
});

Template.Register.events({
	'submit form': function(event, template){
		event.preventDefault();
		if (template.fieldsNotComplete.get()) {
			if (template.emailEmpty.get()		!= false)	{	template.emailEmpty.set(true);		}
			if (template.firstNameEmpty.get()	!= false)	{	template.firstNameEmpty.set(true);	}
			if (template.lastNameEmpty.get()	!= false)	{	template.lastNameEmpty.set(true);	}
			if (template.usernameEmpty.get()	!= false)	{	template.usernameEmpty.set(true);	}
			if (template.passwordEmpty.get()	!= false)	{	template.passwordEmpty.set(true);	}
			if (template.passRepeatEmpty.get()	!= false)	{	template.passRepeatEmpty.set(true);	}
			return false;
		}

		var data = {
			username:	event.target.username.value.trim(),
			firstName:	event.target.firstname.value.trim(),
			lastName:	event.target.lastname.value.trim(),
			email:		event.target.email.value.trim(),
			birthDate:	event.target.birthdate.value,
			password:	event.target.password.value	
		};
		Meteor.call('signUp', data, function(error, result){
			if (error) {
				template.fieldsNotComplete.set(true);
			} else {
				Meteor.loginWithPassword(data.username, data.password);
			}
		});
	},
	'input #firstname, change #firstname, paste #firstname, focusout #firstname': function(event, template){
		if (!$(event.target).val().trim())		template.firstNameEmpty.set(true);
		else									template.firstNameEmpty.set(false);
	},
	'input #lastname, change #lastname, paste #lastname, focusout #lastname': function(event, template){
		if (!$(event.target).val().trim())		template.lastNameEmpty.set(true);
		else									template.lastNameEmpty.set(false);
	},
	'input #username, change #username, paste #username, focusout #username': function(event, template){
		if (!$(event.target).val().trim())		template.usernameEmpty.set(true);
		else									template.usernameEmpty.set(false);

		Meteor.call('checkUsernameExists', $(event.target).val(), function(error, result){
			template.usernameExists.set(result);
		});
	},
	'input #email, change #email, paste #email, focusout #email': function(event, template){
		if (!$(event.target).val().trim())		template.emailEmpty.set(true);
		else									template.emailEmpty.set(false);

		Meteor.call('checkEmailExists', $(event.target).val(), function(error, result){
			template.emailExists.set(result);
		});
	},
	'input #password, change #password, paste #password, focusout #password': function(event, template){
		if (!$(event.target).val())		template.passwordEmpty.set(true);
		else							template.passwordEmpty.set(false);

		if ($(event.target).val().length < 6 && $(event.target).val().length > 0)				template.passSmallLength.set(true);
		else																					template.passSmallLength.set(false);

		if ($(event.target).val() != template.passSecond && template.passSecond.length > 0)		template.passDontMatch.set(true);
		else																					template.passDontMatch.set(false);

		template.passFirst = $(event.target).val();
	},
	'input #confirm, change #confirm, paste #confirm, focusout #confirm': function(event, template){
		if (!$(event.target).val())		template.passRepeatEmpty.set(true);
		else							template.passRepeatEmpty.set(false);

		if ($(event.target).val() != template.passFirst && $(event.target).val().length > 0)	template.passDontMatch.set(true);
		else																					template.passDontMatch.set(false);

		template.passSecond = $(event.target).val();
	}
});

Template.Register.helpers({
	firstNameEmpty: function(){
		return Template.instance().firstNameEmpty.get();
	},
	lastNameEmpty: function(){
		return Template.instance().lastNameEmpty.get();
	},
	emailEmpty: function(){
		return Template.instance().emailEmpty.get();
	},
	usernameEmpty: function(){
		return Template.instance().usernameEmpty.get();
	},
	passwordEmpty: function(){
		return Template.instance().passwordEmpty.get();
	},
	passRepeatEmpty: function(){
		return Template.instance().passRepeatEmpty.get();
	},
	passDontMatch: function(){
		return Template.instance().passDontMatch.get();
	},
	passSmallLength: function(){
		return Template.instance().passSmallLength.get();
	},
	usernameExists: function(){
		return Template.instance().usernameExists.get();
	},
	emailExists: function(){
		return Template.instance().emailExists.get();
	},
	fieldsNotComplete: function(){
		return Template.instance().fieldsNotComplete.get();
	}
});
