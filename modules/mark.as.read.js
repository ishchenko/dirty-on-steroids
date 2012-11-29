
// Mark as read button
d3.addModule(
{
	type: "Навигация",
	name: 'Помечать как прочитанное',
	author: 'Stasik0',
	config: {active:{type:'checkbox',value:true}},
	commentSelector: 'a[href*=comments],a[href*="my/inbox"]',
			
	onPost: function(post) {
		post.container.append("<b>" + post.isNew + "</b>");
		var footer=post.getFooter();
		var me=this;
		var span = $j("span",footer).first();
		var link = $j(this.commentSelector, footer).first();
		if (!link.length || link.get(0).hostname  != document.location.hostname) return;
		var url = link.attr("href");
		span.append('<div class="markasread" style="display:inline-block;"><a href="#" title="Пометить комментарии как прочтённые" style="text-decoration:none; font-weight: bold">[x]</a></div>');
		$j('.markasread',footer).click(function(e){e.preventDefault(); return me.processClick(url,post);});
	},
	
	processClick: function(url, post) {
		var me = this;
		var div = $j('.markasread', post.getFooter());
		$j("a", div).first().remove();
		div.append('<img alt="" src="data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA" />');
		$j.ajax({
        	  	type: "HEAD",
        	  	async: true,
		  		url: url
		}).done(function () {
				post.isNew = false;
				var parent = div.parent();
				var firstA = $j(me.commentSelector, parent).first();
				parent.empty().append(firstA);
				$j(".b-all_new_comments_link", firstA).removeClass("b-all_new_comments_link");

				try {
					//TODO rewrite module communication!
					var module = d3.getModule("Навигация по новым");
					if (module != null) {
						module.countItems.call(module);
						module.newPosition.call(module);
					}
				} catch (e) {
					if (console) console.log("Module communication is broken!", e);
				}
			});
		return false;
	}
});
