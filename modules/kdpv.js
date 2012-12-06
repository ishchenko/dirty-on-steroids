// Спрятать КДПВ
d3.addModule(
{
	type: "Содержание",
	name: 'Спрятать картинки в постах',
	author: 'crimaniak',
	config: {active:{type:'checkbox',value:0}},
		
	onPost: function(post)
	{
		var img = $j('.post_body img', post.container).first();
		if (img.length) {
			var p = img.parent();
			var opener = $j('<a href="#">Показать картинку</a>');
			img.css('display', 'none');
			opener.prependTo(p);
			p.click(function () {
				img.css('display', '');
				opener.remove();
				return false;
			});
		}
	}
});