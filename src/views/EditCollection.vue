<script lang="ts" setup>
    import Nav from '../components/NavComponent.vue'
    import UploadCollection from '../components/UploadCollection.vue'
</script>

<template>
    <div class="page">
        <Nav/>
        <div class="content">
            <div class="header">
                <h1 class="title">Edit collection</h1>
                <!-- <img src="../assets/Avatar.png" alt="Profile picture"> -->
            </div>

            <div>
                <UploadCollection/>
            </div>
        </div>

    </div>
</template>

<style scoped>
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
    }
</style>