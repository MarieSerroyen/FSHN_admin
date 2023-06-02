<script lang="ts" setup>
    import { ref } from 'vue'
    import { useClothingStore } from "../../stores/clothing";

    const clothingStore = useClothingStore();

    let imageUrl = ref('');

    const uploadImage = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files![0];
        let formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_USER_NAME}/image/upload`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            imageUrl.value = (data.secure_url);

            clothingStore.setHeadImage(imageUrl.value);
            
        })
        .catch(error => {
            console.log(error);
        });
    }
</script>

<template>

    <div>
        <label for="fileUpload">Upload image</label>
        <input @change="uploadImage" type="file" id="fileUpload" name="fileUpload">
    </div>

</template>

<style scoped>

</style>