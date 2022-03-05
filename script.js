const body = document.querySelector('body');
const weekday = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

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

function pegarClima(latitude, longitude) {
	axios
		.post(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&exclude=hourly&appid=a731ceeacd30fa68e8839d76a9e0084c`
		)
		.then((resposta) => {
			carregarTemperaturaMaxMinAtual(resposta);
			carregarTemperaturaAtual(resposta);
			carregarTemperaturaProximo7Dias(resposta.data.daily);
			carregarNomeLocal(resposta);
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

pegarLocalizacao();
