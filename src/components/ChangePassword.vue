<script lang="ts" setup>
    import { ref, onMounted } from 'vue';

    const userID = ref('');

    const old_password = ref('');
    const new_password = ref('');
    const confirm_password = ref('');

    const errorMessage = ref('');
    const successMessage = ref('');


    onMounted(() => {
        fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors" 
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (data.status === "success") {
                userID.value = data.data._id;
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });

    const changePassword = (id: string) => {

        let data = {
            old_password: old_password.value,
            new_password: new_password.value,
            confirm_password: confirm_password.value
        }

        fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "success") {
                successMessage.value = data.message;

                const form = document.querySelector('.form-validation-password');
                form?.classList.toggle('hidden');
            } else {
                errorMessage.value = data.message;

                const form = document.querySelector('.form-validation-password');
                form?.classList.toggle('hidden');
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

</script>

<template>
    <div class="container">
        <div class="input_grid">
            <div class="text_input">
                <label for="old_password">Old password</label>
                <input class="inputfield" type="password" id="old_password" name="old_password" v-model="old_password">
            </div>

            <div class="text_input email">
                <label for="new_password">New password</label>
                <input class="inputfield" type="password" id="new_password" name="new_password" v-model="new_password">
            </div>

            <div class="text_input">
                <label for="confirm_password">Confirm new password</label>
                <input class="inputfield" type="password" id="confirm_password" name="confirm_password" v-model="confirm_password">
            </div>
        </div>

        <div class="form-validation-password hidden">
            <p class="error-message">{{ errorMessage }}</p>
            <p class="success-message">{{ successMessage }}</p>
        </div>

        <div>
            <a @click="changePassword(userID)" class="button">Submit</a>
        </div>
    </div>
</template>

<style scoped>
    label {
        font-size: 16px;
        color: black;
        font-weight: 700;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
    }

    .input_grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4rem;
    }

    .text_input {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }

    .inputfield {
        height: 30px;
        width: 250px;
    }

    .button {
        background-color: #000000;
        color: #ffffff;
        padding: 0.5rem 1rem;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 1rem;
        cursor: pointer;
    }

    .form-validation-password {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }

    .error-message {
        color: #E45757;
        font-weight: 700;
    }

    .success-message {
        color: #1EB564;
        font-weight: 700;
    }

    .hidden {
        display: none;
    }
</style>