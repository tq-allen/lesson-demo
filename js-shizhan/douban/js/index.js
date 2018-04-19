var Tab = {
	init: function(){
		this.$tabs = $('nav>div')
		this.$pages = $('main>section')
		this.bind()
	},

	bind: function(){
		var _this = this
		this.$tabs.click(function(){
			$(this).addClass('active').siblings().removeClass('active')
			_this.$pages.eq($(this).index()).fadeIn().siblings().hide()
		})
	}
}

var Helpers = {
	createNode(subject){
		var $node = $('<a class="item" href="#">\
						<img src="" alt="">\
						<div class="item-txt">\
							<h2></h2>\
							<p><span class="score"></span>分 / <span class="collection"></span>收藏</p>\
							<p><span class="year"></span> / <span class="style"></span></p>\
							<p>导演：<span class="director"></span></p>\
							<p>主演：<span class="main-actor"></span></p>\
						</div>\
					</a>')
		$node.attr('href',subject.alt)
		$node.find('img').attr('src',subject.images.small)
		$node.find('h2').text(subject.title)
		$node.find('.score').text(subject.rating.average)
		$node.find('.collection').text(subject.collect_count)
		$node.find('.year').text(subject.year)
		$node.find('.style').text(subject.genres.join(' / '))
		$node.find('.director').text(subject.directors.map(function(director){
				return director.name
			}).join('、')
		)
		$node.find('.main-actor').text(subject.casts.map(function(actor){
				return actor.name
			}).join('、')
		)
		return $node
	},

	isBottom: function($viewport, $content, $offset){
		if($viewport.scrollTop() + $offset >= $content.height() -$viewport.height()){
			return true
		}
	}

// 	toTop: function($page){
// 		var $toTop = $('.to-top')
// 		$toTop.click(function(){
// 			$page.animate({scrollTop: 0})
// 		})
// 	}
}

var Top250 = {
	init: function(){
		var _this = this
		this.$container = $('.top250')
		this.$content = $('.top250 .container')
		this.$loading = $('.top250 .loading')
		this.$page = 1
		this.$count = 10
		this.$isLoading = false
		this.$isFinish = false
		this.bind()
		this.getData(function(data){
			// console.log(data)
			_this.renderData(data)
		})
	},

	bind: function(){
		var _this = this
		this.$container.scroll(function(){
			if(Helpers.isBottom(_this.$container, _this.$content, 10) && !_this.$isFinish && !_this.$isLoading){
				_this.getData(function(data){
					_this.renderData(data)
				})
			}
		})

		// Helpers.toTop(this.$container)
	},

	getData: function(callback){
		var _this = this
		this.$loading.addClass('active')
		_this.$isLoading = true
		$.ajax({
			url: "https://api.douban.com/v2/movie/top250",
			data: {
				start: (this.$page-1) * this.$count,
				count: this.$count
			},
			dataType: 'jsonp'
		}).done(function(ret){
			callback(ret)
			_this.$isLoading = false
			// console.log(_this.$page * _this.$count)
			// console.log(ret.total)
			if(_this.$page * _this.$count >= ret.total){
				_this.$isFinish = true
				_this.$loading.text('没有更多数据了')
			}else{
				_this.$page ++
				_this.$loading.removeClass('active')
			}
		}).fail(function(){
			console.log('error')
			_this.$loading.text('出错了>...<')
		})

	},

	renderData: function(data){
		var _this = this
		data.subjects.forEach(function(item){
			// var $node = $('<a class="item" href="#">\
			// 				<img src="" alt="">\
			// 				<div class="item-txt">\
			// 					<h2></h2>\
			// 					<p><span class="score"></span>分 / <span class="collection"></span>收藏</p>\
			// 					<p><span class="year"></span> / <span class="style"></span></p>\
			// 					<p>导演：<span class="director"></span></p>\
			// 					<p>主演：<span class="main-actor"></span></p>\
			// 				</div>\
			// 			</a>')
			// $node.attr('href', item.alt)
			// $node.find('img').attr('src', item.images.small)
			// $node.find('h2').text(item.title)
			// $node.find('.score').text(item.rating.average)
			// $node.find('.collection').text(item.collect_count)
			// $node.find('.year').text(item.year)
			// $node.find('.style').text(item.genres.join(' / '))
			// var directors = []
			// item.directors.forEach(function(director){
			// 	directors.push(director.name)
			// })
			// $node.find('.director').text(directors.join('、'))
			// var actors = []
			// item.casts.forEach(function(actor){
			// 	actors.push(actor.name)
			// })
			// $node.find('.main-actor').text(actors.join('、'))
			var $node = Helpers.createNode(item)
			_this.$content.append($node)
		})
	}

	// isBottom: function(){
	// 	if(this.$container.scrollTop() + 10 >= this.$content.height() - this.$container.height() ){
	// 		return true
	// 	}
	// }
}

