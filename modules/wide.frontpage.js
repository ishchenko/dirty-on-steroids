// Широкая главная
d3.addModule(
{
	type: "Навигация",
	name: 'Широкая главная',
	author: 'crea7or',
	variant: ['d3.ru'],	
	config: {active:{type:'checkbox',value:0}},

	run: function () {
		$j("#js-posts_holder").attr("style", "padding-right: 30px;").attr("class", "");
		$j("#js-random_interests").remove();
	}
});
