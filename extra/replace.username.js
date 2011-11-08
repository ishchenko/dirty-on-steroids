// Replace %username% to username
d3.addModule(
{
	type: "Содержание",
	name: 'Замена %username%',
	author: 'crimaniak',
	config: {active:{type:'checkbox',value:false}},
	run: function()
	{
		if(d3.user.name==null) return;
		
		d3.xpath.each("//body//text()[contains(string(),'%username%')]", 
			function(node)
			{
				if(node.data != undefined) ///< opera fix
					node.data=node.data.replace('%username%',d3.user.name);
			});
	}
});
