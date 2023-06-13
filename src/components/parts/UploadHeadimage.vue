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

            const imageSection = document.querySelector('.image-section');
            imageSection?.classList.remove('hidden');
            
        })
        .catch(error => {
            console.log(error);
        });
    }
</script>

<template>

    <div class="upload">
        <label for="fileUpload">Upload product image<span class="required">*</span></label>
        <input @change="uploadImage" type="file" id="fileUpload" name="fileUpload">
    </div>

    <div class="image-section hidden">
        <img class="product-image" :src="imageUrl">
    </div>

</template>

<style scoped>

    label {
        font-size: 14px;
        color: #6B7280;
        font-weight: 600;
    }

    .upload {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }

    .hidden {
        display: none;
    }

    .product-image {
        width: 50%;
        height: 100%;
    }

    .required {
        color: #F43F5E;
    }

</style>