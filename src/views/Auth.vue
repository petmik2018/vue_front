<template>
	<div class="home">
  		<img alt="Vue logo" src="../assets/logo.png">
      <div>
        <button class="" @click="login">Login</button>
      </div>
  		<div>
    		<button class="" @click="getFeedList">Get Feed List</button>
      </div>
      <div>
    		<button class="" @click="logout">Logout</button>
  		</div>
	</div>  

</template>

<script>

export default {

    name: 'Auth',
    components: {
  	},
  	data() {
  		return {
  			info: null
  		}
  	},
  	methods: {
  		createUser() { 
        let requestBody = {
                      'email': 'gena@tdzip.ru',
                      'name': 'Gena',
                      'password': 'casados',
                    };      			
      	return fetch('http://127.0.0.1:8000/api/profile/', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestBody)
        })
        .then( response => {
            if (response.ok) {
              return response
            } else {
              let error = new Error(response.statusText);
              error.response = 'Пользователь с таким логином уже существует';
              throw error
            }
        })
        .then( response => response.json() ) 
        .then( data => console.log(data)) 
        .catch( e => {
            console.log('Error: ' + e.message);
            console.log(e.response);
        }) 
  		},
      getUsersList() {        
        return fetch('http://127.0.0.1:8000/api/profile/')
          .then( response => response.json())
          // .then( data => console.log(data['message']));
          .then( data => this.info = data);
      }, 
      login() {
        let requestBody = {
                      'username': 'gena@tdzip.ru',
                      'password': 'casados',
                    };
        return fetch('http://127.0.0.1:8000/api/login/', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestBody)
        })
        .then( response => response.json())
        .then( data => { 
          localStorage.token = data.token;
          console.log('Вы успешно зарегистрированы')
         })        
      },
      logout() {
          localStorage.token = '';
          console.log('Bы вышли из авторизации');
      },
      getFeedList() {
        return fetch('http://127.0.0.1:8000/api/feed', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.token}`
                    }
        })
        .then( response => {
            if (response.ok) {
              return response
            } else {
              let error = new Error(response.statusText);
              error.message = 'У вас нет прав доступа к информации';
              throw error
            }
        })
        .then( response => response.json())
        .then( data => console.log(data)) 
        .catch(e => console.log(e.message))       
      }     
  	}
}

</script>
