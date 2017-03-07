/* global define */
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals
		root.gwa = typeof root.gwa === 'undefined' ? {} : root.gwa;
		root.gwa.ShareLinks = factory(jQuery);
	}
}(this, function($) {

	function getDocumentLanguage() {
		var lang = $('html').attr('lang');
		return lang ? lang : '';
	}

	function getContentData(jq) {
		return jq.attr('data-content') ? jq.attr('data-content') : '';
	}

	function doOpen(url, name, opts) {
		if (instance.opener) {
			instance.opener(url, name, opts);
			return;
		}
		window.open(url, name, opts);
	}

	function isMobile() {
		return /Mobi/.test(navigator.userAgent);
	}

	function getTwitterContent(jq) {
		var permalink = jq.attr('href'),
			content = getContentData(jq);

		return content ? encodeURIComponent(content + ' ' + permalink) : permalink;
	}

	var instance = {
		initFacebook: function(jq) {
			jq.on('click', function(ev) {
				var permalink = $(this).attr('href');

				ev.preventDefault();
				doOpen('https://www.facebook.com/sharer.php?u=' + permalink, 'facebook', 'toolbar=no,width=700,height=400');
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
			var permalink = jq.attr('href');
			jq.attr('href', 'whatsapp://send?text=' + permalink).attr('data-action', 'share/whatsapp/share');
		},

		initWeibo: function(jq) {
			jq.on('click', function(ev) {
				var permalink = $(this).attr('href'),
					lang = getDocumentLanguage(),
					title = encodeURIComponent(getContentData($(this)));

				ev.preventDefault();
				doOpen('http://service.weibo.com/share/share.php?url=' + permalink + '&appkey=&title=' + title + '&pic=&ralateUid=&language=' + lang, 'weibo', 'toolbar=no,width=700,height=400');
			});
		},

		opener: null
	};

	return instance;

}));
