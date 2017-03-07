# Share Links

Simple non-API share links for Facebook, Twitter, WhatsApp and Weibo. No platform specific JavaScript required (e.g. Facebook SDK).

Currently requires jQuery.

[![Build Status](https://travis-ci.org/gwa/share-links.svg?branch=master)](https://travis-ci.org/gwa/share-links)

## Installation

```bash
bower install --save gwa-share-links
```

## Usage

```markup
<a href="http://linkto.share.com/" class="fb-share">Share on Facebook</a>
<a href="http://linkto.share.com/" data-content="#hashtag content" class="tw-share">Share on Twitter</a>
<a href="http://linkto.share.com/" class="wa-share">Share on Whatsapp</a>
<a href="http://linkto.share.com/" data-content="My message" class="wb-share">Share on Weibo</a>
```

```js
gwa.ShareLinks.initFacebook($('a.fb-share'));
gwa.ShareLinks.initTwitter($('a.tw-share'));
gwa.ShareLinks.initWhatsapp($('a.wa-share'));
gwa.ShareLinks.initWeibo($('a.wb-share'));
```
