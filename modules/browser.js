// browser info
d3.addModule(
{
	type: "Прочее",
	name: 'Информация о браузере',
	author: 'crimaniak',
	config: {active:{type:'checkbox',value:0}},
	run: function()
	{
		var info='';
		$j.each($j.browser, function(i, val) {
		      info += i+" : <span>"+val+"</span><br>";
		    });
		d3.content.addToLeftNav('<li>'+info+'</li>');
	}
});