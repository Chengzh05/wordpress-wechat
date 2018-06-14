//show.js
//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({
	data:{
	},
	onLoad: function (option) {
        var that = this;
		// body...
		//console.log(option);
		var postid;
		if(option.postid != undefined){
			postid = option.postid;
		}else{
			wx.navigateBack();
			return false;
		}

		wx.request({
      		url:app.globalData.website+"/wp-json/wp/v2/posts/"+postid,
      		success:function (res) {
        		if(res.statusCode == 200){
        			//console.log(res.data)

        			that.setData({
        				post_title: res.data.title.rendered
        			})

        			var article = res.data.content.rendered;
					WxParse.wxParse('article', 'html', article, that,5);
      			}
		    }
    	})



	},
	wxParseTagATap: function(e){
    let link = e.currentTarget.dataset.src
    if (link.indexOf('www.chengzonghua.com')===-1){
    	console.log(1)
    }
    else {
    	console.log(2)
    }
  }


})