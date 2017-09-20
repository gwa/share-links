(function(root, factory) {
	// Browser globals
	root.gwa = typeof root.gwa === 'undefined' ? {} : root.gwa;
	root.gwa.ShareLinks = factory(jQuery);
}(this, function($) {

	/**
	 * @return {String}
	 */
	function getDocumentLanguage() {
		var lang = $('html').attr('lang');
		return lang ? lang : '';
	}

	/**
	 * @param {jQuery} jq
	 * @return {String}
	 */
	function getTitle(jq) {
		// If data-content is set, use that.
		var cd = getTitle(jq);
		if (cd) {
			return cd;
		}

		// If using a custom URL, we don't know the title.
		if (hasHref(jq)) {
			return '';
		}
	}

	/**
	 * @param {jQuery} jq
	 * @return {String}
	 */
	function getTitle(jq) {
		var title;

		if (jq.attr('data-content')) {
			return jq.attr('data-content');
		}

		// If using a custom URL, we don't know the title.
		if (hasHref(jq)) {
			return '';
		}

		// Use og title, if set
		title = getDocumentOgTitle();
		if (title) {
			return title;
		}

		// Default: document title
		return getDocumentTitle();
	}

	/**
	 * @return {String}
	 */
	function getDocumentOgTitle() {
		var ogtitle = '';

		$('head > meta').each(function() {
			if ($(this).attr('name') === 'og:title') {
				ogtitle = $(this).attr('content');
			}
		});

		return ogtitle;
	}

	/**
	 * @return {String}
	 */
	function getDocumentTitle() {
		return $('head > title').text();
	}

	/**
	 * @param {jQuery} jq
	 * @return {String}
	 */
	function getLocation(jq) {
		if (hasHref(jq)) {
			return jq.attr('href');
		}

		return getWindow().location.href;
	}

	/**
	 * Combines title and link.
	 *
	 * @param {jQuery} jq
	 * @return {String}
	 */
	function getTwitterContent(jq) {
		var permalink = getLocation(jq),
			content = getTitle(jq);

		return content ? encodeURIComponent(content + ' ' + permalink) : permalink;
	}

	/**
	 * @param {jQuery} jq
	 * @return {Boolean}
	 */
	function hasHref(jq) {
		var href = jq.attr('href');
		return href && href !== '#';
	}

	function getWindow() {
		if (instance.window) {
			return instance.window;
		}
		return window;
	}

	function doOpen(url, name, opts) {
		if (instance.opener) {
			instance.opener(url, name, opts);
			return;
		}
		window.open(url, name, opts);
	}

	/**
	 * @return {Boolean}
	 */
	function isMobile() {
		return /Mobi/.test(navigator.userAgent);
	}

	var instance = {

		/**
		 * Init multiple links.
		 *
		 * Share links must have data-type attribute set.
		 *
		 * @method initMultiple
		 * @param {jQuery} jq
		 */
		initMultiple: function(jq) {
			jq.each(function() {
				instance.init($(this));
			});
		},

		/**
		 * @method init
		 * @param {jQuery} jq
		 * @param {String} type 'facebook', 'twitter', etc. See init methods.
		 */
		init: function(jq, type) {
			var method;

			// data-type attribute takes precedence.
			if (jq.attr('data-type')) {
				type = jq.attr('data-type');
			}

			if (!type) {
				return;
			}

			method = 'init' + type.charAt(0).toUpperCase() + type.slice(1);

			if (typeof instance[method] === 'function') {
				instance[method](jq);
			}
		},

		initFacebook: function(jq) {
			jq.on('click', function(ev) {
				ev.preventDefault();
				doOpen('https://www.facebook.com/sharer.php?u=' + getLocation($(this)), 'facebook', 'toolbar=no,width=700,height=400');
			});
		},

		initTwitter: function(jq) {
			var fullcontent = getTwitterContent(jq);

			if (isMobile()) {
				jq.attr('href', 'twitter://post?message=' + fullcontent);
				return;
			}

			jq.on('click', function(ev) {
				ev.preventDefault();
				doOpen('https://twitter.com/intent/tweet?text=' + getTwitterContent($(this)), 'twitter', 'toolbar=no,width=700,height=400');
			});
		},

		initWhatsapp: function(jq) {
			jq.attr('href', 'whatsapp://send?text=' + getLocation(jq)).attr('data-action', 'share/whatsapp/share');
		},

		initWeibo: function(jq) {
			jq.on('click', function(ev) {
				var permalink = getLocation($(this)),
					lang = getDocumentLanguage(),
					title = encodeURIComponent(getTitle($(this)));

				ev.preventDefault();
				doOpen('http://service.weibo.com/share/share.php?url=' + permalink + '&appkey=&title=' + title + '&pic=&ralateUid=&language=' + lang, 'weibo', 'toolbar=no,width=700,height=400');
			});
		},

		initXing: function(jq) {
			jq.on('click', function(ev) {
				ev.preventDefault();
				doOpen('https://www.xing.com/spi/shares/new?url=' + getLocation($(this)), 'xing', 'toolbar=no,width=700,height=400');
			});
		},

		initLinkedin: function(jq) {
			jq.on('click', function(ev) {
				ev.preventDefault();
				doOpen('https://www.linkedin.com/shareArticle?mini=true&url=' + getLocation($(this)), 'linkedin', 'toolbar=no,width=700,height=400');
			});
		},

		initMail: function(jq) {
			jq.attr(
				'href',
				'mailto:?subject=' + encodeURIComponent(getTitle($(this))) + '&body=' + encodeURIComponent(getLocation(jq))
			);
		},

		initPrint: function(jq) {
			jq.on('click', function(ev) {
				ev.preventDefault();
				getWindow().print();
			});
		},

		window: null,

		opener: null
	};

	return instance;

}));
