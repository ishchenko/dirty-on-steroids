// Hides posts with low rating
d3.addModule(
	{
		type: "Содержание",
		name: 'Бесконечная страница',
		author: 'Aivean',
		config: {
			active: {type: 'checkbox', value: true}
		},

		eventName: "scroll.infinite.paging",

		lastCheckTime : new Date().getTime(),

		getLoadMoreButton : function () {
			return $j("a#js-index_load_more_posts");
		},

		needToCheck : function(){
			if ((new Date()).getTime() - this.lastCheckTime > 20) {
				this.lastCheckTime = new Date().getTime();
				return true;
			}
			return false;
		},

		enableScroll: function(me, loadMoreButton, main) {
			var $doc = $j(document);
			var $body = $j("body");
			var $footer = $j("#js-footer");
			if (!$doc.length || !$body.length || !$footer.length) {
				if (console) console.log("One of this elements is undefined: ", $doc, $body, $footer);
				return;
			}

			$j(window).on(me.eventName, function(){
				if (!me.needToCheck()) return;
				if (loadMoreButton.hasClass("js-loading")) return; //in progress
				var right = $doc.height() - $body.height() * 2 - $footer.height();
				var loadContent = $doc.scrollTop() >= right;
				if (loadContent) {
					loadMoreButton = me.getLoadMoreButton();
					if (loadMoreButton.length && !(loadMoreButton.hasClass("hidden"))) {
						loadMoreButton.click();
					} else {
						$j(window).off(me.eventName);
					}
				}
			});
		},

		run: function(){
			var loadMoreButton = this.getLoadMoreButton();
			var main = $j(".l-content_main");

			if (loadMoreButton.length && main.length) {
				this.enableScroll(this, loadMoreButton, main);
			}
		}
	});