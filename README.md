# Share-Links

Simple non-api share links for Facebook &amp; Twitter.

## Installation

```bash
bower install --save gwa-share-links
```

## Usage

```markup
<a href="http://linkto.share.com/" class="fb-share">Share on Facebook</a>
<a href="http://linkto.share.com/" data-content="#hashtag content" class="tw-share">Share on Twitter</a>
```

```js
gwa.ShareLinks.initFacebook($('a.fb-share'));
gwa.ShareLinks.initTwitter($('a.tw-share'));
```
