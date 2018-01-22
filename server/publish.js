Meteor.publish('newsPage', function(){
	return News.find();
});
