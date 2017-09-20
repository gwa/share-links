(function($, ShareLinks) {

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
			expect(result).toBe('https://twitter.com/intent/tweet?text=%23foo%20%40bar%20http%3A%2F%2Fwww.example.com%2F');
		});

		it("can init a Whatsapp link", function() {
			var result,
				jq = $('<a href="https://www.whatsapp.com/" class="wa-share">Share on Whatsapp</a>');

			ShareLinks.initWhatsapp(jq);

			expect(jq.attr('href')).toBe('whatsapp://send?text=https://www.whatsapp.com/');
			expect(jq.attr('data-action')).toBe('share/whatsapp/share');
		});

		it("can init a Weibo link", function() {
			var result,
				jq = $('<a href="https://www.weibo.com/" data-content="My title" class="wb-share">Share on Weibo</a>');

			ShareLinks.opener = function(url) {
				result = url;
			};

			$('html').attr('lang', 'zh_cn');

			ShareLinks.initWeibo(jq);
			jq.trigger('click');

			expect(result).toBe('http://service.weibo.com/share/share.php?url=https://www.weibo.com/&appkey=&title=My%20title&pic=&ralateUid=&language=zh_cn');
		});

		it("can init a Xing link", function() {
			var result,
				jq = $('<a href="#" class="xi-share">Share on Xing</a>');

			ShareLinks.opener = function(url) {
				result = url;
			};

			ShareLinks.window = {
				location: {
					href: 'http://www.example.com'
				}
			};

			ShareLinks.initXing(jq);
			jq.trigger('click');

			expect(result).toBe('https://www.xing.com/spi/shares/new?url=http://www.example.com');
		});

		it("can init a Linkedin link", function() {
			var result,
				jq = $('<a href="#" class="li-share">Share on LinkedIn</a>');

			ShareLinks.opener = function(url) {
				result = url;
			};

			ShareLinks.window = {
				location: {
					href: 'http://www.example2.com'
				}
			};

			ShareLinks.initLinkedin(jq);
			jq.trigger('click');

			expect(result).toBe('https://www.linkedin.com/shareArticle?mini=true&url=http://www.example2.com');
		});

		it("can init a Mail link", function() {
			var jq = $('<a href="#" class="li-mail">Mail</a>');

			// Add og tag
			$('head').append('<meta name="og:title" content="My og title">');

			ShareLinks.window = {
				location: {
					href: 'http://www.example2.com'
				}
			};

			ShareLinks.initMail(jq);

			expect(jq.attr('href')).toBe('mailto:?subject=My%20og%20title&body=http%3A%2F%2Fwww.example2.com');
		});

		it("can init a Print link", function() {
			var result,
				jq = $('<a href="#" class="li-print">Print</a>');

			ShareLinks.window = {
				print: function() {
					result = true;
				}
			};

			ShareLinks.initPrint(jq);
			jq.trigger('click');

			expect(result).toBe(true);
		});

		it("can init a using the data-type attribute", function() {
			var result,
				jq = $('<a href="#" data-type="print">Print</a>');

			ShareLinks.window = {
				print: function() {
					result = true;
				}
			};

			ShareLinks.init(jq);
			jq.trigger('click');

			expect(result).toBe(true);
		});

	});

})(jQuery, gwa.ShareLinks);
