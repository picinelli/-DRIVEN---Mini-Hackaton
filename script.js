const body = document.querySelector('body');
const weekday = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
const URL_ICONE = 'http://openweathermap.org/img/wn/';
const loadingScreen = document.getElementById('loading_screen');
const searchScreen = document.getElementById('search_screen');

const d = new Date();
const hour = d.getHours();

const animacoesDia = {
	limpo: 'https://assets1.lottiefiles.com/packages/lf20_xlky4kvh.json',
	chuva: 'https://assets3.lottiefiles.com/packages/lf20_bco9p3ju.json',
	chuvaRaios: 'https://assets1.lottiefiles.com/temp/lf20_XkF78Y.json',
	nublado: 'https://assets2.lottiefiles.com/temp/lf20_VAmWRg.json',
	neblina: 'https://assets9.lottiefiles.com/temp/lf20_kOfPKE.json',
	parcialmenteChuvoso: 'https://assets6.lottiefiles.com/temp/lf20_rpC1Rd.json',
	neve: 'https://assets9.lottiefiles.com/private_files/lf30_w5u9xr3a.json',
	generico: 'https://assets9.lottiefiles.com/packages/lf20_iombyzfq.json',
};

const animacoesNoite = {
	limpo: 'https://assets4.lottiefiles.com/private_files/lf30_iugenddu.json',
	chuva: 'https://assets4.lottiefiles.com/private_files/lf30_jr9yjlcf.json',
	chuvaRaios: 'https://assets2.lottiefiles.com/private_files/lf30_22gtsfnq.json',
	nublado: 'https://assets8.lottiefiles.com/private_files/lf30_nx7kptft.json',
	neblina: 'https://assets6.lottiefiles.com/private_files/lf30_qqhrsksk.json',
	parcialmenteChuvoso: 'https://assets5.lottiefiles.com/temp/lf20_I5XMi9.json',
	neve: 'https://assets6.lottiefiles.com/private_files/lf30_9bptg8sh.json',
	generico: 'https://assets4.lottiefiles.com/private_files/lf30_iugenddu.json',
};

const iconesDia = {
	limpo: '01d.png',
	chuva: '09d.png',
	chuvaRaios: '11d.png',
	nublado: '04d.png',
	neblina: '50d.png',
	parcialmenteChuvoso: '10d.png',
	neve: '13d.png',
	generico: '02d.png',
};

const iconesNoite = {
	limpo: '01n.png',
	chuva: '09n.png',
	chuvaRaios: '11n.png',
	nublado: '04n.png',
	neblina: '50n.png',
	parcialmenteChuvoso: '10n.png',
	neve: '13n.png',
	generico: '02n.png',
};

