/**
 * [Widget Pagination Usage]
	
	new Tip({
		target: $('xxx'), // tip 气泡 focus 的目标元素
		triggeredBy: $('xxx'),
		theme: 'light' // light, dark
	});
 */

(function(){
	var defaults = {
			pos: 'top', // [top, right, bottom, right],
			theme: ''
		},
		tmpl = '<div class="tooltip">\
					<div class="tooltip-inner">21221</div>\
					<div class="tooltip-arrow"></div>\
				</div>',
		$body = $('body'),
		$document = $(document),
		curTip = null;

	$document.on('click', function(e){
		if(!curTip || $(e.target)[0] == curTip.options.triggeredBy[0]) return;
		clearTooltip();
	});

	function clearTooltip(){
		// $('.tooltip').remove();
	}

	function Tooltip(options){
		this.options = $.extend({}, defaults, options);
		this.init();
	}

	Tooltip.prototype = {
		init: function(){
			curTip = this;
			this.clearTooltip();
			this.$el = $(tmpl);
			this.$el.addClass(this.options.theme);
			this.setAttr();
			this.moveToTarget();
		},
		setAttr: function(){
			var options = this.options,
				pos	= options.pos,
				tooltipText = options.target.data('tooltip');

				console.log(tooltipText)

			this.$el.addClass(pos).find('.tooltip-inner').html(tooltipText);
			$body.append(this.$el);
			options.target.focus();
		},
		moveToTarget: function(){
			var options = this.options,
				$target = options.target,
				$el = this.$el,
				pos = options.pos,
				top, left;

			switch(pos){
				case 'top':
					top = $target.offset().top - $el.outerHeight();
					left = $target.offset().left + ($target.outerWidth() - $el.outerWidth()) / 2;
					break;
				case 'right':
					top = $target.offset().top + ($target.outerHeight() - $el.outerHeight()) / 2;
					left = $target.offset().left + $target.outerWidth();
					break;
				case 'bottom':
					top = $target.offset().top + $target.outerHeight();
					left = $target.offset().left + ($target.outerWidth() - $el.outerWidth()) / 2;
					break;
				case 'left':
					top = $target.offset().top + ($target.outerHeight() - $el.outerHeight()) / 2;
					left = $target.offset().left - $el.outerWidth();
					break;
			}
			this.$el.css({
				top: top,
				left: left
			}).show();
		},
		clearTooltip: function(){
			clearTooltip();
		}
	}

	App.Tooltip = Tooltip;
})();