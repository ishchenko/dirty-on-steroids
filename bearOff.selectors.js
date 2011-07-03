
// Селекторы для справки. В случае необходимости проверять и вставлять в d3.get
// jQuery в d3 доступен через замыкание $j

var s={
// comments threshold
advancedThreshold: function(tresh_number){return $('#thres_select_'+tresh_number);}, // kajdyi raz pri izmenenii fil'tra staryi treshhold zamenyaetsya novym, s sootv. ID
advancedThresholdDiv: function(tresh_number){return $('#div_select_'+tresh_number);}, // on lejit v takom dive
standardCommThreshold: function(){return $('#comments-threshold');}, // rodnoi div, v kotorom lejit treshhold (ili div s nim?)
allParentLinks: function(){return $('a.c_parent');}, // vse ssylki na roditel'skii kommentarii
allCommentsDivs: function(){return $('div.comment_inner');}, // vse divy, vnutri kotoryh lejat kommenty
commentVote: function(comment_div){return comment_div.find('strong.vote_result');}, // znachenie golosa za kommentarii.
commentImage: function(comment_div){return comment_div.find('img');}, // dlya proverki, est' li v kommentarii risunok
commentsHolder: function(){return $('js-commentsHolder');}, // v etoi hreni hranyatsya kommentarii
treeLink: function(){return $('tree_link');}, // link "derevom"

divToInsertTreeLinks: function(isPostPage){if (isPostPage) return $('div.comments_header_controls_inner'); else return $('div.inbox_header');}, // kuda vstavlyat' link spiskom/dereom/revers
postSign: function(){return $('comments-threshold');}, // esli chto-to vernet - to my vnutri posta
inboxSign: function(){return $('js-inbox_people_list');}, // esli chto-to vernet - to my vnutri inboksa
mainPageSign: function(){return $('posts-threshold');}, // seichas sovpadaet s standardPostThreshold

// posts threshold
standardPostThreshold: function(){return $('#posts-threshold');}, // rodnoi div, v kotorom lejit treshhold postov (ili div s nim?)
allPostsDivs: function(){return $('#div.post');}, // vse posty na stranice. Zolotye imeyut klass 'post golden ord', obychnye - 'post ordeyu Dostatochno li ukazat' odin klass post?
postVote: function(post_div){return post_div.find('strong.vote_result');}, // znachenie golosa za post, seichas sovpadaet s golosom za kommentarii.
postCommentsCount: function(post_div){return post_div.find('div.dd').find('a').get(2);}, // kolichestvo kommentariev

postVideos: function(post_div){return post_div.find('div.post_video');}, // video v poste
postImages: function(post_div){return post_div.find('img');}, // kartinki v poste
postAudios: function(post_div){return post_div.find('embed');}, // audio v poste

// fil'tr audio/video/posty
divToInsertContentsFilter: function(){return $('div.threshold_other_inner');} // kuda vstavlyat' ssylki
};