//select.js
//获取应用实例
const app = getApp()

Page({
	data:{
    	morenimg: app.globalData.defaultimg,
		selval: null,
		histy:null
	},
	onLoad: function(){
		var that = this;
		var histy = wx.getStorageSync('histy');
		that.setData({
	    	histy:histy
	    })
	},
	inputselect: function(e) {
		var that = this;
		var selval = e.detail.value;
		that.setData({
	    	selval:selval,
	      	posts: null
	    })

	},
	searchBtn: function(e) {
		var that = this;
		var selval = e.detail.value;

	    that.selbox(selval);
	},
	selbox: function(selval){
		var that = this;
		if(selval){
		    wx.request({
		      url:app.globalData.website+"/wp-json/wp/v2/posts?per_page=100&search="+selval,
		      success:function (res) {
		        if(res.statusCode == 200){
		            var data = res.data

		            for(var i in data){

		              data[i]['date'] = data[i].date.toString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');

		            }
		            var histy = wx.getStorageSync('histy');
					if (!histy){
						histy = [];
					}
					if(histy.indexOf(selval) == -1){
						histy.push(selval)
						wx.setStorageSync('histy', histy);
					}
					
		            that.setData({
		            	histy:histy,
		            	selval:selval,
		              	posts: data
		            })
		        }
		      }

		    })
	    }else{
	    	that.setData({
              posts: null
            })

	    }
	},
  	showpost: function(e){
	    var postid = e.currentTarget.dataset.id;
	    wx.navigateTo({
	      url:'show?postid='+postid
	    })

	},
	histyclk: function(e){
		var that = this;
	    var selval = e.currentTarget.dataset.text;

	    that.selbox(selval);
	},
	clearhisty: function () {
		wx.removeStorageSync('histy');
		this.setData({
        	histy:null
        })
	}


})