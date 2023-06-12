<script lang="ts" setup>
    import { ref, onMounted } from 'vue'

    let collectionImgUrl = ref('');
    let name = ref('');

    let store = ref('');

    const errorMessage = ref('');
    const successMessage = ref('');

    const collectionID = window.location.pathname.split("/")[2];
    
    const collectionName = ref('');
    const image = ref('');

    onMounted(() => {
        if(collectionID === undefined) {
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
                    //console.log(store.value);
                } else {
                    console.log(data);
                    
                }
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            fetch(`${import.meta.env.VITE_API_URL}/collections/${collectionID}`, {
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
                    collectionName.value = data.data.name;
                    //console.log(categoryName.value);
                    image.value = data.data.image;
                    
                } else {
                    console.log(data);
                    
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        
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
                //console.log("success");
                successMessage.value = data.message;

                const form = document.querySelector('.form-validation');
                form?.classList.toggle('hidden');
            } else {
                //console.log("error");
                errorMessage.value = data.message;                
                
                const form = document.querySelector('.form-validation');
                form?.classList.toggle('hidden');
            }
        })
        .catch(error => {
            console.log(error);
        });
        }
</script>

<template>
    <div class="grid">
        <div class="input">
            <label for="name">Collection name</label>
            <input  v-if="collectionID === undefined" class="inputfield" type="text" id="name" name="name" v-model="name">
            <input  v-else-if="collectionID !== undefined" class="inputfield" type="text" id="name" name="name" v-model="collectionName">
        </div>

        <div class="upload">
            <label for="fileUpload">Upload collection image</label>
            <input @change="uploadCollectionImg" type="file" id="fileUpload" name="fileUpload">
        </div>
    </div>

    <div v-if="collectionID !== undefined" class="showImage">
        <img class="category-image" :src="image" alt="Clothing item image">
    </div>

    <div class="form-validation hidden">
        <p class="error-message">{{ errorMessage }}</p>
        <p class="success-message">{{ successMessage }}</p>
    </div>


    <div class="submit_section">
        <a v-if="collectionID === undefined" class="button" @click="uploadCollection">Submit</a>
        <a v-else-if="collectionID !== undefined" class="button">Update</a>
    </div>

</template>

<style scoped>
    a {
        cursor: pointer;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 4rem;
    }

    .input {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }

    .inputfield {
        height: 30px;
        width: 100%;
    }

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
        margin-top: 1rem;
    }

    .submit_section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .button {
        background-color: #000000;
        color: #ffffff;
        padding: 0.5rem 1rem;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 1rem;
        cursor: pointer;
    }

    .form-validation {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 30px;
        margin-top: 1rem;
    }

    .error-message {
        color: #E45757;
        font-weight: 700;
    }

    .success-message {
        color: #1EB564;
        font-weight: 700;
    }

    .hidden {
        display: none;
    }

    .showImage {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .category-image {
        width: 50%;
        height: 100%;
    }
</style>