// Предпросмотр внешних ссылок в заголовках постов
d3.addModule(
{
	type: "Содержание",
	name: 'Показывать внешние ссылки из заголовков постов',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},

	onPost: function (post) {
		var headersArr = $j("h3", post.container).get();
		if (headersArr) {
			var headerLinks;
			var linkHref;
			var linkPreview;
			for (var i = 0; i < headersArr.length; i++) {
				headerLinks = headersArr[i].getElementsByTagName('a');
				if (headerLinks.length == 1) {
					if (headerLinks[0].href.indexOf('d3.ru/comments/') == -1) {
						linkHref = headerLinks[0].hostname.replace(/^www\./, '');
						linkPreview = document.createElement('a');
						linkPreview.href = headerLinks[0].href;
						linkPreview.innerHTML = linkHref;
						linkPreview.setAttribute('style', 'margin-left: 20px; opacity: 0.5;');
						headersArr[i].appendChild(linkPreview);
					}
				}
			}
		}
	}
});
	
