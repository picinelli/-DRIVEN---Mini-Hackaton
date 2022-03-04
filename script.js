const body = document.querySelector('body');
const weekday = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sabado"];

// const weatherURLs = {
//     rainy: 'https://assets4.lottiefiles.com/packages/lf20_bco9p3ju.json',
// 	sunny1: 'https://assets6.lottiefiles.com/packages/lf20_xlky4kvh.json',
// 	sunny2: 'https://assets1.lottiefiles.com/packages/lf20_bknKi1.json',
// 	cloudy1: 'https://assets7.lottiefiles.com/packages/lf20_iombyzfq.json',
// 	cloudy2: 'https://assets5.lottiefiles.com/packages/lf20_64okjrr7.json',
// 	thunderStorm1: 'https://assets2.lottiefiles.com/temp/lf20_JA7Fsb.json',
// 	thunderStorm2: 'https://assets5.lottiefiles.com/packages/lf20_kw1r63j7.json',
// 	sunnyRain1: 'https://assets4.lottiefiles.com/packages/lf20_xx4r8tdi.json',
// 	sunnyRain2: 'https://assets3.lottiefiles.com/temp/lf20_rpC1Rd.json',
// 	cloudySun: 'https://assets9.lottiefiles.com/packages/lf20_kljxfos1.json',
// 	cloudyNightPack1: 'https://assets1.lottiefiles.com/temp/lf20_Jj2Qzq.json',
// 	nightCloudyNightPack: 'https://assets3.lottiefiles.com/packages/lf20_jwfm7sta.json',
// 	nightThunderStormPack2: 'https://assets4.lottiefiles.com/private_files/lf30_22gtsfnq.json',
// 	thunderStormNightPack: 'https://assets6.lottiefiles.com/packages/lf20_ms53nlfm.json',
// };
// body.appendChild(createAllAnimationsDiv());

// const pack1 = 'https://lottiefiles.com/user/263075';
// const pack2 = 'https://lottiefiles.com/user/26177';

// function createAnimationComponent(description) {
// 	const url = weatherURLs[description];
// 	return `
    // <lottie-player
	// 			src="${url}"
	// 			background="transparent"
	// 			speed="1"
	// 			style="width: 300px; height: 300px"
	// 			loop
	// 			autoplay
    // ></lottie-player>`;
// }

// function createAllAnimationsDiv() {
// 	const wrapper = document.createElement('div');
// 	wrapper.classList.add('flexbox-wrap');

// 	for (let description in weatherURLs) {
// 		wrapper.innerHTML += createAnimationComponent(description);
// 	}

// 	return wrapper;
// }

function pegarClima(latitude, longitude) {
	axios.post(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&exclude=hourly&appid=a731ceeacd30fa68e8839d76a9e0084c`
		).then((resposta) => {
			carregarTemperaturaMaxMinAtual(resposta)
			carregarTemperaturaAtual(resposta);
            carregarTemperaturaProximo7Dias(resposta.data.daily)
			carregarNomeLocal(resposta)
			console.log(resposta);
		});
}

function pegarLocalizacao() {
	navigator.geolocation.getCurrentPosition((position) => {
		pegarClima(position.coords.latitude, position.coords.longitude);
	});
}

function carregarNomeLocal(resposta) {
	let nomeLocal = resposta.data.timezone;
	let nomeLocalHTML = document.querySelector('.nome_cidade_string')
	nomeLocalHTML.innerHTML = `${nomeLocal}`
}

function carregarTemperaturaAtual(resposta) {
	let temperaturaAtual = document.querySelector('.temperatura-atual_numero');
	let temperaturaNumero = resposta.data.current.temp;
	temperaturaAtual.innerHTML = `${Math.round(temperaturaNumero)}°`
}

function carregarTemperaturaMaxMinAtual(resposta) {
	let temperaturaMaxMinHTML = document.querySelector('.maximo-minimo_numero')
	let temperaturaNumero = resposta.data.current.temp;
	temperaturaMaxMinHTML.innerHTML = `${Math.round(temperaturaNumero) - 3}º / ${Math.round(temperaturaNumero) + 3}º`
}

function pegarDiaDaSemana(i){
	const d = new Date();
	return weekday[(d.getDay()+i)%7];
}

function pegarLocalizacaoFooter() {
	navigator.geolocation.getCurrentPosition((position) => {
		pegarClima(position.coords.latitude, position.coords.longitude);
	});
}

function carregarTemperaturaProximo7Dias(temperaturaDaily) {
	criarFooterDiv(temperaturaDaily)
}

function pegarClimaFooter(latitude, longitude) {
	axios.post(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&exclude=hourly&appid=a731ceeacd30fa68e8839d76a9e0084c`
		).then((resposta) => {
			carregarTemperaturaAtualFooter(resposta)
			console.log(resposta);
		});
}

function criarFooterDiv(day){
	const footer = document.querySelector('footer')
	for (let index = 1; index < 5; index++) {
		const div = document.createElement('div');
        div.innerHTML = `
            <h3>${pegarDiaDaSemana(index)}</h3>
            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="">
            <h3>${Math.floor(day[index].temp.min)} ${Math.floor(day[index].temp.max)}</h3>
        `
		footer.appendChild(div)
    }
}

pegarLocalizacao();
