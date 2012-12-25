
var Post=function(container)
{
	this.container=container;
	this.container.get(0).post=this;

	this.id = parseInt(container.attr('id').substr(1), 10);
	this.info=$j('.dd',this.container);
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
