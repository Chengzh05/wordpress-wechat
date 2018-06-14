//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    posts: null,
    per_page: 10,//每页条数
    page: 1,
    morenimg: app.globalData.defaultimg,
    imgurl:{}
  },
  onLoad: function () {
    this.getpost()
  },
  getpost: function(per_page = null){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })

    var page = that.data.page;
    if(!per_page){
      per_page = that.data.per_page;
    }
    wx.request({
      url: app.globalData.website+"/wp-json/wp/v2/posts?per_page="+per_page+"&page=1",
      success:function (res) {
        if(res.statusCode == 200){
            var data = res.data

            for(var i in data){

              data[i]['date'] = data[i].date.toString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');

            }
            //that.getmedia(214)
            that.setData({
              per_page: per_page,
              total_page: res.header['X-WP-Total'],
              posts: data


            })
            //that.getmedia()
            wx.hideLoading()

        }
      }


    })
  },
  ref: function(e) {
    this.getpost(10)
  },
  lower: function(e) {
    var per_page = this.data.per_page;
    var per_new_page = per_page + 10 ;
    var total_page = this.data.total_page;

    if(per_page == total_page){
      wx.showToast({
        title: '没有更新的文章了',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    if(per_new_page > total_page){
      per_new_page = total_page;
    }
    //console.log(total_page);
    this.getpost(per_new_page)
  },
  showpost: function(e){
    var postid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'show?postid='+postid
    })

  },
  select: function(){
    wx.navigateTo({
      url:'select'
    })
  }
})