function pegarClima(latitude, longitude) {
	toggleLoadingScreen();

	const promise = axios.post(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=a731ceeacd30fa68e8839d76a9e0084c`
	);

	promise.then((resposta) => {
		carregarAnimacaoPrincipal(resposta.data.current.weather);
		carregarTemperaturaMaxMinAtual(
			resposta.data.daily[0].temp.min,
			resposta.data.daily[0].temp.max
		);
		carregarTemperaturaAtual(resposta.data.current.temp);
		carregarClimaHoras(resposta);
		carregarTemperaturaProximo7Dias(resposta.data.daily);
		carregarNomeLocal(resposta);
	});
	promise.catch((err) => console.log(err.response));
	promise.finally(toggleLoadingScreen);
}

function pegarLocalizacaoAtual() {
	navigator.geolocation.getCurrentPosition((position) => {
		pegarClima(position.coords.latitude, position.coords.longitude);
	});
}

function carregarNomeLocal(resposta) {
	let nomeLocal = resposta.data.timezone;
	let nomeLocalHTML = document.querySelector('.nome_cidade_string');
	nomeLocalHTML.innerHTML = `${nomeLocal.split('/')[1].replace('_', ' ')}`;
}

function carregarTemperaturaAtual(temp) {
	let temperaturaAtual = document.querySelector('.temperatura-atual_numero');
	let temperaturaNumero = temp;
	temperaturaAtual.innerHTML = `${Math.round(temperaturaNumero)}°`;
}

function carregarTemperaturaMaxMinAtual(tempMin, tempMax) {
	let temperaturaMaxMinHTML = document.querySelector('.maximo-minimo_numero');
	temperaturaMaxMinHTML.innerHTML = `${Math.round(tempMin)}º / ${Math.round(tempMax)}º`;
}

function pegarDiaDaSemana(i) {
	return weekday[(d.getDay() + i) % 7];
}

function carregarTemperaturaProximo7Dias(temperaturaDaily) {
	criarFooterDiv(temperaturaDaily);
}

function criarFooterDiv(day) {
	const footer = document.querySelector('footer');
	footer.innerHTML = '';
	for (let index = 1; index < 5; index++) {
		const climaAtual = day[index].weather[0].main;
		const div = document.createElement('div');
		div.classList.add('row');
		div.innerHTML = `
            <h3 class="dia_semana">${pegarDiaDaSemana(index)}</h3>
            <img src="${URL_ICONE}${pegarIconeClimaDoDia(
			climaAtual.toString().toLowerCase()
		)}" alt="">
            <h3 class="temperatura">${Math.floor(day[index].temp.min)}º ${Math.floor(
			day[index].temp.max
		)}º
			</h3>
        `;
		footer.appendChild(div);
	}
}

function carregarAnimacaoPrincipal(weather) {
	const figuraClima = document.querySelector('.figura_clima');

	const climaAtual = weather[0].main;
	const url = pegarAnimacaoClimaAtual(climaAtual.toString().toLowerCase());

	figuraClima.innerHTML = `
		<lottie-player src="${url}" background="transparent" speed="1"style="width: 200px; height: 200px; padding-left: 20px" loop autoplay></lottie-player>		
	`;
}

function carregarClimaHoras(resposta) {
	const climaHoras = resposta.data.hourly;
	const secaoClimaHoras = document.getElementById('hourly_weather');
	secaoClimaHoras.classList.remove('hidden');

	let icone = pegarIconeClimaDoDia(climaHoras[0].weather[0].main.toString().toLowerCase());

	secaoClimaHoras.innerHTML = criarElementoClimaHora('Now', icone);

	for (let i = 1; i < 6; i++) {
		icone = pegarIconeClimaDoDia(climaHoras[i].weather[0].main.toString().toLowerCase());
		secaoClimaHoras.innerHTML += criarElementoClimaHora((hour + i) % 24, icone);
	}
}

function criarElementoClimaHora(hora, icone) {
	return `
		<div>
			<h4>${hora}</h4>
			<img src="${URL_ICONE}${icone}" alt="" />
		</div>
	`;
}

function pegarAnimacaoClimaAtual(climaAtual) {
	const isDia = hour >= 5 && hour <= 19;

	const animacoes = isDia ? animacoesDia : animacoesNoite;

	switch (climaAtual) {
		case 'clear':
			return animacoes.limpo;
		case 'rain':
			return animacoes.chuva;
		case 'mist':
			return animacoes.neblina;
		case 'clouds':
			return animacoes.nublado;
		case 'thunderstorm':
			return animacoes.chuvaRaios;
		case 'drizzle':
			return animacoes.parcialmenteChuvoso;
		case 'snow':
			return animacoes.neve;
		default:
			return animacoes.generico;
	}
}

function pegarIconeClimaDoDia(clima) {
	const isDia = hour >= 5 && hour <= 19;

	const icones = isDia ? iconesDia : iconesNoite;

	switch (clima) {
		case 'clear':
			return icones.limpo;
		case 'rain':
			return icones.chuva;
		case 'mist':
			return icones.neblina;
		case 'clouds':
			return icones.nublado;
		case 'thunderstorm':
			return icones.chuvaRaios;
		case 'drizzle':
			return icones.parcialmenteChuvoso;
		case 'snow':
			return icones.neve;
		default:
			return icones.generico;
	}
}

function pesquisarCidade() {
	const cidadeInput = document.getElementById('cidade_input');
	const cidade = cidadeInput.value;

	toggleLoadingScreen();
	const promise = axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=a731ceeacd30fa68e8839d76a9e0084c`
	);

	promise.then((resposta) => {
		carregarAnimacaoPrincipal(resposta.data.weather);
		carregarTemperaturaMaxMinAtual(resposta.data.main.temp_min, resposta.data.main.temp_max);
		carregarTemperaturaAtual(resposta.data.main.temp);

		//esse request nao retorna as informacoes de dias e horas :( teria que fazer outro request, talvez ate precise de outra api key
		// carregarClimaHoras(resposta);
		// carregarTemperaturaProximo7Dias(resposta.data.daily);
		let nomeLocalHTML = document.querySelector('.nome_cidade_string');
		nomeLocalHTML.innerHTML = cidade;
	});
	promise.catch((err) => console.log(err.response));
	promise.finally(toggleLoadingScreen);
}

function toggleLoadingScreen() {
	loadingScreen.classList.toggle('hidden');
}

function toggleSearchScreen() {
	searchScreen.classList.toggle('hidden');
}

// pegarLocalizacaoAtual();
pegarClima(41, -74);
