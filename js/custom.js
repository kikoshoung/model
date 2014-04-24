$(function() {

	var xhr = new XMLHttpRequest();
	var data_link = null;
	var menu_btn = $('.js_menu_link');
	var menu_cont = $('#menu_cont');

	function get_link_value(el) {
		data_link = $(el).attr("data-link");
		return data_link;

	};

	menu_cont.load('page/base.html .js_ajax_page');
	
	menu_btn.click(function() {
		link_value = get_link_value(this);
		console.log(link_value);
		//console.log(xhr);
		menu_btn.removeClass('activate');
		$(this).addClass('activate');

		menu_cont.load('page/' + link_value + '.html .js_ajax_page',
			function(responseTxt,statusTxt,xhr){
			if (statusTxt=="success") {
				console.log('加载成功');
				return;
			};
			if (statusTxt=="error") {
				//console.log('Error: '+xhr.status+': '+xhr.statusText);
				alert("加载错误")
			};
		});
		
	});

	//登录
	function login_state () {
		$('.js_login_state').toggleClass("logined");
	}
	$('.js_login_btn').click(function() {
		login_state();
	});

	//显示分享
	$('.js_show_share_btn').click(function() {
		$(this).parent().toggleClass("show");
	});

});