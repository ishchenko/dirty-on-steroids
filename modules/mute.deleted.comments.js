// Makes deleted comments look less bright
d3.addModule(
{
	type: "Стилизация",
	name: 'Приглушать удаленные комментарии',
	author: 'Aivean',
	config: {active:{type:'checkbox',value:true}},

	onComment: function (comment) {
		if (comment.container.html().indexOf("[DELETED]") == -1) return;
		var strong = $j("strong:contains([DELETED])", comment.container);
		if (strong.length) {
			strong.css("font-weight", "100");
			comment.container.css("opacity", "0.5");
		}
	}
});