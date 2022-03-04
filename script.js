const body = document.querySelector('body');

const weatherURLs = {
	rainy: 'https://assets4.lottiefiles.com/packages/lf20_bco9p3ju.json',
	sunny1: 'https://assets6.lottiefiles.com/packages/lf20_xlky4kvh.json',
	sunny2: 'https://assets1.lottiefiles.com/packages/lf20_bknKi1.json',
	cloudy1: 'https://assets7.lottiefiles.com/packages/lf20_iombyzfq.json',
	cloudy2: 'https://assets5.lottiefiles.com/packages/lf20_64okjrr7.json',
	thunderStorm1: 'https://assets2.lottiefiles.com/temp/lf20_JA7Fsb.json',
	thunderStorm2: 'https://assets5.lottiefiles.com/packages/lf20_kw1r63j7.json',
	sunnyRain1: 'https://assets4.lottiefiles.com/packages/lf20_xx4r8tdi.json',
	sunnyRain2: 'https://assets3.lottiefiles.com/temp/lf20_rpC1Rd.json',
	cloudySun: 'https://assets9.lottiefiles.com/packages/lf20_kljxfos1.json',
	cloudyNightPack1: 'https://assets1.lottiefiles.com/temp/lf20_Jj2Qzq.json',
	nightCloudyNightPack: 'https://assets3.lottiefiles.com/packages/lf20_jwfm7sta.json',
	nightThunderStormPack2: 'https://assets4.lottiefiles.com/private_files/lf30_22gtsfnq.json',
	thunderStormNightPack: 'https://assets6.lottiefiles.com/packages/lf20_ms53nlfm.json',
};

const nightPack = 'https://lottiefiles.com/abanopsamuel';
const pack1 = 'https://lottiefiles.com/user/263075';
const pack2 = 'https://lottiefiles.com/user/26177';

function createAnimationComponent(description) {
	const url = weatherURLs[description];
	return `
    <lottie-player
				src="${url}"
				background="transparent"
				speed="1"
				style="width: 300px; height: 300px"
				loop
				autoplay
    ></lottie-player>`;
}

function createAllAnimationsDiv() {
	const wrapper = document.createElement('div');
	wrapper.classList.add('flexbox-wrap');

	for (let description in weatherURLs) {
		wrapper.innerHTML += createAnimationComponent(description);
	}

	return wrapper;
}

body.appendChild(createAllAnimationsDiv());
