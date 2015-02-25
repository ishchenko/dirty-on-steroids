// Предпросмотр внешних ссылок в заголовках постов
d3.addModule(
{
	type: "Содержание",
	name: 'Показывать внешние ссылки из заголовков постов',
	author: 'crea7or',
	variant: ['d3.ru'],
	config: {active:{type:'checkbox',value:1}			
	},

	onPost: function (post) {
		var headersArr = $j("h3", post.container).get();
		if (headersArr)
		{
			var postLinks = $j(".b-post_snippet_icon", post.container).get(); 
			var postHeader = headersArr[0];
			if ( postLinks && postLinks.length > 0 )
			{
				linkHref = postLinks[0].hostname.replace(/^www\./, '');
				linkPreview = document.createElement('a');
				linkPreview.href = postLinks[0].href;
				linkPreview.innerHTML = linkHref;
				linkPreview.setAttribute('style', 'margin-left: 20px; opacity: 0.5;');
				postHeader.appendChild(linkPreview);
			}
		}
	}
});
	
