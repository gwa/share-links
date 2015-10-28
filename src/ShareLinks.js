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

	var instance = {
		initFacebook: function(jq) {
			jq.on('click', function(ev) {
				var permalink = $(this).attr('href');
				ev.preventDefault();
				instance.opener('https://www.facebook.com/sharer.php?u=' + permalink, 'facebook', 'toolbar=no,width=700,height=400');
			});
		},

		initTwitter: function(jq) {
			jq.on('click', function(ev) {
				var permalink = $(this).attr('href'),
				content = getContentData($(this)),
				fullcontent = content ? encodeURIComponent(content + ' ' + permalink) : permalink;

				ev.preventDefault();
				instance.opener('https://www.twitter.com/home?status=' + fullcontent, 'twitter', 'toolbar=no,width=700,height=400');
			});
		},

		opener: window.open
	};

	return instance;

}));
