# Share Links

Simple non-API share links for:

* Facebook
* Twitter
* WhatsApp
* Weibo
* Xing
* Linkedin
* Mail page
* Print page

No platform specific JavaScript required (e.g. Facebook SDK).

**Styling is not provided!**

Currently requires jQuery.

[![Build Status](https://travis-ci.org/gwa/share-links.svg?branch=master)](https://travis-ci.org/gwa/share-links)

## Installation

```bash
npm install --save gwa-share-links
bower install --save gwa-share-links
```

## Usage

```markup
<a href="http://linkto.share.com/" class="fb-share">Share on Facebook</a>
<a href="http://linkto.share.com/" data-content="#hashtag content" class="tw-share">Share on Twitter</a>
<a href="#" class="wa-share">Share on Whatsapp</a>
<a href="http://linkto.share.com/" data-content="My message" class="wb-share">Share on Weibo</a>

<a href="#" class="share" data-type="linkedin">Share on LinkedIn</a>
<a href="#" class="share" data-type="xing">Share on Xing</a>
<a href="#" class="share" data-type="print">Print</a>

<a href="#" class="mail">Mail</a>
```

```js
gwa.ShareLinks.initFacebook($('a.fb-share'));
gwa.ShareLinks.initTwitter($('a.tw-share'));
gwa.ShareLinks.initWhatsapp($('a.wa-share'));
gwa.ShareLinks.initWeibo($('a.wb-share'));

// Init multiple that have the `data-type` attribute.
gwa.ShareLinks.initMultiple($('a.share'));

// Init by passing type as 2nd argument.
gwa.ShareLinks.init($('a.mail', 'mail'));
```

You can also use `data-type` to set the type, and then init all in one call:

```markup
<a href="#" class="share" data-type="facebook">Share on Facebook</a>
<a href="#" class="share" data-type="twitter">Share on Twitter</a>
```

```js
gwa.ShareLinks.initMultiple($('.share'));
```

### URLs

Set a custom URL by adding the `href`, or set to `#` to use the page location.

### Titles

Some sharers, e.g. Twitter or Mail, use text content.

The order of preference is as follows:

* `data-content` attribute
* `og:title` metatag
* the page `title`

This means that you can use `data-content` to add hashtags to a Twitter share.
