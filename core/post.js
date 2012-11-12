
var Post=function(container)
{
	this.container=container;
	this.container.get(0).post=this;
	this.info=$j('.dd',this.container);
	var a=$j('a[href^="/comments/"]',this.info);
	this.id=parseInt(this._idMask.exec(a.length<1 ? document.location.href : a.first().attr('href'))[1],10);
	this.userName = $j('a[href^="/user/"]',this.info).text();
	this.isNew = $j('a[href*="#new"]',this.info).length;
	this.isMine = this.userName==d3.user.name;
};

Post.prototype=new Item
({
	contentClass: '.dt',
	footerClass: '.dd',
	getClass: function(){return 'post';},
	_idMask: /(\d+)\/?(#.*)?$/,
	
	switchBody: function()
	{
		with(this.container.style) if(display=='') display='none'; else display='';
		return false;
	}
});

d3.Post=Post;
