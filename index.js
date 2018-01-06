const parseQuery = (queryString) => {
	const queryArr = queryString.split('&');

	const queryObject = {};
	for (let i = 0; i < queryArr.length; i += 1) {
		let kv = queryArr[i].split('=');
		kv = [kv.shift(), kv.join('=')];

		if (kv.length === 2) {
			let nValue = decodeURIComponent(kv[1].replace(/\+/g, " "));

			if (nValue === 'true') {
				nValue = true;
			}

			if (nValue === 'false') {
				nValue = false;
			}

			if (typeof queryObject[kv[0]] === 'string') {
				queryObject[kv[0]] = [queryObject[kv[0]], nValue];
			} else {
				queryObject[kv[0]] = nValue;
			}
		}
	}
	return queryObject;
};

const getQueryObj = () => {
	const queryString = window.location.search.substr(1);

	// no query
	if (queryString === '') {
		return {};
	}

	return parseQuery(queryString);
};

const getIframeUrl = (trackId, autoplay) => {
	return iframeUrl = `
		https://widget.kkbox.com/v1/?id=
		${trackId}
		&type=song
		${autoplay ? '&autoplay=true' : ''}
	`;
};

const init = () => {
	const queryObject = getQueryObj();
	const iframes = document.querySelectorAll('iframe');

	if (queryObject.song) {
		if (typeof queryObject.song === 'string') {
			iframes[0].setAttribute('src', getIframeUrl(queryObject.song, queryObject.autoplay));

			return;
		}

		queryObject.song.forEach((trackId, index) => {
			iframes[index].setAttribute('src', getIframeUrl(trackId, queryObject.autoplay));
		});
	}
};

init();
