/*
 *
 * Cinema Expandido WEB
 * Data (Mayo 2018)
 * Paulina Casas
 * 
 *;
 
 * /
 */

/*
VARIABLES
*/

var api = "https://api.themoviedb.org/3/discover/movie?api_key=21227f6ea743c8cd0f26674247a1b443&primary_release_date.gte=";
var year1;
var month1;
var day1;
var apiCont = "&primary_release_date.lte=";
var year2;
var month2;
var day2;
var inputYear;
var inputMonth;
var inputDay;
var inputYear2;
var inputMonth2;
var inputDay2;
var dataReleases;
var texto;
var texto2 = [];
var funcionTexto;
var posX;
var posY;

/*
LIFE CYCLE METHODS
*/


function setup() {
  createCanvas(1920, 1500);

  inputYear = select("#year1");
  inputMonth = select("#month1");
  inputDay = select("#day1");
  inputYear2 = select("#year2");
  inputMonth2 = select("#month2");
  inputDay2 = select("#day2");

  var button = select("#submitTodo");

  button.mousePressed(infoTodo);
}

function draw() {
  background(255);
  textAlign(CENTER);
  fill(0);
  textSize(30);

  if (funcionTexto) {
    for (var z = 1; z < 21; z++) {
      text(texto2[z], width / 2, 60 * z);
    }
  }
}

/*
API
*/


function infoTodo() {
  year1Value = inputYear.value();
  month1Value = inputMonth.value();
  day1Value = inputDay.value();
  year2Value = inputYear2.value();
  month2Value = inputMonth2.value();
  day2Value = inputDay2.value();

  var url = api + year1Value + "-" + month1Value + "-" + day1Value + apiCont + year2Value + "-" + month2Value + "-" + day2Value;
  print(url);
  loadJSON(url, gotReleases);

}


function gotReleases(dataSaca) {
  dataReleases = dataSaca;
  var totalReleases = dataReleases.total_results;
  //print(dataReleases.results.length);

  if (dataReleases) {
    for (i = 0; i < dataReleases.results.length - 1; i++) {
      texto = dataReleases.results[i].title + ". Language: " + dataReleases.results[i].original_language + ". Released: " + dataReleases.results[i].release_date;
      texto2.push(texto);
      //print(texto);
      //print(dataReleases.results[i]);
      if (dataReleases.results[i].backdrop_path) {
      var urlImage = "https://image.tmdb.org/t/p/w300" + dataReleases.results[i].backdrop_path;
      loadImage(urlImage,gotPic);
       //print(urlImage);
      };
    }
  }
  funcionTexto = dataReleases;
}
function gotPic(data){
  image(data,posX,posY);
  posX +=100;
  posY +=100;
}
