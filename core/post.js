
var Post=function(container)
{
	this.container=container;
	this.container.get(0).post=this;
	this.info=$j('.dd',this.container);
	var commentsLink=$j('a[href*="/comments/"]',this.info);
	var execResult = this._idMask.exec(commentsLink.length<1 ? document.location.href : commentsLink.first().attr('href'));
	this.id=execResult?parseInt(execResult[1],10):0;
	this.userName = $j('a[href*="/user/"]',this.info).text();
	this.isNew = $j('a[href*="#new"]',this.info).length || $j(".b-all_new_comments_link" ,this.info).length;
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
