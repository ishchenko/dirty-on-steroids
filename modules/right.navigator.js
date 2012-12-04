// Hавигатор справа
d3.addModule(
{
	type: "Навигация",
	name: 'Навигация по новым',
	author: 'crimaniak, Stasik0',
	config: {
		active:{type:'checkbox',value:true},
		smoothScroll:{type:'checkbox',value:true,caption:'Плавная прокрутка'}
	},
	newItems: [],
	mineItems: [],
	nextMine: null,
	nextNew: null,
	prevNew: null,
	currentItem: null,
	scrolling: false,
	scrollDestination: 0,
	run: function() {
		this.drawButtons();
		
		var me=this;
		$j(window).scroll(function(event){me.onScroll();});
		$j('#home').mousedown(function(e){e.preventDefault(); me.scrollToPosition(0);});
		$j('#down').mousedown(function(e){
			e.preventDefault(); 
			me.scrollToItem(me.newItems[me.nextNew]); 
		});
		$j('#up').mousedown(function(e){
			e.preventDefault(); 
			me.scrollToItem(me.newItems[me.prevNew]);
		});
		$j('#mine').mousedown(function(e){
			e.preventDefault(); 
			me.scrollToItem(me.mineItems[me.nextMine]);
		});
		
	},

	onItemsUpdated: function () {
		this.newPosition();
	},

	onPost: function (post) {
		this.countItem(post);
	},

	onComment: function (comment) {
		this.countItem(comment);
	},

	scrollToPosition: function(position)
	{
		if(this.config.smoothScroll.value){
			this.smoothScroll(position);
		}else{
			$j(window).scrollTop(
				position
			);
			this.resetScrolling();
		}
	},

	resetScrolling: function() {
		this.scrolling = false;
	},

	smoothScroll: function(destination){
		this.scrollDestination = destination;
		this.scrolling = true;
		this.scrollDaemon();
	},

	scrollDaemon: function(lastPosition){
		lastPosition = typeof lastPosition !== 'undefined' ? lastPosition : -1;
		var destination = this.scrollDestination;
		if(this.scrolling == false){
			scrolling = false;
			this.newPosition();
			return;
		}
		current = $j(window).scrollTop();
		distance = destination - current;
		if (current==lastPosition || Math.abs(distance) < 5 || Math.round(current+(distance/4.5)) < 0) {
			$j(window).scrollTop(destination);
			this.resetScrolling();
			this.newPosition();
			return;
		}
		$j(window).scrollTop(
			Math.round(current+(distance/4.5))
		);
		var me = this;
		window.setTimeout(function(){me.scrollDaemon(current);}, 30);
	},

	countItem: function(item) {
		// select new and mine items
		var hidden = undefined;
		var changes = false;
		if (item.isNew) {
			if (hidden = item.container.is(":hidden")) {
				return false;
			}
			this.newItems.push(item);
			changes = true;
		}
		if (item.isMine) {
			if (hidden == undefined && item.container.is(":hidden")) {
				return false;
			}
			this.mineItems.push(item);
			changes = true;
		}
		return changes;
	},

	scrollToItem: function(item)
	{
		if(item==null) return false;
		
		var highlightColor = "#fff48d";
		var colorToHex =  function(color) {
		    if (color.substr(0, 1) === '#') {
			return color;
		    }
		    if(color.substr(0, 3) !== "rgb"){
			return "unknown";
		    }

			if(color.substr(0, 4) === "rgba"){
				var digits = /(.*?)rgba\((\d+), (\d+), (\d+), (\d+)\)/.exec(color);
				
				var red = parseInt(digits[2]);
				var green = parseInt(digits[3]);
				var blue = parseInt(digits[4]);
				var alpha = parseInt(digits[5]);
				return '#'+(256 + red).toString(16).substr(1) +((1 << 24) + (green << 16) | (blue << 8) | alpha).toString(16).substr(1);
			}else if(color.substr(0, 3) === "rgb"){
				var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
				
				var red = parseInt(digits[2]);
				var green = parseInt(digits[3]);
				var blue = parseInt(digits[4]);
				
				var rgb = blue | (green << 8) | (red << 16);
				return digits[1] + '#' + rgb.toString(16);
			}
			return "unknown";
		};
		this.scrolling=true;
		this.scrollToPosition(Math.floor(item.offset().top+(item.height()-$j(window).height())/2));
		this.currentItem=item;
		this.newPosition();
		/*
		item.getContent().get(0).style.opacity=0.1;
		item.getContent().animate({opacity: 1},400);
		*/
		var content=item.container;
		var inner = $j(".comment_inner", content);
		if(inner!=null && inner.length > 0){ //is it a comment? if yes get a nested element for a better highlighting
			content = inner;
		}
		var oldColor=content.css('background-color');
		if(colorToHex(oldColor) != highlightColor){
			window.setTimeout(function(){content.css('background-color',oldColor);}, 650);
			content.css('background-color',highlightColor);
		}
	},
	
	getCurrentOffset: function() {return this.currentItem ? this.currentItem.offset().top+this.currentItem.height()/2 : $j(window).scrollTop()+$j(window).height()/2;},
	
	onScroll: function()
	{
		if(!this.scrolling){
			this.currentItem=null;
		}
		this.newPosition();
	},
	
	newPosition: function()
	{
		var offset = this.getCurrentOffset();
		//--handling own posts
		for(i=0; i<this.mineItems.length && this.mineItems[i].offset().top<offset; ++i);
		$j("#mine").text(this.mineItems.length-i);
		this.nextMine = i%this.mineItems.length;

		//--handling new posts
		//scroll down until one post's top is below the viewpoint
		for(i=0; i<this.newItems.length && this.newItems[i].offset().top<offset; ++i);
		//go one post up if possible
		if(i>0)i--;
		//item is the last active element which top is above the current view
		var item = this.newItems[i];
		if(item){
			if(item.offset().top+item.height() > offset && item.offset().top <= offset){
				//we are currently viewing the item
				this.prevNew = (i>0) ? i-1 : null;
				$j("#up").text(i);
				this.nextNew = (i<this.newItems.length-1) ? i+1 : null;
				$j("#down").text(this.newItems.length-1-i);
			}else if(item.offset().top > offset){
				//the item is below the current position (this is the first one)
				this.prevNew = null;
				$j("#up").text(0);
				this.nextNew = i;
				$j("#down").text(this.newItems.length-i);
			}else{
				//item is above the current position
				this.prevNew = i;
				$j("#up").text(i+1);
				this.nextNew = (i<this.newItems.length-1) ? i+1 : null;
				$j("#down").text(this.newItems.length-1-i);
			}
		}else{
			$j("#up").text(0);
			$j("#down").text(0);
		}
	},
		
	drawButtons: function()
	{
			document.body.insertBefore(d3.newDiv(
			{style:{position:'fixed',top:'50%',marginTop:'-72px',right:'1px',zIndex:'100'}

			,innerHTML: '<div id="home" style="height:32px; width:32px; color:#516f8d; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wLFQ8cDrOs1y8AAACISURBVEjH7dbBCcAgDAXQKO6RoTqJk2QSl3EDFwgxE/QgeK0K6aFNTgHhPxTUBGYGy0oAoKpG6V0kjQ4RLYA6AQBorVkYEYzLAQc+B2QqmYoVMKO3jLibvmvEg/QtI56lrxvPAOXrYOm394DytXIsr+4gMLOqIqLFl9lF/DV1wIExXXeRKmIE3NuqNWx/z730AAAAAElFTkSuQmCC); cursor: pointer; cursor: hand; text-align:center; margin-bottom: 10px;" title="В начало страницы"></div>'
						+ '<div id="up" style="height:22px; width:32px; color:#516f8d; text-shadow: 1px 1px 1px #fff; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wLFQ8cMHLNyoQAAACkSURBVFjD7dfBDYMwDIXh54p72YAdsv8MmSHeAE/wekBEqkAodUq42DekiP+LcrKQhHdUlQCwLIt4/zH1hG1dt2/ADZmcN97D6IVIyxMcwqqn53bIe57RCrkEtIZ7IKcAb9gD+QL8K/wLREjeFm6BSCmFd4evIEKSo8IHiBleeHgCEIAABCAAAQhAAALwOKDuhjnnoeGUUt0LqKp1Jxg1qgozwweuz31PlPUe0wAAAABJRU5ErkJggg==); cursor: pointer; cursor: hand; text-align:center; padding: 10px 0px 0px 0px;" title="Предыдущий новый"></div>'
						+ '<div id="mine" style="height:20px; width:32px; color:#516f8d; text-shadow: 1px 1px 1px #fff; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wLFQ8mFGtn8CwAAABvSURBVFjD7dXBCcAwCAVQlW7YSZwkk2QoR3ACe+2hFFoFEf4/5eYjKnJEhJlRR9ydhJozG6Brk67dA7gXziDmtmDp+fj+Gu5ew6NiBjK/IBXFM4MoFcUziHlb8NbrP3PAOEYAAAAAAAAAAAAA3YAL+icySuBzjtIAAAAASUVORK5CYII=); cursor: pointer; cursor: hand; text-align:center; padding: 12px 0px 0px 0px;" title="Следующий мой"></div>'
						+ '<div id="down" style="height:30px; width:32px; color:#516f8d; text-shadow: 1px 1px 1px #fff; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wLFQ8eEpWb6eIAAACcSURBVFjD7daxDcQgDIXh51N6RmAH9p+BHd4InsBpDomcolyABBq7AyT+r7SYmZFEzhkzJ6UEVYUUQIxxKoAkVBVbfbFiPlg8DnCAAxzgAAc4wAEOWA7YynYKACGEKdGygZOEmBlIGoDXIXX4exYxs3pXfwVyFi5vB8DTkKvwJWAUcid8C9AKaQk3Af5BesJdgF/ISHgIcAKR3j92XXaDTQgDntwAAAAASUVORK5CYII=); cursor: pointer; cursor: hand; text-align:center; padding: 2px 0px 0px 0px;" title="Следующий новый"></div>'
			}), document.body.firstChild);
	}
});
