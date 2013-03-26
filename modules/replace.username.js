// Replace %username% to username
d3.addModule(
{
	type: "Содержание",
	name: 'Замена %username%',
	author: 'crimaniak',
	config: {active:{type:'checkbox',value:0, description:'Аббревиатура %username% в постах и комментах заменяется на твой ник, %username%.'}},

	noUserName: d3.user.name == null,

	process: function (contextNode) {
		d3.xpath.each("//text()[contains(string(),'%username%')]",
			function (node) {
				if (node.data != undefined) ///< opera fix
					node.data = node.data.replace('%username%', d3.user.name);
			}, contextNode);
	},

	run: function() {
		if(this.noUserName) return;
		this.process();
	},

	onPost: function(post) {
		if(this.noUserName) return;
		this.process(post.container.get(0));
	},

	onComment: function(comment) {
		if(this.noUserName) return;
		this.process(comment.container.get(0));
	}
});
