<template>
    <div class="cart-block">
        <div class="d-flex">
            <div class="my-2">
            <form action="#" id="app-form">
                <fieldset>
                    <label>
                        <input v-model="userName"> Enter Login (e-mail)
                    </label>
                </fieldset> 
                <fieldset>
                    <label>
                        <input v-model="password"> Enter Password
                    </label>
                </fieldset>
            </form>
            <button @click="loginUser">ВОЙТИ</button>
        </div>
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            userName: '',
            password: '',
            message: 'LOGGED!!!'
        }
    },
    methods: {
        loginUser() {
            let requestBody = {
                      'username': this.userName,
                      'password': this.password,
                    };
            this.$parent.showLogin = false;
            return fetch('http://127.0.0.1:3000/api/user/login/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
            })
            .then( response => response.json())
            .then( data => {                
                localStorage.token = data.token;
                this.$parent.userIsAuthorized = true;
                console.log('Вы успешно зарегистрированы')
             })
            .then(this.findUser(this.userName))
       },
       logOut() {
            localStorage.token = '';
            this.$parent.userName = 'Unknown';
            console.log('Вы успешно вышли из системы')
       },
       getUsersList() {
            return fetch('http://127.0.0.1:3000/api/user/profile', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
        })
        .then( response => response.json())
        .then( data => { console.log(data) })
       },
       findUser(userName) {
            return fetch('http://127.0.0.1:3000/api/user/profile', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
        })
        .then( response => response.json())
        .then( data => {
            let elem = data.find(el => el.email == userName);
            this.$parent.userName = elem.name; 
            })
       }

    },
    computed: {
        //всего товаров
        //общая стоимость
    }
}
</script>

<style>

</style>