



function pegarClima(latitude, longitude) {
    axios.post(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt_br&units=metric&appid=f25110b0f83adb9f7c080ee182cd1d00`
    ).then(response => {
        console.log(response);
    });
}

function pegarLocalizacao() {
    navigator.geolocation.getCurrentPosition(position => {
        pegarClima(position.coords.latitude, position.coords.longitude);
    });
}
pegarLocalizacao();
