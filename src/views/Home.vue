<script lang="ts" setup>
import UploadClothing from '../components/UploadClothing.vue'
import UploadCategory from '../components/UploadCategory.vue'
import UploadSubCategory from '../components/UploadSubCategory.vue'
import UploadCollection from '../components/UploadCollection.vue'
import Nav from '../components/NavComponent.vue'

</script>

<template>
    <Nav />
    <p>home</p>
    <div>
        <h2>Upload clothing item</h2>
        <UploadClothing />
    </div>

    <div>
        <h2>Upload category</h2>
        <UploadCategory />
    </div>

    <div>
        <h2>Upload subcategory</h2>
        <UploadSubCategory />
    </div>

    <div>
        <h2>Upload collection</h2>
        <UploadCollection />
    </div>

</template>

<style scoped>
</style>