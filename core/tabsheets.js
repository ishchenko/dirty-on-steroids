/// Tabsheets widget 
/// @author: Alexey Kulentsov
/// free
var TabSheet=function(name,body,parent)
{
	this.name=name;
	this.body=body;
	this.parent=parent;
	this.tabNode=jQuery('<div class="tbsHeader">'+name+'</div>');
	
	this.tabNode.get(0).object=this;
	this.tabNode.click(function(event){parent.hideAll();this.object.show();});
	this.parent.tabs.append(this.tabNode);
	
	this.node=jQuery('<div class="tbsSheet">'+body+'</div>');
	this.hide();
	this.parent.node.append(this.node);
};
TabSheet.prototype=
{
		display: function(value){this.node.get(0).style.display=value;},
		hide: function(){this.display('none');this.tabNode.removeClass('tbsActive');},
		show: function(){this.display('inline-block');this.tabNode.addClass('tbsActive');}
};

var TabSheets=function(node)
{
	this.node=node;
	this.tabs=jQuery('<div class="tbsTabs"></div>');
	this.node.append(this.tabs);
	
};
TabSheets.prototype=
{
		sheets: [],
		addSheet: function(name,body)
		{
			this.sheets.push(new TabSheet(name,body,this));
			if(this.sheets.length==1)
				this.sheets[0].show();
		},
		hideAll: function(){this.sheets.forEach(function(item){item.hide();});}
};

jQuery('head').append('<style>\
.tbsTabs{float:left;}\
.tbsHeader{padding: 1ex 2ex;border: 1px grey solid;border-right-style: none;margin-bottom: 5px;margin-right: 0;cursor: pointer;width:100px}\
.tbsActive{position: relative;left: 1px;background-color: #FFFFFF;}\
.tbsSheet{background-color: #FFFFFF;border: 1px solid grey;padding: 0 1ex;position: absolute; left: 136px; top:19px; z-index:-1; width:454px;height: 272px; overflow: auto;margin: 0;}\
</style>');
