const body = document.querySelector('body');
const weekday = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

// const pack1 = 'https://lottiefiles.com/user/263075';
// const pack2 = 'https://lottiefiles.com/user/26177';

const animacoesDia = {
	limpo: 'https://assets5.lottiefiles.com/temp/lf20_Stdaec.json',
	chuva: 'https://assets3.lottiefiles.com/packages/lf20_bco9p3ju.json',
	chuvaRaios: 'https://assets1.lottiefiles.com/temp/lf20_XkF78Y.json',
	nublado: 'https://assets9.lottiefiles.com/temp/lf20_kOfPKE.json',
	parcialmenteChuvoso: 'https://assets6.lottiefiles.com/temp/lf20_rpC1Rd.json',
	neve: 'https://assets9.lottiefiles.com/private_files/lf30_w5u9xr3a.json',
	generico: 'https://assets9.lottiefiles.com/packages/lf20_iombyzfq.json',
};

const animacoesNoite = {
	limpo: 'https://assets4.lottiefiles.com/private_files/lf30_iugenddu.json',
	chuva: 'https://assets4.lottiefiles.com/private_files/lf30_jr9yjlcf.json',
	chuvaRaios: 'https://assets2.lottiefiles.com/private_files/lf30_22gtsfnq.json',
	nublado: 'https://assets8.lottiefiles.com/private_files/lf30_nx7kptft.json',
	parcialmenteChuvoso: 'https://assets5.lottiefiles.com/temp/lf20_I5XMi9.json',
	neve: 'https://assets6.lottiefiles.com/private_files/lf30_9bptg8sh.json',
	generico: 'https://assets4.lottiefiles.com/private_files/lf30_iugenddu.json',
};

function pegarClima(latitude, longitude) {
	axios
		.post(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&exclude=hourly&appid=a731ceeacd30fa68e8839d76a9e0084c`
		)
		.then((resposta) => {
			console.log(resposta);
			carregarAnimacaoPrincipal(resposta);
			carregarTemperaturaMaxMinAtual(resposta);
			carregarTemperaturaAtual(resposta);
			carregarTemperaturaProximo7Dias(resposta.data.daily);
			carregarNomeLocal(resposta);
		});
}

function pegarLocalizacao() {
	navigator.geolocation.getCurrentPosition((position) => {
		pegarClima(position.coords.latitude, position.coords.longitude);
	});
}

function carregarNomeLocal(resposta) {
	let nomeLocal = resposta.data.timezone;
	let nomeLocalHTML = document.querySelector('.nome_cidade_string');
	nomeLocalHTML.innerHTML = `${nomeLocal}`;
}

function carregarTemperaturaAtual(resposta) {
	let temperaturaAtual = document.querySelector('.temperatura-atual_numero');
	let temperaturaNumero = resposta.data.current.temp;
	temperaturaAtual.innerHTML = `${Math.round(temperaturaNumero)}°`;
}

function carregarTemperaturaMaxMinAtual(resposta) {
	let temperaturaMaxMinHTML = document.querySelector('.maximo-minimo_numero');
	let temperaturaNumero = resposta.data.current.temp;
	temperaturaMaxMinHTML.innerHTML = `${Math.round(temperaturaNumero) - 3}º / ${
		Math.round(temperaturaNumero) + 3
	}º`;
}

function pegarDiaDaSemana(i) {
	const d = new Date();
	return weekday[(d.getDay() + i) % 7];
}

function pegarLocalizacaoFooter() {
	navigator.geolocation.getCurrentPosition((position) => {
		pegarClima(position.coords.latitude, position.coords.longitude);
	});
}

function carregarTemperaturaProximo7Dias(temperaturaDaily) {
	criarFooterDiv(temperaturaDaily);
}

function pegarClimaFooter(latitude, longitude) {
	axios
		.post(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&exclude=hourly&appid=a731ceeacd30fa68e8839d76a9e0084c`
		)
		.then((resposta) => {
			carregarTemperaturaAtualFooter(resposta);
			console.log(resposta);
		});
}

function criarFooterDiv(day) {
	const footer = document.querySelector('footer');
	for (let index = 1; index < 5; index++) {
		const div = document.createElement('div');
		div.classList.add('row');
		div.innerHTML = `
            <h3 class="dia_semana">${pegarDiaDaSemana(index)}</h3>
            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="">
            <h3 class="temperatura">${Math.floor(day[index].temp.min)}º ${Math.floor(
			day[index].temp.max
		)}º
			</h3>
        `;
		footer.appendChild(div);
	}
}

function carregarAnimacaoPrincipal(resposta) {
	const figuraClima = document.querySelector('.figura_clima');

	const climaAtual = resposta.data.current.weather[0].main;
	const url = pegarAnimacaoClimaAtual(climaAtual.toString().toLowerCase());

	figuraClima.innerHTML = `
		<lottie-player src="${url}" background="transparent" speed="1"style="width: 250px; height: 250px; padding-left: 20px" loopautoplay></lottie-player>
	`;
}

function pegarAnimacaoClimaAtual(climaAtual) {
	const d = new Date();
	const hour = d.getHours();
	const isDia = hour >= 5 && hour <= 19;

	const animacoes = isDia ? animacoesDia : animacoesNoite;

	switch (climaAtual) {
		case 'clear':
			return animacoes.limpo;
		case 'rain':
			return animacoes.chuva;
		case 'mist':
			return animacoes.nublado;
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

pegarLocalizacao();
