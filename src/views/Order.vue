<script lang="ts" setup>
    import Nav from '../components/NavComponent.vue'

</script>

<template>
    <Nav/>
    <div class="header">
        <h1 class="title">Order management</h1>
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

</style>