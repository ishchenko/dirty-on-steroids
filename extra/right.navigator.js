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
	run: function()
	{
		if(!this.countItems()) return;
		
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
		
		d3.content.onNewComment(function(comment)
		{
			me.countItems();
			me.newPosition();
		});
		
		this.newPosition();
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

	countItems: function()
	{
		var items = d3.get.items();
		this.newItems=[];
		this.mineItems=[];
		// select new and mine items
		for(var i=0;i<items.length;++i)
		{
			if(items[i].isNew) this.newItems.push(items[i]);
			if(items[i].isMine)this.mineItems.push(items[i]);
		}
		return true;
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

			,innerHTML: '<div id="home" style="height:32px; width:32px; color:#ffffff; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFZJREFUeNrs1UEKACAIRNGcK3X/G+idAhdtTUEQmr8N5tEiElVdnWE1R4AAgXHA9rqAO50ykF3PGiispwzU1t+NGDCzwtG378C8WTcQfvoECBCIOwIMAFv1FJ35a4ktAAAAAElFTkSuQmCC); cursor: pointer; cursor: hand; text-align:center; margin-bottom: 10px;" title="В начало страницы"></div>'
						+ '<div id="up" style="height:22px; width:32px; color:#ffffff; text-shadow: 1px 1px 1px #666; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAd1JREFUeNrsl8tLAlEYxeeOMzoZKIM6Ob5oFRQtgloWuQhKiHY9QMg/q32LskUrIahVj02EtWhbGBg+KMz3jGJl58YgFlqjUm7mwGH47lw5P7/vXkHSbDYZnWLhpmYqMz4rqqqqWK1WBfV72zvd4nrYSwMIbEKwO5fLrabT6VCj0VBtNtup1+s9Acgj3r9q+4n2/BGK9NAButeG4GA2mw3X6/UFrElaUB6+FkXxACAxi8XyrLcbegBogBnBswiO1Gq1JdR+mO/QoRwh5MLpdO7KsnzO83xRW+8LgAbz+Xx+HK3eQPA66glY+AX4Dc6wLHssSdKe2+2+MplM1W4d6QbAFgoFGcErOGRbqOdge9tc9agBP3AcdwSIfZfLdQuo+ncQCkDaF4vFoh3Bi4qihFHOw2P04DH9qwbfYRyHHo8n6nA47jGm1o1pdaBUKpkRPFOtViMoQ7Cvw5wHEb2qN4IgRAESw4HN0BtDyuXyaCqV8lcqlTUsbMKT8AjzN6Lf/AW+xJWN+ny+MxKPx3ewMAVPw2KPc+5X9KA+0Y7QH6Jt2DLgnHsVzZLhZQpgZYYnjmWGLAPAADAADAADwAAwAAyAoQO0/pwmk8l/DQ4EAl8BgsHgvwIkEonP54cAAwBnMrFqVlME2wAAAABJRU5ErkJggg==); cursor: pointer; cursor: hand; text-align:center; padding: 10px 0px 0px 0px;" title="Предыдущий новый"></div>'
						+ '<div id="mine" style="height:18px; width:32px; color:#ffffff; text-shadow: 1px 1px 1px #666; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGRJREFUeNpiPHPmDAMtARMDjcEgs8AYDGhlAdxokuwYTEF09uxZNAYxgIUk55BkNMkWIAc98TYxkWE6SfHMRIbpJNkxOFIR1hAnMhpYaJd+RmZhN2rBqAWjFoxaMGrBcLUAIMAA4GcY3Ag0OPkAAAAASUVORK5CYII=); cursor: pointer; cursor: hand; text-align:center; padding: 14px 0px 0px 0px;" title="Следующий мой"></div>'
						+ '<div id="down" style="height:24px; width:32px; color:#ffffff; text-shadow: 1px 1px 1px #666; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcpJREFUeNrslz1Lw1AUhpukH9BAtdQW2krRId0cVBykIN20gij6mxz9CQ46qDiI4OAoOnSKg04OUqSQtJR+WTVpjfb63nIDNRasoCnIPXAI5+Qm75Nzzr0QQVVV4oEVi0WPm5ZKpXpXr53IZrOuAhQKhc8AdsJtEz0jNg7AATgAB+AAHIADcIChAARBGC0AIeR/t8CgHzkCbapZE9Pp9I4sy3kEVfi7S+JmMBi8VhRlW0B/Jfqf0Gq1ljVNWzUMYw5xDO77A2ErEAjoyWTyPBwO7yK+FdiACawdsWazmSmVShsAWUQ8Cff/gnDX5/NVE4lEPhKJ7GNXXSD32BMeMOEUZLzRaCwAZNM0zQziKXiQgf7IJEl6isfjN9Fo9EgUxTOkNNZq+i5iA4hsKPpp6AK5Xq/PAGSt3W6vIFZobhgQiFkQfYD4CSAOkLqDv345YxwVkPpASB+Iv1arKQDZ6nQ6OQYyxtY7D60uylxBuS9R9j2kruAv9hd/B9AP4nHsit7AAmS6XC7nAEIrMgufYP+YBIP1jAFTMWiHiGm5K7T/jqqSYQDsxV72wNsAkLiu60uWZa2HQqF5CLewtU5x/xh+73xmQIt79iHAACkiqgy4kbB+AAAAAElFTkSuQmCC); cursor: pointer; cursor: hand; text-align:center; padding: 8px 0px 0px 0px;" title="Следующий новый"></div>'
			}), document.body.firstChild);
	}
});
