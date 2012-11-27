// URL creator helper class
function URL(base)
{
	this.base = base!=undefined ? base : '';
	this.parms = [];
	this._hash = '';
};
URL.prototype=
{
		setBase: function(newBase){this.base=newBase;return this;},
		addBase: function(part){this.base+=part;return this;},
		add: function(name,value){this.parms.push({name:name,value:value});return this;},
		hash: function(hash){this._hash=hash;return this;},
		toString: function()
		{
			return this.base+this.getParms()+(this._hash!='' ? '#'+this._hash : '');
		},
		getParms: function()
		{
			var parms='';
			var i;
			for(i=0;i<this.parms.length;++i) with(this.parms[i])
				parms+=(parms==''?'?':'&')+encodeURIComponent(name)+'='+encodeURIComponent(value);
			return parms;
		}
};
URL.make=function(base){return new URL(base);};