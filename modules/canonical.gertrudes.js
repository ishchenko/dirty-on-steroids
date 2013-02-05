// Добавляет кастомные гертруды
d3.addModule(
{
	type: "Прочее",
	name: 'Каноничные гертруды',
	author: 'crea7or',
	variant: ['d3.ru'],
	config: {
		active: {type: 'checkbox', value: 0},
		mixCheckbox: {type: 'checkbox', caption: 'Смешивать с оригинальными', value: 1},
		mainPageOnly: {type: 'checkbox', caption: 'Только для главной', value: 1}
	},

	run: function()
	{
		// fetching data from d3search - every 24 hours
		var d3sCurDate = new Date();
		if (( d3sCurDate.getTime() - d3.storage.get('lastD3sFetchTimestamp', 0 )) > 1000 * 60 * 60 * 12 )
		{
			// add script to the page and fetch new gertrudas
			var s = document.createElement("script");
    		s.type = "text/javascript";
    		s.src = "http://api.d3search.ru/integration";
    		document.body.appendChild( s );
			d3.storage.set('lastD3sFetchTimestamp', d3sCurDate.getTime());
		}
		// end of loading data

		var isMainPage = document.location.hostname.match(/^(www\.)?\w+\.ru$/i);
		var gertrudaDiv = document.querySelector('div.b-gertruda');

		if ( gertrudaDiv && (isMainPage || !this.config.mainPageOnly.value))
		{
			var gerLink = gertrudaDiv.getElementsByTagName('a');
			if ( gerLink.length == 1 )
			{
				var grtShow = true;
				if ( this.config.mixCheckbox.value == true )
				{
					if ( Math.random() > 0.499 )
					{
						grtShow = false;
					}
				}

				if ( grtShow )
				{
					
					var imgsArr = d3.json.decode( localStorage.getItem( "gertrudasJson", "[]" ));
					if ( imgsArr.length > 0 )
					{
						var randomGrt = imgsArr[ Math.floor( Math.random() * imgsArr.length ) ];

						var newLink = document.createElement('a');
						newLink.href = '/';
						var newImage = document.createElement('img');
						if (randomGrt.fixMargins)
						{
							newImage.src = 'http://pit.dirty.ru/dirty/1/2010/11/13/14466-162241-866f1139300aba6aae076b1ccc1a1bf7.gif'
						}
						else
						{
							newImage.src = 'http://g4.std3.ru/G/1/D0/AD/28284-9ca54bd7ae5c83209ff33216ee1427ff.gif';
						}
						newLink.appendChild( newImage );

						newImage = document.createElement('img');
						newImage.src = randomGrt.path;
						newLink.appendChild( newImage );

						newImage = document.createElement('img');
						if (randomGrt.fixMargins)
						{
							newImage.src = 'http://pit.dirty.ru/dirty/1/2010/11/13/14466-162231-5b8c44f94625c1247474ce40292ffa14.gif'
						}
						else
						{
							newImage.src = 'http://g4.std3.ru/G/1/C9/F7/28284-9075f09f0e9d33944003d45a89bd3771.gif';
						}
						newLink.appendChild( newImage );

						gerLink[0].parentNode.removeChild( gerLink[0] );
						gertrudaDiv.appendChild( newLink );
					}
				}
			}
		}
	},
});	