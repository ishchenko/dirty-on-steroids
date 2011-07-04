// Replace %username% to username
d3.addModule(
{
	type: "Прочее",
	name: 'Замена %username%',
	author: 'crimaniak',
	config: {active:{type:'checkbox',value:false}},
	run: function()
	{
		if(d3.user.name==null) return;
		
		var nodes=document.evaluate("//body//text()[contains(string(),'%username%')]"
				,document
				,document.createNSResolver(document)
				,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
				,null);
		for (var i = 0; i < nodes.snapshotLength; i++) 
		{
             var node = nodes.snapshotItem(i);
             if(node.data != undefined) ///< opera fix
				node.data=node.data.split('%username%').join(d3.user.name);
		}
	}
});
