
var DelayedEventHandler = function() {
	this.timer = null;
	this.listeners = [];
	this.addListener = function(listener) {
		this.listeners.push(listener);
	};
	this.trigger = function () {
		var me = this;
		if (this.timer != null) {
			window.clearTimeout(this.timer);
		}
		this.timer = window.setTimeout(function(){me.notify(); me.timer = null;}, 50);
	};
	this.notify = function(){
		this.listeners.forEach(function (l) {
			try {
				l();
			} catch (e) {
				if (console) console.log(e);
			}
		});
	};
};

d3.DelayedEventHandler = DelayedEventHandler;