<script lang="ts" setup>
    import { ref } from 'vue'
    import { useClothingStore } from "../../stores/clothing";

    const clothingStore = useClothingStore();

    let modelImage2Url = ref('');

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
            modelImage2Url.value = (data.secure_url);

            clothingStore.setModelImage2(modelImage2Url.value);

            const imageSection = document.querySelector('.image-section-model2 ');
            imageSection?.classList.remove('hidden');
            
        })
        .catch(error => {
            console.log(error);
        });
    }
</script>

<template>

    <div class="upload">
        <label for="fileUpload">Upload second model image</label>
        <input @change="uploadImage" type="file" id="fileUpload" name="fileUpload">
    </div>

    <div class="image-section-model2 hidden">
        <img class="product-image" :src="modelImage2Url">
    </div>

</template>

<style scoped>

    label {
        font-size: 16px;
        color: black;
        font-weight: 700;
    }

    .upload {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
        margin-bottom: 1rem;
    }  
    
    .hidden {
        display: none;
    }

    .product-image {
        width: 50%;
        height: 100%;
    }

</style>