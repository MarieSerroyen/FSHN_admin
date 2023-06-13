<script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import router from '../router';

    let categoryImgUrl = ref('');
    let name = ref('');

    let storeId = ref('');

    const errorMessage = ref('');
    const successMessage = ref('');

    const categoryID = window.location.pathname.split("/")[2];
    //console.log(categoryID);

    const categoryName = ref('');
    const image = ref('');


    onMounted(() => {
        if (categoryID === undefined) {
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

        } else {
            fetch(`${import.meta.env.VITE_API_URL}/categories/${categoryID}`, {
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
                    categoryName.value = data.data.name;
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

            const categoryImage = document.querySelector('.image-section');
            categoryImage?.classList.remove('hidden');

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

    const updateCategory = (id: string) => {

        if (categoryImgUrl.value === '') {
            categoryImgUrl.value = image.value;
        }

        let data = {
            name: categoryName.value,
            image: categoryImgUrl.value
        }
        fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors",            
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (data.status === "success") {
                successMessage.value = data.message;

                const form = document.querySelector('.form-validation');
                form?.classList.toggle('hidden');

                setTimeout(() => {
                    router.push('/category');
                }, 2000);

            } else {
                errorMessage.value = data.message;

                const form = document.querySelector('.form-validation');
                form?.classList.toggle('hidden');
            }
        })
        .catch((error) => {
            console.log(error);
        });

    }
</script>

<template>
    <div class="grid">
        <div class="input">
            <label for="name">Category name</label>
            <input v-if="categoryID === undefined" class="inputfield" type="text" id="name" name="name" v-model="name">
            <input v-else-if="categoryID !== undefined" class="inputfield" type="text" id="name" name="name" v-model="categoryName">
        </div>

        <div class="upload">
            <label for="fileUpload">Upload category image</label>
            <input @change="uploadCategoryImg" type="file" id="fileUpload" name="fileUpload">
        </div>

        <div class="image-section hidden">
            <img class="category-image" :src="categoryImgUrl">
        </div>

        <div v-if="categoryID !== undefined" class="showImage">
            <img class="category-image" :src="image" alt="Clothing item image">
        </div>
    </div>

    <div class="form-validation hidden">
        <p class="error-message">{{ errorMessage }}</p>
        <p class="success-message">{{ successMessage }}</p>
    </div>

    <div class="submit_section">
        <a v-if="categoryID === undefined" class="button" @click="uploadCategory">Submit</a>
        <a v-else-if="categoryID !== undefined" class="button" @click="updateCategory(categoryID)">Update</a>
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