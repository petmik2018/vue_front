<template>
  <div>
    <header>
        <div class="logo">BestKidsWear</div>
        <div class="logo">На сайте : {{ userName }}</div>

        <div class="cart" v-if="!userIsAuthorized">
			<button class="btn-cart" @click="showLogin = !showLogin">Войти</button>
            <login v-show="showLogin" ref="login"/>
        </div>
        <div class="cart" v-else>
        	<button class="btn-cart" @click="logout">Выйти</button>
        	<login v-show="showLogin" ref="login"/>
        </div>
        <div class="cart">
            <filter-item @search="filterElements"/>
            <button class="btn-cart" @click="showBasket = !showBasket">Cart</button>
            <basket v-show="showBasket" ref="basket"/>
        </div>
    </header>
    <main>
        <catalog @add="addItem" :filter="filterString"/>         
    </main>
  </div>
</template>

<script>
import login from '../containers/login.vue';
import catalog from '../containers/catalog.vue';
import basket from '../containers/basket.vue';
import filterItem from '../components/filterItem.vue';
export default {
    components: { login, catalog, basket, 'filter-item': filterItem },
    data() {
        return {
            showLogin: false,
            userIsAuthorized: localStorage.token,
            showBasket: false,
            filterString: '',
            API: 'http://127.0.0.1:3000'
        }
    },
    methods: {
        get(url) {
            let getUrl = this.API + url;
            console.log(getUrl);
            return fetch(getUrl).then(d => d.json());
        },
        post(url, item) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            })
            .then(res => res.json())
        },
        delete(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
        },
        put(url, item) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            })
            .then(res => res.json())
        },
        filterElements(payload) {
            this.filterString = payload;
        },
        addItem(item, selectedSizes) {
            this.$refs.basket.add(item, selectedSizes);
        },
        logout() {
        	this.$refs.login.logOut();
        	this.userIsAuthorized = false;
            this.$refs.basket.clearBasket();
        },
        loadBasket(user_id) {
            this.$refs.basket.loadUserBasket(user_id);
        }
    },
    computed: {
        userName() {
            return localStorage.user_name
        }

    }
}
</script>

<style>

</style>