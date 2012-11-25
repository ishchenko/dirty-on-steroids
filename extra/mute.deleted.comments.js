// Makes deleted comments look less bright
d3.addModule(
{
	type: "Стилизация",
	name: 'Приглушать удаленные комментарии',
	author: 'Aivean',
	config: {active:{type:'checkbox',value:true}},

	onComment: function (comment) {
		if (comment.container.has("strong:contains([DELETED])").length) {
			$j("strong:contains([DELETED])", comment.container).css("font-weight", "100");
			console.log(comment.container);
			comment.container.css("opacity", "0.5");
		}
	}
});