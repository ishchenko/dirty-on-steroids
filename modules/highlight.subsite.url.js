// Hides posts with low rating
d3.addModule(
	{
		type: "Стилизация",
		name: 'Выделять ссылки на подсайты в постах',
		author: 'Aivean',
		config: {
			active: {type: 'checkbox', value: true},
			style: {
				type: 'select',
				value: "yellow-back",
				caption: 'Стиль выделения:',
				options: {
					"Рамка" : "border",
					"Фон" : "yellow-back"
				}
			}
		},

		styleName: "subsite-link-highlighted",
		styles: {
			'border': "border: 1px solid #888888;\n" +
				"padding: 0px 2px 1px 2px; text-decoration: none;" +
				"-webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius: 2px;",
			'yellow-back': "background-color: #E9DFC3;" +
				"padding: 0px 2px 1px 2px; text-decoration: none;"
		},

		onPost: function (post) {
			var linksInInfo = post.info.get(0).getElementsByTagName('a');
			if ( linksInInfo && linksInInfo.length > 1 )
			{	
				if ( linksInInfo[1].textContent.indexOf('.d3.ru') > -1 )
				{
					linksInInfo[1].setAttribute('style', this.styles[this.config.style.value] );
				}
			}
		}
	});