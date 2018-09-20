var vm = new Vue({
	el: ".container",
	data: {
		addressLimitNum: 3,
		addressDataList:[],
		addressMoreFlag: false,
		currentIndex: 0,
		shippingMethod: 0
	},
	mounted:function(){
		this.$nextTick(()=>{
			this.getAddressDataList();
		});
	},
	computed: {
		filterAddressList: function(){
			return this.addressDataList.slice(0, this.addressLimitNum);
		}
	},
	methods:{
		getAddressDataList: function(){
			this.$http.get('data/address.json').then(response =>{
				var data = response.data;
				if(data.status == 0){
					this.addressDataList = data.result;
				}
			})
		},
		setAddressMore: function(){
			if(!this.addressMoreFlag){
				this.addressLimitNum = this.addressDataList.length;
			}else{
				this.addressLimitNum = 3;
			}
			this.addressMoreFlag = !this.addressMoreFlag;
		},
		setDefaultAddress: function(address){
			this.addressDataList.forEach((item)=>{
				item.isDefault = false;
			})
			address.isDefault = true;
		}
	}
});