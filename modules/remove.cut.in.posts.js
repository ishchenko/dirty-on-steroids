// Показывать посты целиком, без дебильной ссылки - свернуть/развернуть
d3.addModule(
{
	type: "Содержание",
	name: 'Показывать посты целиком без "развернуть"',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},

	run: function()
	{
		if( document.getElementById('js-posts_holder'))
		{
			var script2run = document.createElement('script');
			script2run.type = 'text/javascript';
			script2run.text = 'postsCutHandler = { 	cutPost : function (post, animation) {},	cut : function () {},	showPost : function (post_dt) {},	addCutLink : function (post_dt) {}};';
			document.getElementsByTagName('script')[0].appendChild( script2run );
		}
	},

	onPost: function(post) {
		if (!post.container.hasClass("post_cut")) return;
		post.container.find('.dt').removeAttr("style");
		cutPosts[i].removeChild(cutPosts[i].querySelector('.b-cut'));
	}
});
