<script lang="ts" setup>
    import UploadClothing from '../components/UploadClothing.vue'
    import Nav from '../components/NavComponent.vue'

    import router from '../router'

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        router.push("/login");
    }

</script>

<template>
    <Nav />
    <div class="content">
        <div class="header">
            <h1 class="title">Add product</h1>
        </div>
        <div>
            <UploadClothing />
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