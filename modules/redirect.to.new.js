// Total redirect from / to /new
d3.addModule(
{
	type: "Прочее",
	name: 'Переход с / на /new',
	author: 'Stasik0',
	variant: ['d3.ru'],
	config: {active:{type:'checkbox',value:1}},

	run: function()
	{
		if(document.location.pathname == '/' && document.location.href.indexOf('?')==-1){
			document.location.href = document.location.href+"new";
			return;
		}

		$j('a.b-blog_nav_sort_link').each(function(link){
			if($j(this).attr('href')=='/')
				$j(this).attr('href', '/?');
		});

		//modify old links
		$j('a[href$="d3.ru"], a[href$="d3.ru/"], a[href="/"]').not('a[href^="mailto:"]').each(function(link){
			var href = $j(this).attr('href');
			if(href.indexOf('write')==-1){
				if(href.toString().endsWith('/')){
					$j(this).attr('href', $j(this).attr('href')+'new');
				}else{
					$j(this).attr('href', $j(this).attr('href')+'/new');
				}
			}
		});
	}

});
