// Chrome storage

d3.storage = 
{
	get: function(key, defaultValue)
	{
		var gettingOption = true;
		var value = defaultValue;
		chrome.storage.local.get(key, function(items) {
			if ( chrome.runtime.lastError != undefined )
			{
				if (console) console.log("Error while getting option: " + key + " error: " + chrome.runtime.lastError );
			}
			else
			{
	    		if (items[key]) 
	    		{
	      			value = items[key];
	      			gettingOption = false;
	      			if (console) console.log("Value received. Key: " + key + " Value: " + value );
	    		}
	    		else
	    		{
	    			if (console) console.log("No return value for key: " + key + " use default" );
	    		}
	    	}
  		});
		
		function doStuff() {
    		if( gettingOption ) 
    		{
    			//we want it to match
		        setTimeout(doStuff, 50);//wait 50 millisecnds then recheck
        		return;
    		}
		}
		doStuff();
		
		return value;
	},
	set: function(key, value)
	{
		if (!key || key == undefined)
		{
			if (console) console.log("Trying to save invalid value! ", value);
			return;
		}
		var object2save = new Object();
		object2save[key] = value;
		chrome.storage.local.set(object2save, function() {
				if ( chrome.runtime.lastError != undefined )
				{
					if (console) console.log("Error while saving option: " + key + " error: " + chrome.runtime.lastError );
				}
				else
				{
    				if (console) console.log("Settings saved ");
    			}
  			});
	},
	remove: function(key)
	{
		return this.set(key, null);
	}
};