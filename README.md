# Next-Css-fix

Next 7 has still an issue open which is regarding the implementation of the css.
There is an issue for the css that is not getting attached when the routing is changed on the client side. I have written a fix for it.

**This readme consists of webpack configuration, usage of the code and additional lines to be added in _app.js**

#### Issues
[Include css in a next project?](https://github.com/zeit/next.js/issues/299)
[Client side navigation is broken after CSS import via withCSS from @zeit/next-css](https://github.com/zeit/next.js/issues/5291)
[Client-side routing is broken in local development](https://github.com/OperationCode/front-end/issues/177)


### Tech

* [Nextjs](https://github.com/zeit/next.js) : Next 7 version.

### Installation

**_app.js**

```sh
const { router: { pageLoader: { buildId, assetPrefix } = {} } = {} } = this.props;

if (buildId) {
	Object.assign(global, {
		__NEXT_DATA__: {
			buildId,
			assetPrefix,
		},
	});
}
```

**usage**
```
import Attachcss from './attach-css';

// Add this line inside render function of a component
<Attachcss include={['_app', 'page-name']}/>
```


`Change the url in the attach css file or the next config file as per your need.`
