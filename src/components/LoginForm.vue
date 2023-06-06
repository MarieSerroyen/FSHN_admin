<script lang="ts" setup>
    import {ref} from 'vue'
    import router from '../router';

    const email = ref('');
    const password = ref('');

    const errorMessage = ref('');

    const login = () => {
        fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "success") {
                console.log("success");
                localStorage.setItem("jwtToken", data.token);
                router.push("/")
            } else {
                console.log("error");    
                errorMessage.value = data.message;        

            }
        })
        .catch(error => {
            console.log(error);
        });
    }

</script>

<template>
    <div>
        <form >
            <div class="form-input">
                <label for="email">Email</label>
                <input class="inputfield" type="text" id="email" placeholder="Mail" v-model="email" >
            </div>

            <div class="form-input">
                <label for="password">Password</label>
                <input class="inputfield" type="password" id="password" placeholder="Password" v-model="password" >
            </div>

            <div class="form-error">
                <p class="error-message">{{ errorMessage }}</p>
            </div>

            <div class="button-section">
                <a class="button" type="submit" @click.prevent="login">Login</a>
            </div>

        </form>
    </div>
</template>

<style scoped>

    label {
        font-size: 16px;
        color: black;
        font-weight: 700;
    }
    
    .inputfield {
        height: 30px;
        width: 100%;
    }

    .form-input {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }

    .button-section {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 2rem;
    }
    .button {
        background-color: #000000;
        color: #ffffff;
        padding: 0.5rem 1rem;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        cursor: pointer;
    }

    .form-error {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 30px;
        margin-top: 1rem;
        color: #E45757;
    }
</style>