// browser info
d3.addModule(
{
	type: "Прочее",
	name: 'Информация о браузере',
	author: 'crimaniak',
	config: {active:{type:'checkbox',value:false}},
	run: function()
	{
		var info='';
		$j.each($j.browser, function(i, val) {
		      info += i+" : <span>"+val+"</span><br>";
		    });
		d3.get.leftNavigation().append('<li>'+info+'</li>');
	}
});