var NorthAmericaRanking = {
	init: function(){
		var _this = this
		this.$container = $('.beimei')
		this.$content = $('.beimei .container')
		this.getData(function(data){
			_this.renderData(data)
		})

	},

	bind: function(){

	},

	getData(callback) {
		$.ajax({
			url: 'https://api.douban.com/v2/movie/us_box',
			dataType: 'jsonp'
		}).done(function(ret){
			console.log(ret)
			callback(ret)
		}).fail(function(){
			console.log('error')
		})
	},

	renderData(data) {
		var _this = this
		data.subjects.forEach(function(item){
			// var $node = $('<a class="item" href="#">\
			// 				<img src="" alt="">\
			// 				<div class="item-txt">\
			// 					<h2></h2>\
			// 					<p><span class="score"></span>分 / <span class="collection"></span>收藏</p>\
			// 					<p><span class="year"></span> / <span class="style"></span></p>\
			// 					<p>导演：<span class="director"></span></p>\
			// 					<p>主演：<span class="main-actor"></span></p>\
			// 				</div>\
			// 			</a>')
			// $node.attr('href',item.subject.alt)
			// $node.find('img').attr('src',item.subject.images.small)
			// $node.find('h2').text(item.subject.title)
			// $node.find('.score').text(item.subject.rating.average)
			// $node.find('.collection').text(item.subject.collect_count)
			// $node.find('.year').text(item.subject.year)
			// $node.find('.style').text(item.subject.genres.join(' / '))
			// $node.find('.director').text(item.subject.directors.map(function(director){
			// 		return director.name
			// 	}).join('、')
			// )
			// $node.find('.main-actor').text(item.subject.casts.map(function(actor){
			// 		return actor.name
			// 	}).join('、')
			// )
			var $node = Helpers.createNode(item.subject)
			_this.$content.append($node)
		})
	}
}

var Search = {
	init(){
		var _this = this
		this.$container = $('.search')
		this.$content = $('.search .container')
		this.$contentList = $('.search .container .search-result')
		this.$loading = $('.search .loading')
		this.$page = 1
		this.$count = 10
		this.$isFinish = false
		this.$isLoading = false
		this.bind()
	},

	bind(){
		var _this = this

		this.$container.find('input').on('input',function(){
			if(_this.$content.find('input').val() === ''){
				_this.searchReset()
			}
		})

		this.$container.find('.search-btn').click(function(){
			_this.$contentList.children().remove()
			_this.searchReset()
			_this.getData(function(data){
				_this.renderData(data)
			})
		})

		this.$container.find('input').keyup(function(e){
			if(e.key === 'Enter'){
				_this.$contentList.children().remove()
				_this.searchReset()
				_this.getData(function(data){
					_this.renderData(data)
				})
			}
		})

		this.$container.scroll(function(){
			if(Helpers.isBottom(_this.$container, _this.$content, 10) && !_this.$isLoading && !_this.$isFinish){
				_this.getData(function(data){
					_this.renderData(data)
				})
			}
		})
	},

	getData(callback){
		var _this = this
		var keyword = this.$container.find('input').val()
		this.$loading.addClass('active')
		this.$isLoading = true
		$.ajax({
			url: 'https://api.douban.com/v2/movie/search',
			data: {
				q: keyword,
				start: (this.$page - 1) * this.$count,
				count: this.$count
			},
			dataType: 'jsonp'
		}).done(function(ret){
			console.log(ret)
			callback(ret)
			_this.$isLoading = false
			if(_this.$page * _this.$count >= ret.total && ret.total !== 0){
				_this.$isFinish = true
				_this.$loading.text('没有更多数据了...')
			}else if(0 === ret.total){
				_this.$loading.text('暂无结果...')
			}else{
				_this.$loading.removeClass('active')
				_this.$page ++
				_this.$isFinish = false
			}
		}).fail(function(){
			console.log('error')
			_this.$loading.text('出错了>...<')
		})
	},

	renderData(data){
		var _this = this
		console.log('renderData')
		data.subjects.forEach(function(item){
			var $node = Helpers.createNode(item)
			_this.$contentList.append($node)
		})
	},


	searchReset(){
		this.$loading.removeClass('active').html('<svg class="icon"><use xlink:href="#icon-loading"></use></svg>')
		this.$page = 1
	}

	// isBottom: function(){
	// 	if(this.$container.scrollTop() + 10 >= this.$content.height() - this.$container.height()){
	// 		return true
	// 	}
	// }
}

var App = {
	init: function(){
		Tab.init()
		Top250.init()
		NorthAmericaRanking.init()
		Search.init()
	}
}

App.init()