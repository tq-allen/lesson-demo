var app = {
	init(){
		var _this = this
		this.getData(function(data){
			_this.render(data)
			_this.bind()
		})
	},
	
	bind() {
		var suggestionNode = $$('.weather-suggestion-nav li')
		var suggestionTxt = $$('.weather-suggestion p')
		suggestionNode.forEach(function(suggestion){
			suggestion.addEventListener('click',function(){
				suggestionNode.forEach(function(allSuggestion){
					allSuggestion.classList.remove('active')
				})
				var index = 0
				for(var i=0; i<suggestionNode.length; i++){
					if(suggestionNode[i] === this){
						index = i
					}
				}
				this.classList.add('active')
				
				suggestionTxt.forEach(function(txt){
					txt.classList.remove('active')
					suggestionTxt[index].classList.add('active')
				})
			})
		})
		
		
	},
	
	render(data) {
		console.log(data)
		$('.weather-city-name').innerText = data.weather[0].city_name
		var weatherCityTime = new Date(data.weather[0].last_update)
		$('.weather-city-time').innerText = weatherCityTime.getHours() +':'+ setTime(weatherCityTime.getMinutes())
		
		$('#clothes').innerText = data.weather[0].today.suggestion.dressing.details
		$('#wash-car').innerText = data.weather[0].today.suggestion.car_washing.details
		$('#fluid').innerText = data.weather[0].today.suggestion.flu.details
		$('#sport').innerText = data.weather[0].today.suggestion.sport.details
		$('#sunlight').innerText = data.weather[0].today.suggestion.uv.details
		
		$('.weather-temperature-num').innerText = data.weather[0].now.temperature
		var week = ['日','一','二','三','四','五','六']
		$('.weather-temperature-time').innerText = `${setTime(weatherCityTime.getMonth()+1)}月${setTime(weatherCityTime.getDate())}日 星期${week[weatherCityTime.getDay()]}`
		
		$('.weather-img img').src = `//weixin.jirengu.com/images/weather/code/${data.weather[0].now.code}.png`
		
		$(".weather-pm25").innerText = `pm25/${data.weather[0].now.air_quality.city.pm25} ${data.weather[0].now.air_quality.city.quality}`
		
		var futureWeek = $$('.weather-future-week')
		for (var i = 0; i < futureWeek.length; i++) {
			futureWeek[i].innerText = data.weather[0].future[i+1].day
		}
		
		var futureImg = $$('.weather-future-img')
		for (var i = 0; i < futureImg.length; i++) {
			futureImg[i].src = `//weixin.jirengu.com/images/weather/code/${data.weather[0].future[i+1].code1}.png`
		}
		
		
		var futureTemp = $$('.weather-future-temp')
		for (var i = 0; i < futureTemp.length; i++) {
			futureTemp[i].innerText = `${data.weather[0].future[i+1].low}~${data.weather[0].future[i+1].high}`
		}
		
		
//		futureData(futureWeek,"day")
//		function futureData(future_Data,futurePorperty){
//			for (var i = 0; i < future_Data.length; i++) {
//				future_Data[i].innerText = data.weather[0].future[i+1].futurePorperty
//				console.log(`data.weather[0].future[i+1].${futurePorperty}`)
//			}
//		}

	},
	
	getData(callback) {
		let xhr = new XMLHttpRequest()
		xhr.open('GET','//weixin.jirengu.com/weather/',true)
		xhr.send()
		xhr.onload = function(){
			callback(JSON.parse(xhr.responseText))
		}
	}
}

app.init()

function $(selector){
	return document.querySelector(selector)
}
function $$(selector){
	return document.querySelectorAll(selector)
}
function setTime(t){
	if(t.toString().length < 2){
		return '0' + t
	}
	return t
}
