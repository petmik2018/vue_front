<template>
  <div :class="type === 'catalog' ? 'product-item' : 'cart-item'">
<!--   <div class="catalog">  -->  

    <template v-if="type == 'catalog'">
        <div class="desc">
            <img :src=itemImage>
            <h1>{{ item.name }}</h1>
            <h1>Бренд {{ item.brand_name }}</h1>
            <h1>Размер {{ stockInfo('size') }}</h1>
            <h1>Цена {{ stockInfo('price') }}</h1>
            <button class="buy-btn" name="buy-btn" @click="$parent.showDetails(item)">Подробнее</button>
        </div>
    </template>

    <template v-if="type == 'card'">
    	<div class="desc">
            <img :src=itemImage>
            <h1>{{ item.name }}</h1>
            <h1>Бренд {{ item.brand_name }}</h1>
            <h1>Цвет {{ item.color_name }}</h1>
            <h1>{{ item.department_name }}</h1>
            <ul class="key_points">
                <li v-for="point in productDescription('key_points')">
                    {{ point }}
                </li>                
            </ul>
            <h5>{{ productDescription('description') }}</h5>
            <button class="buy-btn" name="buy-btn" @click="$parent.$emit('add', item)">Купить</button>
        </div>
    </template>

    <template v-if="type == 'basket'">
        <div class="product-desc">
            <p class="product-title">{{ item.product_name }}</p>
            <p class="product-quantity">{{ item.quantity }}</p>
            <p class="product-single-price">{{ '$' + item.price }}</p>
        </div>
        <div class="right-block">
            <button name="del-btn" class="del-btn" @click="$emit('remove', item)">&times;</button>
        </div>
    </template>

  </div>
</template>

<script>
import minmax from '../utils/minmax.js';
export default {
    // data() {
    //     return {

    //     }

    // },
    props: {
        type: {
            type: String,
            default: 'catalog'
        },
        item: {
            type: Object
        },
    },
    methods: {

    },
    computed: {
    	itemImage() {
    		try {
    			let main_image_link = JSON.parse(this.item.image_links)[0];
    			let main_image = require(`../assets/${main_image_link}`);
    			return main_image
    		} catch (err) {
    			console.log(err)
    			return '' 
    		}
    	},
        productDescription() {
            return key => JSON.parse(this.item.description)[key]
        },
        stockInfo() {
            return key => minmax(this.item.get_stock, key);            
        }
    }
}
</script>

<style>

</style>