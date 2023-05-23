<script lang="ts" setup>
    import UploadCategory from '../components/UploadCategory.vue'
    import UploadSubCategory from '../components/UploadSubCategory.vue'
    import Nav from '../components/NavComponent.vue'

</script>

<template>
    <Nav />
    <p>Upload your clothing categories</p>

    <div>
        <h2>Upload category</h2>
        <UploadCategory />
    </div>

    <div>
        <h2>Upload subcategory</h2>
        <UploadSubCategory />
    </div>

</template>

<style scoped>
</style>