COMPONENT('snackbar', 'timeout:4000;button:OK', function(self, config) {

	var cls = 'ui-snackbar';
	var cls2 = '.' + cls;
	var show = true;
	var callback;
	var delay;

	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass(cls + ' hidden');
		self.append('<div><span class="{0}-dismiss"></span><span class="{0}-icon"></span><div class="{0}-body"></div></div>'.format(cls));
		self.event('click', cls2 + '-dismiss', function() {
			self.hide();
			callback && callback();
		});
	};

	self.hide = function() {
		clearTimeout2(self.ID);
		self.rclass(cls + '-visible');
		if (delay) {
			clearTimeout(delay);
			self.aclass('hidden');
			delay = null;
		} else {
			delay = setTimeout(function() {
				delay = null;
				self.aclass('hidden');
			}, 1000);
		}
		show = true;
	};

	self.waiting = function(message, button, close) {
		self.show(message, button, close, 'fa-spinner fa-pulse');
	};

	self.success = function(message, button, close) {
		self.show(message, button, close, 'fa-check-circle');
	};

	self.warning = function(message, button, close) {
		self.show(message, button, close, 'fa-times-circle');
	};

	self.show = function(message, button, close, icon) {

		if (typeof(button) === 'function') {
			close = button;
			button = null;
		}

		callback = close;

		self.find(cls2 + '-icon').html('<i class="fa {0}"></i>'.format(icon || 'fa-info-circle'));
		self.find(cls2 + '-body').html(message).attr('title', message);
		self.find(cls2 + '-dismiss').html(button || config.button);

		if (show) {
			self.rclass('hidden');
			setTimeout(function() {
				self.aclass(cls + '-visible');
			}, 50);
		}

		setTimeout2(self.ID, self.hide, config.timeout + 50);
		show = false;
	};
});