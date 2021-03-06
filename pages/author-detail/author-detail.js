// pages/author-detail/author-detail.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  currentPage:0,
	  totalPages:0,
	  totalElements:0,
	  pageSize:10,
	  id:null,
	authorInfo:{},
	bookInfo:{}
  },
  /**
   * @description 监听点击书籍详情事件；
   * */
   onBookDetail:function(e){
  	   // 组件传参过来的id;
  	   let id=e.detail.id;
  	   wx.navigateTo({
  	     url: '../book-detail/book-detail?id='+id
  	   })
  	   
   },
  /**
   * @description 获取作者的所有书籍
   * */
 
  getAuthorBooks:function(author,page=0,size=10){
  	   let that=this;
  	   let reqData={
  	   		 page,
  			 size,
  			 author
  	   }
  	   api._fetch({
  	       url: '/api/author/book.list',
  	       data:reqData,
  	       method:'get',
  	   	   contentType:1
  	   }).then(function (res) {
  		   let bookInfo=res.data;
		   let totalPages=res.data.totalPages;
		   let totalElements=res.data.totalElements;
		   that.setData({
		   	bookInfo,
		   	totalElements,
		   	totalPages
		   });
		   wx.hideLoading();
  		   
  	   }).catch(function (error) {
  	       console.log(error);
  	   });
  },
  /**
   * @description  获取作者详情
   * */
   getAuthorDetail:function(id){
	   let that=this;
	   let reqData={
	   		 page:0,
			 size:10,
			 id
	   }
	   api._fetch({
	       url: '/api/author/detail',
	       data:reqData,
	       method:'get',
	   	   contentType:1
	   }).then(function (res) {
		   let authorInfo=res.data;
		   that.setData({
			   authorInfo
		   });
	   		
	       
	   }).catch(function (error) {
	       console.log(error);
	   });
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	
	let id=options.id;
	this.setData({
		id
	});
	this.getAuthorDetail(id);
	this.getAuthorBooks(id);
	
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
	let self = this;
	 
	 // 显示加载图标
	 
	
	let totalElements=this.data.totalElements;
	let page=this.data.currentPage;
	let pageSize=this.data.pageSize;
	let id=this.data.id;
	if(pageSize<totalElements){
		// page++;
		pageSize+=10;
		self.setData({
			currentPage:page,
			pageSize
		});
		wx.showLoading({
			
		  title: '更多加载中',
			
		})
		this.getAuthorBooks(id,page,pageSize);
	}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})