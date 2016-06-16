/* global define */
(function( root, factory ) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals
		root.gwa = typeof root.gwa === 'undefined' ? {} : root.gwa;
		root.gwa.ShareLinks = factory(jQuery);
	}
}(this, function($) {

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

	var instance = {
		initFacebook: function(jq) {
			jq.on('click', function(ev) {
				var permalink = $(this).attr('href');
				ev.preventDefault();

				doOpen('https://www.facebook.com/sharer.php?u=' + permalink, 'facebook', 'toolbar=no,width=700,height=400');
			});
		},

		initTwitter: function(jq) {
			jq.on('click', function(ev) {
				var permalink = $(this).attr('href'),
				content = getContentData($(this)),
				fullcontent = content ? encodeURIComponent(content + ' ' + permalink) : permalink;

				ev.preventDefault();
				doOpen('https://www.twitter.com/home?status=' + fullcontent, 'twitter', 'toolbar=no,width=700,height=400');
			});
		},

		initWhatsapp: function(jq) {
			jq.on('click', function(ev) {
				var permalink = $(this).attr('href');

				ev.preventDefault();
				$(this).attr('href', 'whatsapp://send?text=' + permalink).attr('data-action', 'share/whatsapp/share');

				instance.opener($(this).prop('outerHTML'), 'whatsapp');
			});
		},

		opener: null
	};

	return instance;

}));
