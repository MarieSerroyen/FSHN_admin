<script lang="ts" setup>
    import StoreList from '../components/lists/StoreList.vue'

</script>

<template>
    <div class="home">
        <h2 class="subtitle">Store list</h2>
        <p class="section_description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore.
        </p>

        <div class="list">
            <StoreList/>
        </div>
    </div>


</template>

<style scoped>
    .subtitle {
        font-size: 18px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        text-transform: capitalize;
    }

    .section_description {
        font-size: 16px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }

    .list {
        margin-top: 2rem;
    }

</style>