// User's online visiblity
d3.addModule(
{
	type: "Прочее",
	name: 'Показываться онлайн через d3search',
	author: 'crea7or, Stasik0',
	variant: ['d3.ru'],
	config: {active:{type:'checkbox',value:1}},

	run: function()
	{		
		if( d3.user.name != null && d3.user.name.length > 0 )
		{
			var lastCheckinTimestamp = localStorage.getItem('lastCheckinTimestamp', 0 );
			var drawStuff = function()
			{
				var divContentLeft = document.querySelector("div.l-content_aside");
				if ( divContentLeft )
				{
					var checkinsMarkup = localStorage.getItem('checkinsMarkup');
					var newdiv = document.createElement('div');
					if ( document.location.href.indexOf('d3.ru/users') > -1 || document.location.href.indexOf('d3.ru/blogs') > -1 )
					{
						newdiv.setAttribute('style', 'margin-top: 300px;');
					}
					var fixdomain = checkinsMarkup.replace(/\/user/g, "http://d3.ru/user");
					newdiv.innerHTML =  fixdomain;
					divContentLeft.appendChild( newdiv );
					var module = d3.getModule("Dirty tooltip");
					if(module != null){
						module.processLinks.call(module, divContentLeft);
					}
				}
				var highlightsStyles = localStorage.getItem('checkinsHighlights');
				if (highlightsStyles != null)
				{
					$j('head').append(highlightsStyles);
				}
			};
			var now = new Date().getTime();
			if ((now - lastCheckinTimestamp) > 1000 * 60 * 2 )
			{
				$j(document).ready(function(){
					$j.getScript("http://api.d3search.ru/checkin/" + d3.user.name, function() {
						drawStuff();
						localStorage.setItem('lastCheckinTimestamp', now);
					});
				});
			}else{
				drawStuff();
			}
		}
	}
});
	
