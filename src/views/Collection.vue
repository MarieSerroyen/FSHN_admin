<script lang="ts" setup>
    import UploadCollection from '../components/UploadCollection.vue'
    import Nav from '../components/NavComponent.vue'
    import CollectionList from '../components/lists/CollectionList.vue'

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
                <h1 class="title">Collections</h1>
            </div>

            <div>
                <h2 class="subtitle">Upload collection</h2>
                <p class="section_description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore.
                </p>
                <UploadCollection />
            </div>

            <div>
                <h2 class="subtitle">Collection list</h2>
                <p class="section_description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore.
                </p>
                <CollectionList />
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

    .subtitle {
        font-size: 18px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        text-transform: capitalize;
    }

</style>