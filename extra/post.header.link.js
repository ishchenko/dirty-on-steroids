// Предпросмотр внешних ссылок в заголовках постов
d3.addModule(
{
	type: "Содержание",
	name: 'Показывать внешние ссылки из заголовков постов',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},

	run: function()
	{
		var anyPosts = document.getElementById('js-posts_holder') || document.querySelector('div.h-post_comment_page');
		if ( anyPosts )
		{
			var headersArr = anyPosts.getElementsByTagName('h3');
			if ( headersArr )
			{
				var headerLinks;
				var linkHref;
				var linkPreview;
				for ( var i = 0; i < headersArr.length; i++)
				{
					headerLinks = headersArr[i].getElementsByTagName('a');
					if ( headerLinks.length == 1 )
					{
						if ( headerLinks[0].href.indexOf('d3.ru/comments/') == -1)
						{
							linkHref = headerLinks[0].href;
							if ( linkHref.indexOf('http://') == 0)
							{
								linkHref = linkHref.slice( 7 );
							}
							else if ( linkHref.indexOf('https://') == 0)
							{
								linkHref = linkHref.slice( 8 );
							}
							if ( linkHref.indexOf('www.') == 0 )
							{
								linkHref = linkHref.slice( 4 );
							}

							if ( linkHref.indexOf('/') > -1 )
							{
								linkHref = linkHref.slice( 0, linkHref.indexOf('/'));
							}
							linkPreview = document.createElement('a');
							linkPreview.href = headerLinks[0].href;
							linkPreview.innerHTML = linkHref;
							linkPreview.setAttribute('style' , 'margin-left: 20px; opacity: 0.5;');
							headersArr[i].appendChild( linkPreview );
						}
					}
				}
			}
		}
	},
});
	