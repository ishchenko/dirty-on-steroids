// Total redirect from / to /new
d3.addModule(
{
	type: "Прочее",
	name: 'Переход с / на /new',
	author: 'Stasik0',
	config: {active:{type:'checkbox',value:true}},

	run: function()
	{
		String.prototype.endsWith = function(suffix) {
			return this.indexOf(suffix, this.length - suffix.length) !== -1;
		};

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
