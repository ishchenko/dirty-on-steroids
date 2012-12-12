// Cross-browser cookie storage

d3.storage = 
{
	get: function(key, defaultValue)
	{
		var value = $j.cookie(key);
		return value === null ? defaultValue : value;
	},
	set: function(key, value)
	{
		if (!key || key == undefined) {
			if (console) console.log("Trying to save invalid cookie! ", value);
			return;
		}
		return $j.cookie(key, value, {domain: '.d3.ru', path:'/', expires: 365});
	},
	remove: function(key)
	{
		return this.set(key, null);
	}
};