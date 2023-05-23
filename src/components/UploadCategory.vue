<script lang="ts" setup>
    import { ref, onMounted } from 'vue'

    let categoryImgUrl = ref('');
    let name = ref('');

    let storeId = ref('');

    onMounted(() => {
        fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors" 
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (data.status === "success") {
                storeId.value = data.data.storeId;
                //console.log(store.value);
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });

    const uploadCategoryImg = (e: Event) => {
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
            categoryImgUrl.value = (data.secure_url);

        })
        .catch(error => {
            console.log(error);
        });
    }

    const uploadCategory = () => {

        let data = {
            name: name.value,
            image: categoryImgUrl.value,
            store: storeId.value
        }

        fetch(`${import.meta.env.VITE_API_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "success") {
                console.log("success");
            } else {
                console.log("error");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
</script>

<template>
    <div>
        <label for="name">Category name</label>
        <input type="text" id="name" name="name" v-model="name">
    </div>

    <div>
        <label for="fileUpload">Upload category image</label>
        <input @change="uploadCategoryImg" type="file" id="fileUpload" name="fileUpload">
    </div>

    <a @click="uploadCategory">submit</a>
</template>

<style scoped>
    a {
        cursor: pointer;
    }
</style>