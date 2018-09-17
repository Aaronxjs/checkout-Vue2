var vm = new Vue({
	el: "#app",
	data: {
		totalMoney: 0,
		productList: []
	},
	mounted: function(){
		this.cartView();
	},
	filters: {
		productMonery: function(value, type){
			console.log(type);
			var type = type == undefined ? '' : type;
			return '￥ ' + value.toFixed(2)+type;
		}
	},
	methods: {
		cartView: function(){
			var _this = this;
			this.$http.get('data/cartData.json').then(function(res){
				_this.productList = res.data.result.list;
				_this.totalMoney = res.data.result.totalMoney;
			})
		},
		changeProductNumber: function(item,type){
			if(type == 1){ //增加产品数量;
				item.productQuantity++;
			}else{
				if(item.productQuantity > 1){ //减少产品数量;
					item.productQuantity --;
				}
			}
		}
	}
});