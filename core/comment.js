/**
 * 
 */

var Comment=function(container)
{
	this.container=container;
	container.get(0).comment=this;
	this.id=this.container.attr('id');
	this.isNew=this.container.hasClass('new');
	this.isMine=this.container.hasClass('mine');
	this.userId=parseInt(/u(\d+)/.exec(this.container.attr('class'))[1],10);
	this.indent=parseInt(/indent_(\d+)/.exec(this.container.attr('class'))[1],10);
	this.userName=$j('.c_user',this.container).text();
};
Comment.prototype=new Item
({
	contentClass: '.c_body',
	footerClass: '.c_footer',
	getAuthor: function(){return new User(this.userName,this.userId);},
	getClass: function(){return 'comment';}
});

d3.Comment=Comment;