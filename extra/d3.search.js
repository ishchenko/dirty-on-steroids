d3.addModule(
{
	type: "Поиск",
	name: 'Поиск на d3search.ru',
	author: 'crimaniak, crea7or',
	config: {active:{type:'checkbox',value:true}},
	run: function()
	{
		var script2run = document.createElement('script');
		script2run.type = 'text/javascript';
		script2run.text = "searchHandler.submitQuery = function (search_form) {"
			+ "	if (search_form.getParent('.b-header_search')) {"
			+ "		var input_holder = $('js-header_search_input').getParent('.b-header_search_input_holder');"
			+ "		var search_holder = $('js-header_search_input').getParent('.b-header_search');"
			+ "		if (search_holder.hasClass('b-header_search_input_shrinked')) {"
			+ "			search_holder.removeClass('b-header_search_input_shrinked');"
			+ "			input_holder.get('morph').removeEvents('complete');"
			+ "			input_holder.set('morph', {duration:333, onComplete : function () {"
			+ "				$('js-header_search_input').focus();"
			+ "				(function () {document.addEvent('click', searchHandler.shrinkHeaderSearch);}).delay(200); }}); input_holder.morph({ width : 250 });"
			+ "		    return ;}}"
			+ "	var query = $(search_form).getElement('input[type=\"text\"]').value; window.location.href = 'http://d3search.ru/search?query=' + encodeURIComponent(query); };";

		$j('head').get(0).appendChild(script2run);
	}
});
