<template>
  <div class="cart-block">
    <div class="d-flex">
        <strong class="d-block">Всего товаров</strong> <div id="quantity">{{ basketSummary.quantity }}</div>
    </div>
    <hr>
    
    <item 
        type="basket" 
        v-for="item of items" 
        :key="item.id_product"
        :item="item"
        @remove="remove"
    /> <!--не забыть все пропы-->

    <hr>
    <div class="d-flex">
        <strong class="d-block">Общая ст-ть:</strong> <div id="price">{{ basketSummary.amount }}</div>
    </div>
</div>
</template>

<script>
import item from '../components/item.vue';
export default {
    components: { item },
    data() {
        return {
            //айтемы и урл
            items: [],
            url: '/api/basket'
        }
    },
    methods: {
        //добавить товар
        //удалить товар
        add(item, selectedSizes) {
        	selectedSizes.forEach(el => {
            	let newItemString = JSON.stringify({
            										product: item.id,
            										image_links: item.image_links,
            										name: item.name,
            										size: el.size,
            										price: el.price,
            										quantity: 1
            										});
            	let newItem = JSON.parse(newItemString);
            	let find = this.items.find(el => el.id == newItem.id && el.size == newItem.size);
            	if (!find) {
            		this.items.push(newItem);
            		console.log(this.items)
            	} else {
            		find.quantity++;
            	}
            });           
        },

        remove(item) {
            if (item.quantity <= 1) {
                this.$parent.delete(this.url + `/${item.id_product}`)
                .then(res => {
                    if (res.status) {
                        this.items.splice(this.items.indexOf(item), 1);
                    } else {
                        console.log('error delete item');
                    }
                });
            } else {
                this.$parent.put(this.url + `/${item.id_product}`, { amount: -1 })
                .then(res => {
                    if (res.status) {
                        item.quantity--;
                    } else {
                        console.log('error remove item');
                    }
                })
            }
        },
        loadUserBasket(user_id) {
        	let userIdStr = String(user_id);
        	if (userIdStr == "null") {
        		console.log(`Ошибка загрузки корзины пользователя ${userIdStr}`)
	        } else {
        		this.$parent.get(this.url + `/${user_id}`)
	        	.then(data => { 
	            	this.items = data;             	           	
	        		});
	        }      		
    	},
        clearBasket() {
        	this.items = [];
        },
    },

    mounted() {
    	this.loadUserBasket(localStorage.user_id);
    },
    computed: {
        basketSummary() {
        	let quantity = 0;
        	let amount = 0;
        	this.items.forEach(elem => {
        		quantity += elem.quantity;
        		amount += elem.quantity * elem.price;
        	})
        	return {"quantity": quantity, "amount": amount}
        }
    }
}
</script>

<style>

</style>