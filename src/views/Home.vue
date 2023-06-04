<script lang="ts" setup>
    import Nav from '../components/NavComponent.vue'

</script>

<template>
    <Nav/>
    <div class="header">
        <h1 class="title">Dashboard</h1>
        <img class="avatar_img" src="../assets/Avatar.png" alt="">
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

    .avatar_img {
        width: 100%;
    }
</style>