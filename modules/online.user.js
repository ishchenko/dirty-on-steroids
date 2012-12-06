// User's online visiblity
d3.addModule(
{
	type: "Прочее",
	name: 'Показываться онлайн через d3search',
	author: 'crea7or, Stasik0',
	config: {active:{type:'checkbox',value:true}},

	run: function()
	{		
		if( d3.user.name != null && d3.user.name.length > 0 )
		{
			var lastCheckinTimestamp = d3.storage.get('lastCheckinTimestamp', 0 );
			var drawStuff = function()
			{
				var divContentLeft = document.querySelector("div.l-content_aside");
				if ( divContentLeft )
				{
					var checkinsMarkup = localStorage.getItem('checkinsMarkup');
					var newdiv = document.createElement('div');
					newdiv.innerHTML =  checkinsMarkup;
					divContentLeft.appendChild( newdiv );
					var module = d3.getModule("Dirty tooltip");
					if(module != null){
						module.processLinks.call(module, divContentLeft);
					}
				}
				var highlightsStyles = d3.storage.get('checkinsHighlights');
				if (highlightsStyles != null)
				{
					var highlightsDiv = document.createElement('div');
					highlightsDiv.innerHTML = highlightsStyles;
					document.body.appendChild(highlightsDiv);
				}
			};
			var now = new Date().getTime();
			if ((now - lastCheckinTimestamp) > 1000 * 60 * 2 )
			{
				$j(document).ready(function(){
					$j.getScript("http://api.d3search.ru/checkin/" + d3.user.name, function() {

						drawStuff();
						d3.storage.set('lastCheckinTimestamp', now);
					});
				});
			}else{
				drawStuff();
			}
		}
	}
});
	
