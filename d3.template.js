//
// ==UserScript==
// @name			Dirty Modular SP
// @author			crimaniak
// @namespace		http://dirty.ru/
// @description		Dirty Modular Service Pack. Core manage extensions settings and provide jQuery service.
// @include			http://dirty.ru/*
// @include			http://www.dirty.ru/*
// @include			http://music.dirty.ru/*
// @run-at			document-end
// @version			0.0.1
// ==/UserScript==

// @jQuery@

var $j=jQuery.noConflict();	// $j closure used for jQuery to avoid conflict with mootools $()

var d3=
{
	modules: [],
	user:
	{
		id: null,
		name: null
	},
	/// Usualy you don't need this function with jQuery 
	browser: function()
	{
		var string = navigator.userAgent.toLowerCase();
		var sign = {opera:'opera/',firefox:'firefox/',chrome:'chrome/',safari:'safari/',ie:'msie '};

		for( var i in sign)
			if(string.indexOf(sign[i])>-1)
				return {name:i,ver:string.split(sign[i])[1].split(' ')[0]};

		return {name:'unknown',ver:'unknown'};
	},

	/// Set style properties
	setStyle: function(element,style)
	{
		for(var i in style)
			element.style[i]=style[i];
	},

	/**
	 * Function to create new element and set attributes, style and innerHTML property
	 * @param tagName string tag name
	 * @param parms object with possible keys: style, attributes, innerHTML
	 * @returns newly created element
	 */
	newElement: function(tagName,parms)
	{
		var e=document.createElement(tagName);
		
		if(parms.style!==undefined) this.setStyle(e,parms.style);
		if(parms.attributes!==undefined) for(var i in parms.attributes)	e.setAttribute(i,parms.attributes[i]);	
		if(parms.innerHTML!==undefined)	e.innerHTML=parms.innerHTML;
		
		return e;
	},

	/// newElement('div',...) shortcut
	newDiv: function(parms) { return this.newElement('div', parms); },
	
	/// Get element(s) of page
	get:
	{
		logoutLink: function(){return $j('#js-header_logout_link');},
		leftNavigation: function(){return $j('.left_col_nav');}
	},
	/// JSON helper
	json:
	{
		encode: function(value) {return (JSON.stringify != undefined ? JSON.stringify:JSON.encode)(value);},
		decode: function(value)	{return (JSON.parse != undefined ? JSON.parse:JSON.decode)(value);}		
	},
	/// Add and run d3 module
	addModule: function(module)
	{
		this.modules.push(module);
		this.config.addModule(module);
		if(module.config == undefined || module.config.active == undefined || module.config.active.value)
			module.run();
	},
	// Config core module
	config:
	{
		type: "Настройки",
		author: 'crimaniak',
		name: 'config core module',
		data: {},	/// config values
		controls: {}, /// Controls sorted by sheets

		/// Add link to config box
		run: function()
		{
			d3.get.leftNavigation().append('<li><a href="#" id="configLink">Настройки</a></li>');
			$j('#configLink').click(function(event){d3.config.getBox().show();return false;});
		},
		/// Init and return config box
		getBox: function()
		{
			if(this.box==undefined)
				this.box=this.drawBox();
			return this.box;
		},
		/// Calculate HTML-friendly id from module and control names
		controlName: function(module,control){return 'A'+Math.abs(crc32(module))+'_'+control;},
		/// Draw config box
		drawBox: function()
		{
			var box=$j(d3.newElement('div'
				,{style:{position:'fixed',top:($j(window).height()/2-150)+'px',left:($j(window).width()/2-300)+'px',width:'600px',height:'300px',backgroundColor: '#FFFFCC',border:'1px grey solid',zIndex: '1000',padding:'0 1ex'}
				 ,attributes:{id:'configBox'}
				 ,innerHTML:'Настройки сервис-пака <a id="configCloser" style="position:absolute;right:1ex;top:0px;cursor:pointer">закрыть</a><div id="configTabs"></div>'}));
			$j('body').append(box);
			$j('#configCloser').click(function(event){box.hide();d3.config.save();return false;});
			
			this.tabs=new TabSheets($j('#configTabs'));
			for(var sheetName in this.controls)
				this.tabs.addSheet(sheetName, this.drawSheet(this.controls[sheetName]));
			
			return box;
		},
		/// Draw one control sheet
		drawSheet: function(data)
		{
			var html='<table><tbody><col width="24"></col>';
			for(var id in data)
				html+=data[id].draw();
			return html+'</tbody></table>';
		},
		/// Control constructor
		Control: function(module,name)
		{
			this.module=module;
			this.name=name;
			
			this.setValue=function(newValue) {this.module.config[this.name].value=this.value=newValue;};
			this.getValue=function() {return $j('#'+this.id).val();};
			this.update=function() {this.setValue(d3.config.data[this.id]=this.getValue());};
			
			// collect properties from config data
			for(var i in module.config[name])
				this[i]=module.config[name][i];
			// collect methods from control prototype
			for(i in d3.config[this.type])
				this[i]=d3.config[this.type][i];
			// set id
			this.id=d3.config.controlName(module.name, name);
			// set default caption
			if(this.caption == undefined)
				this.caption = name=='active' ? module.name : name;
			// get saved value if exists
			if(d3.config.data[this.id]!=undefined)
				this.setValue(d3.config.data[this.id]);
		},
		checkbox:
		{
			draw: function()
			{
				return '<tr><td><input type="checkbox" id="'+this.id+'" name="'+this.id+'"'+(this.value ? ' checked' : '')+'></td><td><label for="'+this.id+'">'+this.caption+'</label></td></tr>';
			},

			getValue: function() {return $j('#'+this.id).attr('checked') ? true : false;}
		},
		text:
		{
			draw: function()
			{
				return '<tr><td colspan="2"><label>'+this.caption+'<input type="text" id="'+this.id+'" name="'+this.id+'" value="'+this.value+'"></label></td></tr>';
			}
		},
		radio:
		{
			draw: function()
			{
				if(this.columns == undefined)
				{
					this.columns=0;
					for(var i in this.options) this.columns++; // Opera doesn't support Object.keys
					this.columns=Math.floor(Math.sqrt(this.columns));
				}
				var html='<tr><td colspan="2">'+this.caption+'</td></tr><tr><td></td><td><table><tbody><tr>';
				var counter=1;
				for(var i in this.options)
				{
					if((++counter % this.columns) == 0 && counter>2) html+='</tr><tr>';
					html+='<td><label><input type="radio" name="'+this.id+'" value="'+this.options[i]+'"'+(this.options[i]==this.value?' checked':'')+'> '+i+'</label></td>';
				}
				return html+'</tr></tbody></table></td></tr>';
			},

			getValue: function() {return $j('input:radio[name='+this.id+']:checked').val();}
		},
		select:
		{
			draw: function()
			{
				var html='<tr><td colspan="2">'+this.caption+' <select name="'+this.id+'" id="'+this.id+'">';
				for(var i in this.options)
				{
					html+='<option value="'+this.options[i]+'"'+(this.options[i]==this.value?' selected':'')+'> '+i+'</option>';
				}
				return html+'</select></td></tr>';
			},
			
			getValue: function() {return $j('select#'+this.id+' option:selected').val();}
		},
		/// Get new values from controls and save config to storage
		save: function()
		{
			for(var sheet in this.controls)
				for(var id in this.controls[sheet])
					this.controls[sheet][id].update();

			localStorage.setItem('dirtySpm',d3.json.encode(this.data));
		},
		/// Load config from storage
		load: function()
		{
			var saved=localStorage.getItem('dirtySpm');
			if(saved !== null)
				this.data=d3.json.decode(saved);
		},
		/// Add module config data, add controls and load saved values
		addModule: function(module)
		{
			// if no config data then return
			if(module.config == undefined) return;
			
			// create this type sheet if not exists 
			if(this.controls[module.type]== undefined)
				this.controls[module.type]={};
			
			// create controls
			for(var i in module.config)
			{
				var control=new this.Control(module,i);
				this.controls[module.type][control.id]=control;
			}
		}
	},
	
	initCore: function()
	{
		this.collectInfo();
		this.config.load();
		this.addModule(d3.config);
	},
	
	collectInfo: function()
	{
		var e=$j('.header_tagline_inner>a[href^="http://dirty.ru/users/"]');
		if(e.length)
		{
			this.user.id=Math.floor(e.attr('href').replace(/[^\d]+/,''));
			this.user.name=e.get(0).firstChild.data;
		}
	}
	
	
};

d3.initCore();

// @modules@

