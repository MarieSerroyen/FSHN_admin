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
    <div class="page">
        <Nav />
        <div class="content">
            <div class="header">
                <h1 class="title">Add products</h1>
                <img src="../assets/Avatar.png" alt="Profile picture">
            </div>
            <div class="description">
                <p class="description-text">
                    Before uploading a product we first advise you to upload your clothing categories. We ask this because your clothing items 
                    will need to be linked to your categories. Categories can be uploaded <router-link exact to="/category">here</router-link>. 
                </p>
            </div>
            <div>
                <UploadClothing />
            </div>
        </div>
    </div>
</template>

<style scoped>
    *{
        box-sizing: border-box;
    }

    .page {
        display: flex;
        flex-direction: row;
    }

    .content {
        flex: 1 1 0;
        padding: 2rem;

        @media (max-width: 768px) {
            padding: 6rem;
        }
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

    .description {
        text-align: left;
        width: 80%;
        color: black;
    }
</style>