<script lang="ts" setup>
    import { ref } from 'vue';

    const old_password = ref('');
    const new_password = ref('');
    const confirm_password = ref('');

</script>

<template>
    <div class="container">
        <div class="input_grid">
            <div class="text_input">
                <label for="old_password">Old password</label>
                <input class="inputfield" type="text" id="old_password" name="old_password" v-model="old_password">
            </div>

            <div class="text_input email">
                <label for="new_password">New password</label>
                <input class="inputfield" type="text" id="new_password" name="new_password" v-model="new_password">
            </div>

            <div class="text_input">
                <label for="confirm_password">Confirm new password</label>
                <input class="inputfield" type="text" id="confirm_password" name="confirm_password" v-model="confirm_password">
            </div>
        </div>

        <div>
            <a class="button">Submit</a>
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
</style>