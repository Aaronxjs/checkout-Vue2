var vm = new Vue({
	el: ".container",
	data: {
		addressDataList:[]
	},
	counted:function(){
		this.$nextTick(()=>{
			this.getAddressDataList();
		});
	},
	methods:{
		getAddressDataList: function(){
			this.$http.get('data/address.json').then(response =>{
				var data = response.data;
				if(data.status == 1){
					this.addressDataList = data.result;
				}
			})
		}
	}
});