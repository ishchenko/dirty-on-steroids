// Ставит видео плеер вместо картинки на главной
d3.addModule(
{
	type: "Прочее",
	name: 'Каноничные гертруды',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:false}
	,mixCheckbox:{type:'checkbox',caption:'Смешивать с оригинальными',value:true}},
	
	run: function()
	{
		// fetching data from d3search - every 24 hours
		var d3sCurDate = new Date();
		if (( d3sCurDate.getTime() - d3.localStorageGetItem('lastD3sFetchTimestamp', 0 )) > 1000 * 60 * 60 * 12 )
		{
			// add script to the page and fetch new gertrudas
			var s = document.createElement("script");
    		s.type = "text/javascript";
    		s.src = "http://api.d3search.ru/integration";
    		var scriptTag = document.getElementsByTagName('script')[0]; 
    		scriptTag.parentNode.insertBefore(s, scriptTag);
			localStorage.setItem('lastD3sFetchTimestamp', d3sCurDate.getTime());
		}
		// end of loading data

		var gertrudaDiv = document.querySelector('div.b-gertruda');
		if ( gertrudaDiv )
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
					var imgsArr = d3.json.decode( d3.localStorageGetItem( "gertrudasJson", "[]" ));
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
							newImage.src = 'http://dirty.ru/i/img_above_gertruda.gif';
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
							newImage.src = 'http://dirty.ru/i/img_under_gertruda.gif';
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