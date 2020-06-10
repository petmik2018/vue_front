<template>
	<div class="products" v-if="showCatalog">
		<item v-for="item of filtered" :item="item" :key="item.product_id"/>
	</div>
	<div class="products" v-else>
		<item :type="'card'" :item="chosenItem"/>   
	</div>
</template>

<script>
import item from '../components/item.vue';

export default {
    components: { item },
    props: {
        filter: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            items: [],
            filtered: [],
            productsUrl: '/api/product/profile',
            showCatalog: true,
            chosenItem: null,
        }
    },

    mounted() {
        this.$parent.get(this.productsUrl)
        .then(data => { 
            this.items = data; 
            this.filtered = data; 
        });
    },
    methods: {
        search(str) {
            if (!str) {
                this.filtered = this.items;
            } else {
                let reg = new RegExp(str, 'ig');
                this.filtered = this.items.filter(el => reg.test(el.product_name));
            }
        },
        showDetails(item) {
        	this.showCatalog = false;
        	this.chosenItem = item;
        },
    },
    watch: {
        filter: {
            // deep: true, //или false
            // immediate: true, //немедленно
            handler() {
                this.search(this.filter);
            }
        }
    },
}
</script>

<style>

</style>