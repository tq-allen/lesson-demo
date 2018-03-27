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
		suggestionNode.forEach(function(suggestion, index){
			suggestion.addEventListener('click',function(){
				suggestionNode.forEach(function(allSuggestion){
					allSuggestion.classList.remove('active')
				})
				//获取当前点击nav的索引
				// var index = 0
				// for(var i=0; i<suggestionNode.length; i++){
				// 	if(suggestionNode[i] === this){
				// 		index = i
				// 	}
				// }
				//获取当前点击nav的索引
				//var index = [].indexOf.call(suggestionNode, this)
				//var index = Array.prototype.indexOf.call(suggestionNode, this)


				this.classList.add('active')
				
				suggestionTxt.forEach(function(txt){
					txt.classList.remove('active')
				})

				// forEach()方法接受两个参数，一个是遍历的item，一个是当前item的索引
				suggestionTxt[index].classList.add('active')
			})
		})
		
		
	},
	
	render(data) {
		console.log(data)
		$('.weather-city-name').innerText = data.weather[0].city_name
		var weatherCityTime = new Date(data.weather[0].last_update)
		$('.weather-city-time').innerText = setTime(weatherCityTime.getHours()) +':'+ setTime(weatherCityTime.getMinutes())
		
		$('#clothes').innerText = data.weather[0].today.suggestion.dressing.details
		$('#wash-car').innerText = data.weather[0].today.suggestion.car_washing.details
		$('#fluid').innerText = data.weather[0].today.suggestion.flu.details
		$('#sport').innerText = data.weather[0].today.suggestion.sport.details
		$('#travel').innerText = data.weather[0].today.suggestion.travel.details
		$('#sunlight').innerText = data.weather[0].today.suggestion.uv.details
		
		$('.weather-temperature-num').innerText = `${data.weather[0].now.temperature}℃`
		var week = ['日','一','二','三','四','五','六']
		$('.weather-temperature-time').innerText = `${setTime(weatherCityTime.getMonth()+1)}月${setTime(weatherCityTime.getDate())}日 星期${week[weatherCityTime.getDay()]}`
		
		$('.weather-img img').src = `//weixin.jirengu.com/images/weather/code/${data.weather[0].now.code}.png`
		
		$('.weather-pm25').innerText = `pm25/${data.weather[0].now.air_quality.city.pm25} ${data.weather[0].now.air_quality.city.quality}`


		// 第一次写的思路是遍历DOM，然后把拿到的数据塞到遍历的每个DOM中
		// var futureWeek = $$('.weather-future-week')
		// for (var i = 0; i < futureWeek.length; i++) {
		// 	futureWeek[i].innerText = data.weather[0].future[i+1].day
		// }
		
		// var futureImg = $$('.weather-future-img')
		// for (var i = 0; i < futureImg.length; i++) {
		// 	futureImg[i].src = `//weixin.jirengu.com/images/weather/code/${data.weather[0].future[i+1].code1}.png`
		// }
		
		
		// var futureTemp = $$('.weather-future-temp')
		// for (var i = 0; i < futureTemp.length; i++) {
		// 	futureTemp[i].innerText = `${data.weather[0].future[i+1].low}~${data.weather[0].future[i+1].high}`
		// }

     	var future = $$('.weather-future li')
		for(var i=0; i<future.length; i++){
			future[i].querySelector('.weather-future-week').innerText = data.weather[0].future[i+1].day
			future[i].querySelector('.weather-future-img').src = `//weixin.jirengu.com/images/weather/code/${data.weather[0].future[i+1].code1}.png`
			future[i].querySelector('.weather-future-temp').innerText = `${data.weather[0].future[i+1].low}~${data.weather[0].future[i+1].high}℃`
		}

	},
	
	getData(callback) {
		let xhr = new XMLHttpRequest()
		xhr.open('GET','//weixin.jirengu.com/weather/',true)
		xhr.open('GET','https://weixin.jirengu.com/weather',true)
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
