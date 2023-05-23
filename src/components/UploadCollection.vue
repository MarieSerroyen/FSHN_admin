<script lang="ts" setup>
    import { ref, onMounted } from 'vue'

    let collectionImgUrl = ref('');
    let name = ref('');

    let store = ref('');

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
                store.value = data.data.storeId;
                console.log(store.value);
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });

    const uploadCollectionImg = (e: Event) => {
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
            collectionImgUrl.value = (data.secure_url);

        })
        .catch(error => {
            console.log(error);
        });
    }

    const uploadCollection = () => {

        let data = {
            name: name.value,
            image: collectionImgUrl.value,
            store: store.value
        }

        fetch(`${import.meta.env.VITE_API_URL}/collections`, {
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
        <label for="name">Collection name</label>
        <input type="text" id="name" name="name" v-model="name">
    </div>

    <div>
        <label for="fileUpload">Upload collection image</label>
        <input @change="uploadCollectionImg" type="file" id="fileUpload" name="fileUpload">
    </div>

    <a @click="uploadCollection">submit</a>
</template>

<style scoped>
    a {
        cursor: pointer;
    }
</style>