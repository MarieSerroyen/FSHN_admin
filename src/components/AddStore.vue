<script lang="ts" setup>
    import { ref } from 'vue'

    const name = ref('');
    const email = ref('');
    const phone = ref('');

    const test = ref('');

    const addStore = () => {

        let data = {
            name: name.value,
            email: email.value,
            phone: phone.value
        }

        fetch(`${import.meta.env.VITE_API_URL}/stores`, {
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
            //console.log(data);
            if (data.status === "success") {
                console.log("success");
                test.value = data.data._id;
                console.log(test.value);
            } else {
                console.log("error");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }



</script>

<template>
    <div class="upload">
        <h2 class="subtitle">Store information</h2>
        <p class="section_description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore.
        </p>

        <div class="input_grid">
            <div class="text_input">
                <label for="name">Store name</label>
                <input class="inputfield" type="text" id="name" name="name" v-model="name">
            </div>

            <div class="text_input">
                <label for="email">Mail</label>
                <input class="inputfield" type="text" id="email" name="email" v-model="email">
            </div>

            <div class="text_input">
                <label for="phone">Phone</label>
                <input class="inputfield" type="text" id="phone" name="phone" v-model="phone">
            </div>
        </div>

        <div class="button-section">
            <a @click="addStore" class="button">Submit</a>
        </div>

        <div class="generate-section">
            <h2 class="subtitle">Generate user information</h2>
            <p class="section_description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore.
            </p>
            <div class="button-section"> 
                <a class="button">Generate user</a>
            </div>

        </div>
    </div>

</template>

<style scoped>

    label {
        font-size: 16px;
        color: black;
        font-weight: 700;
    }
    .subtitle {
        font-size: 18px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        text-transform: capitalize;
    }

    .input_grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
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
        width: 100%;
    }

    .button-section {
        display: flex;
        justify-content: flex-start;
        align-items: center;
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

    .generate-section {
        margin-top: 4rem;
    }

</style>