// Quotes-dirty.ru work
d3.addModule(
{
	type: "Содержание",
	name: 'Кнопка цитатника',
	author: 'crimaniak',
	url: 'http://quotes-dirty.ru/write',
	config: {active:{type:'checkbox',value:true}},
	run: function()
	{
		var i;
		
		for(i=0;i<d3.content.comments.length;++i) with(d3.content.comments[i])
			$j('.vote',getFooter()).before
				('<a href="'
				+URL.make(this.url)
					.add('username',userName)
					.add('text',getContent().text())
					.add('source',d3.page.inbox ? '' : document.location)
					.hash(d3.page.inbox ? '' : id)
				+'">в цитатник</a>');
	}
});
