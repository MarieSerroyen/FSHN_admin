<script lang="ts" setup>
    import Nav from '../components/NavComponent.vue'
    import AddStore from '../components/AddStore.vue'

</script>

<template>
    <Nav/>

    <div class="header">
        <h1 class="title">Add Stores</h1>
    </div>

    <div class="uploads">
        <div>
            <AddStore/>
        </div>

    </div>
</template>

<style scoped>
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 2rem;
    }
    .title {
        font-size: 24px;
        color: black;
    }

    .uploads {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 2rem;
    }
</style>