
function fetchWeatherClick() {
  currTemp = fetchWeather();
  document.getElementById('temp').textContent = currTemp;

}

function fetchWeather(){
    const querystring = require("querystring");
    const { Curl, CurlAuth, CurlVersion } = require("node-libcurl");
    const { response } = require("../../app");
    const curlTest = new Curl();
    const terminate = curlTest.close.bind(curlTest);

    curlTest.setOpt(Curl.option.URL, "https://frost.met.no/observations/v0.jsonld?sources=sn18700&referencetime=2023-06-25T05&elements=air_temperature");
    curlTest.setOpt(Curl.option.HTTPAUTH, CurlAuth.Any);
    curlTest.setOpt(Curl.option.USERPWD,'d40247cf-0ea5-4f36-8e51-6df437c72628:');
    curlTest.setOpt(Curl.option.SSL_VERIFYPEER,false);
    curlTest.setOpt(Curl.option.SSL_VERIFYHOST,false);
    curlTest.setOpt(Curl.option.SSL_VERIFYSTATUS,false);

    curlTest.on("end", function (statusCode, data, headers) {
        console.info(statusCode)
        console.info('---')
        console.info(data.length)
        console.info('---')
        console.info(this.getInfo('TOTAL_TIME'))
        obj = JSON.parse(data);
        console.log("Temperature was: " + obj.data[0].observations[0].value);

        return obj.data[0].observations[0].value;
    
        this.close()
    })

    curlTest.on("error", terminate);

    curlTest.perform();
}


