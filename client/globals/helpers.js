Template.registerHelper('showDateDDMMYYYY', function(ISODate){
	return moment(ISODate).format('DD.MM.YYYY');
});
