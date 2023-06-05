<script lang="ts" setup>
    import Nav from '../components/NavComponent.vue'

</script>

<template>
    <Nav />

    <div class="content">
        <div class="header">
            <h1 class="title">Product list</h1>
        </div>
    </div>

</template>

<style scoped>
    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
    }

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
        text-transform: capitalize;
    }

</style>