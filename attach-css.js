import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

function getName(path = '') {
	const { __NEXT_DATA__: { buildId, assetPrefix = '' } = { } } = global;

	if (!buildId || !path) {
		return null;
	}

	return `${assetPrefix}/_next/static/${buildId}/pages/${path}.js.css`;
}

class AttachCss extends React.PureComponent {
	componentDidMount() {
		const headEl = document.getElementsByTagName('head')[0]
    const oldTags = Array.prototype.slice.call(headEl.querySelectorAll('link[rel="stylesheet"]'));
    oldTags.forEach(e => e.setAttribute('class', 'next-head'));
	}

	render() {
		const { include: includeCss = [] } = this.props;

		if (!includeCss || includeCss.length === 0) {
			return null;
		}

		return (
			<Head>
				{includeCss
					.map(path => {
						const cssPath = getName(path);
						if (cssPath) {
							return <link key={cssPath} rel="stylesheet" href={cssPath} />;
						}
						return null;
					})
					.filter(Boolean)}
			</Head>
		);
	}
}

AttachCss.propTypes = {
	include: PropTypes.array,
};

AttachCss.defaultProps = {
	include: [],
};

export default AttachCss;