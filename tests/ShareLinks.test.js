define(['jquery', 'Gwa.ShareLinks'], function($, ShareLinks) {

	describe("ShareLinks", function() {

		it("has jquery as a dependency", function () {
			expect($).toBeDefined();
		});

		it("exists as an object", function() {
			expect(ShareLinks).toBeDefined();
		});

		it("can init a FB link", function() {
			var result,
				jq = $('<a href="http://www.example.com/">My link</a>');

			ShareLinks.opener = function(url) {
				result = url;
			};

			ShareLinks.initFacebook(jq);
			jq.trigger('click');
			expect(result).toBe('https://www.facebook.com/sharer.php?u=http://www.example.com/');
		});

		it("can init a Twitter link", function() {
			var result,
				jq = $('<a href="http://www.example.com/" data-content="#foo @bar">My link</a>');

			ShareLinks.opener = function(url) {
				result = url;
			};

			ShareLinks.initTwitter(jq);
			jq.trigger('click');
			expect(result).toBe('https://www.twitter.com/home?status=%23foo%20%40bar%20http%3A%2F%2Fwww.example.com%2F');
		});

		it("can init a Whatsapp link", function() {
			var result,
				jq = $('<a href="https://www.whatsapp.com/" class="wa-share">Share on Whatsapp</a>');

			ShareLinks.opener = function(url) {
				result = url;
			};

			ShareLinks.initWhatsapp(jq);
			jq.trigger('click');

			expect(result).toBe('<a href="whatsapp://send?text=https://www.whatsapp.com/" class="wa-share" data-action="share/whatsapp/share">Share on Whatsapp</a>')
		});

	});

});
