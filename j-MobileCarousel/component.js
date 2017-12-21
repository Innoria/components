COMPONENT('mobilecarousel', 'count:1;selector:.col-sm-4;margin:15;snapping:true;animate:5000', function(self, config) {

	var width = 0;
	var count = 0;
	var index = 0;
	var increment = 1;
	var skip = false;
	var move = false;
	var anim;
	var container;

	self.readonly();
	self.blind();

	self.make = function() {
		self.element.wrapInner('<div class="ui-mobilecarousel-container"><div class="ui-mobilecarousel-body"></div></div>');
		$(window).on('resize', self.resize);
		self.resize();
		CSS('.ui-mobilecarousel .ui-mobilecarousel-{0} {1}{margin:0 0 0 {2}px;padding:0;float:left;vertical-align:top;display:inline-block}.ui-mobilecarousel .ui-mobilecarousel-{0} {1}:first-child{margin-left:0}'.format(self.id, config.selector, config.margin));
		container = self.find('.ui-mobilecarousel-container').aclass('ui-mobilecarousel-' + self.id);
		config.snapping && container.on('scroll', function() {
			!skip && setTimeout2(self.id, self.snap, 200);
		}).on('touchmove', function() {
			clearTimeout(anim);
		});
		config.animate && (anim = setTimeout(self.animate, config.animate));
	};

	self.animate = function() {

		if (!count || move)
			return;

		index += increment;

		if (index === count - 1)
			increment = -1;
		else if (index === 0)
			increment = 1;

		skip = true;
		anim = true;
		container.animate({ scrollLeft: index * (width + config.margin) }, 200);
		setTimeout(function() {
			skip = false;
			anim = false;
		}, 400);

		anim = setTimeout(self.animate, 2000);
	};

	self.snap = function() {
		var x = container.prop('scrollLeft');
		var off = Math.round(x / width);
		skip = true;
		move = true;
		container.animate({ scrollLeft: off * (width + config.margin) }, 200);
		setTimeout(function() {
			skip = false;
		}, 500);
	};

	self.resize = function() {

		if (WIDTH() !== 'xs') {
			count = 0;
			width = 0;
			self.rclass('ui-mobilecarousel');
			self.css('height', '');
			self.find('.ui-mobilecarousel-body').css('width', '');
			self.find(config.selector).css('width', '');
			return;
		}

		self.aclass('ui-mobilecarousel');

		var sum = 0;
		var height = 0;

		width = self.width() / config.count;
		count = 0;

		self.find(config.selector).each(function(index) {
			var el = $(this);
			sum += width + (index ? 15 : 0);
			height = Math.max(el.height(), height);
			el.css('width', width);
			count++;
		});

		self.css('height', height + 5);
		self.find('.ui-carousel-body').css('width', sum);
	};
});