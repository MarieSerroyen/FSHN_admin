<script lang="ts" setup>
    import UploadCategory from '../components/UploadCategory.vue'
    import UploadSubCategory from '../components/UploadSubCategory.vue'
    import Nav from '../components/NavComponent.vue'

</script>

<template>
    <Nav />
    <div class="content">
        <div class="header">
            <h1 class="title">Add categories</h1>
        </div>

        <div class="uploads">
            <div>
                <h2 class="subtitle">Upload category</h2>
                <p class="section_description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore.
                </p>
                <UploadCategory />
            </div>

            <div>
                <h2 class="subtitle">Upload subcategory</h2>
                <p class="section_description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore.
                </p>
                <UploadSubCategory />
            </div>
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

    .subtitle {
        font-size: 18px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        text-transform: capitalize;
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