
// Hidden authors
d3.addModule(
{
	type: "Социализм",
	name: 'Анонимные авторы постов',
	author: 'crimaniak',
	config: {posts:   {type:'checkbox',value:false,caption:"Анонимные авторы постов"}
			,comments:{type:'checkbox',value:false,caption:"Анонимные комментаторы"}},
	run: function()
	{
		if(this.config.posts.value)
			$j('.post .dd a[href^="/user/"]').html('?????');
		if(this.config.comments.value)
			$j('.comment .c_footer a[href^="/user/"]').html("?????");
	}
});