var vm = new Vue({
	el: "#app",
	data: {
		totalMoney: 0,
		productList: [],
		checkAllFlag: false,
		showFlag: false,
		curProductIndex: 0
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
				//_this.totalMoney = res.data.result.totalMoney;
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
			this.claculateTotalMoney();
		},
		selectProduct: function(item){
			if(typeof item.checked == 'undefined'){
				this.$set(item, 'checked', false);
			}
			item.checked = ! item.checked;
			this.claculateTotalMoney();
		},
		checkAll: function(){
			this.checkAllFlag = !this.checkAllFlag;
			if(this.checkAllFlag){
				this.productList.forEach(item => {
					if(typeof item.checked == 'undefined'){
						this.$set(item, 'checked', true);
					}
					item.checked = true;
				});
			}else{
				this.productList.forEach(item => {
					item.checked = false;
				});
			}
			this.claculateTotalMoney();
		},
		claculateTotalMoney: function(){
			this.totalMoney = 0;
			this.productList.forEach(item => {
				if(item.checked){
					this.totalMoney += item.productQuantity*item.productPrice;
				}
			})
		},
		showAlert: function(status){
			this.showFlag = status;
		},
		delProductBefore: function(index){
			this.curProductIndex = index;
			this.showAlert(true);
		},
		delProductAfter: function(){
			this.$delete(this.productList, this.curProductIndex);
			this.showAlert(false);
		}
	}
});