// Убирает пользователей инбокса под ссылку
d3.addModule(
{
	type: "Содержание",
	name: 'Прятать пользователей инбокса под ссылку',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},
	
	run: function()
	{
		var insidePost = ( document.location.href.indexOf('comments') > -1 );
		var insideInbox = ( document.location.href.indexOf('inbox') > -1 );

		var vTortAddLinksInbox = document.querySelector('div.comments_header_threshhold_inner');
		if ( vTortAddLinksInbox)
		{
			vTortAddLinksInbox.setAttribute('style', 'padding: 20px 20px 20px 20px; background-repeat: repeat-x repeat-y; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpiuHnzZgNAgAEACCYDDGx4O28AAAAASUVORK5CYII=);');
			if ( insideInbox )
			{
				var vTortInboxPost = document.querySelector('div.post_comments_page');
				if ( vTortInboxPost )
				{
					vTortInboxPost.setAttribute('style', 'margin-bottom: 25px;');			
				}			
				vTortNewa = document.createElement('div');
				vTortNewa.setAttribute('style', 'float: right;');
				vTortNewa.innerHTML = "<a href=\"#\" class=\"dashed comments_header_new_comment\" onclick=\"var e = document.getElementById('js-inboxers-list');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;\">список инбоксеров</a>";
				vTortAddLinksInbox.appendChild( vTortNewa );
				var vTortHideInboxers = document.querySelector('div.b-inbox_controls');
				if ( vTortHideInboxers)
				{
					vTortHideInboxers.setAttribute('id', 'js-inboxers-list');
					vTortHideInboxers.style.display = 'none';
					vTortHideInboxers = document.querySelector('div.comments_holder_inner');
					if ( vTortHideInboxers)
					{
						vTortHideInboxers.setAttribute('style', 'padding-right: 0px');
					}
				}
			}
		}
	},
});
	