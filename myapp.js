/*
Skycons is a set of ten animated weather glyphs, procedurally generated by JavaScript using the HTML5 canvas tag.
http://darkskyapp.github.io/skycons/
*/
var skycons = new Skycons();
  // on Android, a nasty hack is needed: {"resizeClear": true}

  // you can add a canvas by it's ID...
  skycons.add("today", Skycons.PARTLY_CLOUDY_DAY);
  skycons.add("day1", Skycons.CLEAR_DAY);
  skycons.add("day2", Skycons.CLOUDY);
  skycons.add("day3", Skycons.RAIN);

  // start animation!
  skycons.play();
  
  // want to change the icon? no problem:
  skycons.set("today", Skycons.PARTLY_CLOUDY_NIGHT);
  
/*
Get value from Bootstrap dropdown menu
*/

var $cityList = ["台北市","新北市","台中市","台南市","高雄市","基隆市","桃園市","新竹市","苗栗市","彰化縣","南投縣","雲林縣","嘉義市", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣", "台東縣", "澎湖縣", "金門縣", "連江縣"];

for(var i = 0; i < $cityList.length; i++){
  $('#dropdown').append('<li role="presentation"></li>');
}

$('#dropdown li').each(function(){

  var $i = $(this).index();
  $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + $cityList[$i] + '%22)%20AND%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(data){
    
    var $temp = data.query.results.channel.item.condition.temp;
    $('#dropdown li').eq($i).append('<a role="menuitem" tabindex="-1" href="#">' + $cityList[$i] + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + $temp + ' ℃</a>');

  });

});

$.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + '台北市' + '%22)%20AND%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(data){

    $('.dropDisplay').text('台北市');

    $('.temperature').text(data.query.results.channel.item.condition.temp);
    $('.date').text(data.query.results.channel.item.forecast[0].date);
    $('.state').text(data.query.results.channel.item.condition.text);

    $('.date1').text(data.query.results.channel.item.forecast[1].date);
    $('.date2').text(data.query.results.channel.item.forecast[2].date);
    $('.date3').text(data.query.results.channel.item.forecast[3].date);

    $('.temp1').text(data.query.results.channel.item.forecast[1].low + "-" + data.query.results.channel.item.forecast[1].high + " ℃");
    $('.temp2').text(data.query.results.channel.item.forecast[2].low + "-" + data.query.results.channel.item.forecast[2].high + " ℃");
    $('.temp3').text(data.query.results.channel.item.forecast[3].low + "-" + data.query.results.channel.item.forecast[3].high + " ℃");
  
    codeToIcon("today", data.query.results.channel.item.condition.code);
    codeToIcon("day1", data.query.results.channel.item.forecast[1].code);
    codeToIcon("day2", data.query.results.channel.item.forecast[2].code);
    codeToIcon("day3", data.query.results.channel.item.forecast[3].code);

    function codeToIcon(str, code){
      switch(parseInt(code)){

        case 32:
        case 34:
        case 36: 
        skycons.set(str, Skycons.CLEAR_DAY);
        break;
        
        case 31: 
        case 33:
        skycons.set(str, Skycons.CLEAR_NIGHT);
        break;
        
        case 30: 
        case 44:
        skycons.set(str, Skycons.PARTLY_CLOUDY_DAY);
        break;
        
        case 29:
        skycons.set(str, Skycons.PARTLY_CLOUDY_NIGHT);
        break;

        case 25: 
        case 26: 
        case 27: 
        case 28:
        skycons.set(str, Skycons.CLOUDY);
        break;

        case 1: 
        case 2: 
        case 3: 
        case 4: 
        case 8: 
        case 9: 
        case 10: 
        case 11: 
        case 12: 
        case 37: 
        case 38: 
        case 39: 
        case 40: 
        case 45: 
        case 47:
        skycons.set(str, Skycons.RAIN);
        break;
        
        case 6: 
        case 7: 
        case 17: 
        case 18: 
        case 35:
        skycons.set(str, Skycons.SLEET);
        break;
        
        case 5: 
        case 13: 
        case 14: 
        case 15: 
        case 16: 
        case 41: 
        case 42: 
        case 43: 
        case 46:
        skycons.set(str, Skycons.SNOW);
        break;
        
        case 0: 
        case 24:
        skycons.set(str, Skycons.WIND);
        break;
        
        case 19: 
        case 20: 
        case 21: 
        case 22: 
        case 23:
        skycons.set(str, Skycons.FOG);
        break;
      }
    }
  });

$('#dropdown li').on('click', function(){
  var $currentCity = $cityList[$(this).index()];
  $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + $currentCity + '%22)%20AND%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(data){
    $('.dropDisplay').text($currentCity);

    $('.temperature').text(data.query.results.channel.item.condition.temp);
    $('.date').text(data.query.results.channel.item.forecast[0].date);
    $('.state').text(data.query.results.channel.item.condition.text);

    $('.date1').text(data.query.results.channel.item.forecast[1].date);
    $('.date2').text(data.query.results.channel.item.forecast[2].date);
    $('.date3').text(data.query.results.channel.item.forecast[3].date);

    $('.temp1').text(data.query.results.channel.item.forecast[1].low + "-" + data.query.results.channel.item.forecast[1].high + " ℃");
    $('.temp2').text(data.query.results.channel.item.forecast[2].low + "-" + data.query.results.channel.item.forecast[2].high + " ℃");
    $('.temp3').text(data.query.results.channel.item.forecast[3].low + "-" + data.query.results.channel.item.forecast[3].high + " ℃");
  
    codeToIcon("today", data.query.results.channel.item.condition.code);
    codeToIcon("day1", data.query.results.channel.item.forecast[1].code);
    codeToIcon("day2", data.query.results.channel.item.forecast[2].code);
    codeToIcon("day3", data.query.results.channel.item.forecast[3].code);

    function codeToIcon(str, code){
      switch(parseInt(code)){

        case 32:
        case 34:
        case 36: 
        skycons.set(str, Skycons.CLEAR_DAY);
        break;
        
        case 31: 
        case 33:
        skycons.set(str, Skycons.CLEAR_NIGHT);
        break;
        
        case 30: 
        case 44:
        skycons.set(str, Skycons.PARTLY_CLOUDY_DAY);
        break;
        
        case 29:
        skycons.set(str, Skycons.PARTLY_CLOUDY_NIGHT);
        break;

        case 25: 
        case 26: 
        case 27: 
        case 28:
        skycons.set(str, Skycons.CLOUDY);
        break;

        case 1: 
        case 2: 
        case 3: 
        case 4: 
        case 8: 
        case 9: 
        case 10: 
        case 11: 
        case 12: 
        case 37: 
        case 38: 
        case 39: 
        case 40: 
        case 45: 
        case 47:
        skycons.set(str, Skycons.RAIN);
        break;
        
        case 6: 
        case 7: 
        case 17: 
        case 18: 
        case 35:
        skycons.set(str, Skycons.SLEET);
        break;
        
        case 5: 
        case 13: 
        case 14: 
        case 15: 
        case 16: 
        case 41: 
        case 42: 
        case 43: 
        case 46:
        skycons.set(str, Skycons.SNOW);
        break;
        
        case 0: 
        case 24:
        skycons.set(str, Skycons.WIND);
        break;
        
        case 19: 
        case 20: 
        case 21: 
        case 22: 
        case 23:
        skycons.set(str, Skycons.FOG);
        break;
      }
    }
  });
});
