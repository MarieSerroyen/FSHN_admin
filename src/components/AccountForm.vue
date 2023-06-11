<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue';

    const storeId = ref('');

    const name = ref('');
    const email = ref('');
    const phone = ref('');

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
                const storeID = storeId.value = data.data.storeId;

                getStore(storeID);
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });

    const getStore = (value:Ref) => {
        fetch(`${import.meta.env.VITE_API_URL}/stores/${value}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors"            
        }
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            name.value = data.data.name;
            email.value = data.data.email;
            phone.value = data.data.phone;            
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const updateInfo = (id: string) => {
        let data = {
            name: name.value,
            email: email.value,
            phone: phone.value
        }
        fetch(`${import.meta.env.VITE_API_URL}/stores/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors",            
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (data.status === "success") {
                successMessage.value = data.message;

                const form = document.querySelector('.form-validation');
                form?.classList.toggle('hidden');

            } else {
                errorMessage.value = data.message;

                const form = document.querySelector('.form-validation');
                form?.classList.toggle('hidden');
            }
        })
        .catch((error) => {
            console.log(error);
        });

    }
</script>

<template>
    <div class="container">
        <div class="input_grid">
            <div class="text_input">
                <label for="name">Name</label>
                <input class="inputfield" type="text" id="name" name="name" v-model="name">
            </div>

            <div class="text_input email">
                <label for="email">Email</label>
                <input class="inputfield" type="text" id="email" name="email" v-model="email">
            </div>

            <div class="text_input">
                <label for="phone">Phone</label>
                <input class="inputfield" type="text" id="phone" name="phone" v-model="phone">
            </div>
        </div>

        <div class="form-validation hidden">
            <p class="error-message">{{ errorMessage }}</p>
            <p class="success-message">{{ successMessage }}</p>
        </div>

        <div>
            <a @click="updateInfo(storeId)" class="button">Submit</a>
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

    .form-validation {
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