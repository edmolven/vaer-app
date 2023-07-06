var express = require('express');
var router = express.Router();

var currTemp = 0.0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Eivinds værapp', currTemp: currTemp });
  console.log("Hello from index.js");
});

router.get('/foo', function(req, res) {
  const querystring = require("querystring");
  const { Curl, CurlAuth, CurlVersion } = require("node-libcurl");
  const { response } = require("../../app");
  const curlTest = new Curl();
  const terminate = curlTest.close.bind(curlTest);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth()+1;
  const day = now.getDate();
  const hour = now.getHours()-3;
  console.log("Year: "+year + " Month: "+month+ " Day: "+day+" Hour: "+hour);
  const frostUrlCall = "https://frost.met.no/observations/v0.jsonld?sources=sn18700&referencetime="+year+"-"+month+"-"+day+"T"+hour+"&elements=air_temperature"

  //curlTest.setOpt(Curl.option.URL, frostUrlCall);// "https://frost.met.no/observations/v0.jsonld?sources=sn18700&referencetime=2022-12-10T04&elements=air_temperature");
  curlTest.setOpt(Curl.option.URL, "https://frost.met.no/observations/v0.jsonld?sources=sn18700&referencetime=2023-07-06/2023-07-07&elements=air_temperature");
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
      console.log(obj);
      console.log(obj.data[obj.data.length-1]);

      currTemp = obj.data[obj.data.length-1].observations[0].value;
      res.render('index', { title: 'Eivinds værapp', currTemp: currTemp });
      this.close()
  })

  curlTest.on("error", terminate);

  curlTest.perform();

  //res.render('index', { title: 'Eivinds værypp', currTemp: currTemp });
  //console.log("Hello from index.js");
});

module.exports = router;

