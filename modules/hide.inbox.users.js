// Убирает пользователей инбокса под ссылку
d3.addModule(
{
	type: "Содержание",
	name: 'Прятать пользователей инбокса под ссылку',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:1}},
	
	run: function()
	{
		var insidePost = ( document.location.href.indexOf('comments') > -1 );
		var insideInbox = ( document.location.href.indexOf('inbox') > -1 );

		var tortAddLinksInbox = document.querySelector('div.b-comments_controls_sort');
		if ( tortAddLinksInbox && insideInbox )
		{
			tortNewa = document.createElement('a');
			tortNewa.href = '#';
			tortNewa.setAttribute('style', 'margin-left: 20px;');
			tortNewa.setAttribute('onclick', "var e = document.getElementById('js-inboxers-list');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;");
			tortNewa.innerHTML = 'список инбоксеров';

			tortAddLinksInbox.appendChild( tortNewa );
			var tortHideInboxers = document.querySelector('div.b-inbox_controls');
			if ( tortHideInboxers)
			{
				tortHideInboxers.setAttribute('id', 'js-inboxers-list');
				tortHideInboxers.style.display = 'none';
				tortHideInboxers = document.querySelector('div.comments_holder_inner');
				if ( tortHideInboxers)
				{
					tortHideInboxers.setAttribute('style', 'padding-right: 0px');
				}
			}
		}
	},
});
	