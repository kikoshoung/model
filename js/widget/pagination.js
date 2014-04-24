/**
 * [Widget Pagination Usage]
	
	new Pagination({
		renderTo: $('#xxx'), //分页组件的容器
		template: $('#tmpl-xxx').html(), //分页组件的结构模板
		data: {...}, //一次分页请求返回的数据，包含 current_page 和 items 等，详细结构见下。
		showNum: 20, //可选，默认为5，一次给用户这么多页的选择
		onclick: function(){} //分页组件可点按钮的回调函数
	});

	data: {
		current_page: 3,
		items: Array[5], // json 数组
		page_size: 5,
		total_page: 18
	}
 */

(function(){
	var defaults = {
		showNum: 5
	};

	function Pagination(options){
		this.options = $.extend({}, defaults, options);
		this.init();
	}

	Pagination.prototype = {
		init: function(){
			this.$el = this.options.renderTo;
			this.render();
			this.bindEvents();
		},
		render: function(){
			var options = this.options,
				renderData = this.renderData = this.getRenderData();

			this.$el.html(template.compile(options.tmpl)(renderData));
		},
		rerender: function(page){
			this.setCurPage(page);
			this.render();
		},
		setCurPage: function(page){
			this.options.data.current_page = page;
		},
		getRenderData: function(type){
			var	options = this.options,
				data = options.data,
				curPage = data.current_page,
				totalPage = data.total_page,
				showNum = options.showNum,
				lastRangeStartNum = totalPage - showNum + 1,
				curRangeEndNum = curPage + showNum - 1,
				range = null,
				ret = {
					curPage: curPage,
					prevGroupStartPage: 1,
					nextGroupStartPage: 1,
					range: range,
					prevShow: false,
					nextShow: false,
					lov: false,
					rov: false
				};

			range = ret.range = this.getRange(curPage, totalPage, showNum, 'cur');
			ret.prevGroupStartPage = this.getRange(curPage, totalPage, showNum, 'prev')[0];
			ret.nextGroupStartPage = this.getRange(curPage, totalPage, showNum, 'next')[0];

			if(range[0] > 1){
				ret.lov = true;
			}
			if(range[1] < totalPage){
				ret.rov = true;
			}

			if(curPage > 1){ 
				ret.prevShow = true;
			} 
			if(curPage < totalPage){
				ret.nextShow = true;
			}

			return ret;
		},
		getRange: function(curPage, totalPage, showNum, type){
			var ret = [],
				start;

			if(curPage < 1) curPage = 1;
			if(curPage > totalPage) curPage = totalPage;

			switch(type){
				case 'cur':
					break;
				case 'prev':
					curPage = curPage - showNum >= 1 ? curPage - showNum : 1;
					break;
				case 'next':
					curPage = curPage + showNum <= totalPage ? curPage + showNum : totalPage;
					break;
			}

			if(totalPage <= showNum){
				ret = [1, totalPage];
			} else {
				start = Math.floor((curPage - 1) / showNum) * showNum;

				ret[0] = start + 1;
				ret[1] = start + showNum <= totalPage ? start + showNum : totalPage;
			}

			return ret;
		},
		bindEvents: function(){
			var self = this,
				elem = this.$el;

			elem.on('click', 'li', function(e){
				self.rerenderHandler(e);
			});
		},
		rerenderHandler: function(e){
			var $target = $(e.currentTarget),
				nextPage = $target.data('page');

			if(!$target.hasClass('indicator active') && !$target.hasClass('disabled')){
				this.rerender(nextPage);
				this.onClick(nextPage);
			}
		},
		onClick: function(nextPage){
			var onclick = this.options.onclick;

			onclick && onclick(nextPage);
		}
	}

	App.Pagination = Pagination;
})();