<script lang="ts" setup>
    import SelectCategory from "./parts/CategoryDropdown.vue";
    import { ref, onMounted, watch } from 'vue'
    import { storeToRefs } from "pinia";
    import { useClothingStore } from "../stores/clothing";
    import router from '../router';

    const clothingStore = useClothingStore();
    const { categoryID } = storeToRefs(clothingStore);

    let subcategoryImgUrl = ref('');
    let name = ref('');

    const store = ref('');


    const emit = defineEmits(["getCategoryID"]);

    const errorMessage = ref('');
    const successMessage = ref('');

    const subcategoryID = window.location.pathname.split("/")[2];
    //console.log(subcategoryID);

    const subcategoryName = ref('');
    const image = ref('');
    const subcategoryCategory = ref('');


    onMounted(() => {
        if (subcategoryID === undefined) {
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
                    //const storeID = store.value = data.data.storeId;
                    store.value = data.data.storeId;
                    //getStore(storeID);
                } else {
                    console.log(data);
                    
                }
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            fetch(`${import.meta.env.VITE_API_URL}/subCategories/${subcategoryID}`, {
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
                    subcategoryName.value = data.data.name;
                    //console.log(categoryName.value);
                    image.value = data.data.image;
                    subcategoryCategory.value = data.data.category;
                    
                } else {
                    console.log(data);
                    
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }

        
    });

    const uploadSubcategoryImg = (e: Event) => {
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
            subcategoryImgUrl.value = (data.secure_url);

            const imageSection = document.querySelector('.image-section-subcategory');
            imageSection?.classList.remove('hidden');

        })
        .catch(error => {
            console.log(error);
        });
    }


    const uploadSubcategory = () => {

        emit("getCategoryID", {
            category: tempCategory.value
            
        });        

        let data = {
            name: name.value,
            image: subcategoryImgUrl.value,
            store: store.value,
            category: tempCategory.value
        }

        fetch(`${import.meta.env.VITE_API_URL}/subCategories`, {
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

                const form = document.querySelector('.form-validation-sub ');
                form?.classList.toggle('hidden');
            } else {
                //console.log("error");

                errorMessage.value = data.message;

                const form = document.querySelector('.form-validation-sub ');
                form?.classList.toggle('hidden');
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    const tempCategory = ref("");

    watch(categoryID, (value) => {
        tempCategory.value = value;
        console.log(value);
    });

    const updateSubcategory = (id: string) => {

        if (subcategoryImgUrl.value === '') {
            subcategoryImgUrl.value = image.value;
        }

        if (tempCategory.value === '') {
            tempCategory.value = subcategoryCategory.value;
        }

        let data = {
            name: subcategoryName.value,
            image: subcategoryImgUrl.value,
            category: tempCategory.value
        }
        fetch(`${import.meta.env.VITE_API_URL}/subCategories/${id}`, {
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

                const form = document.querySelector('.form-validation-sub');
                form?.classList.toggle('hidden');

                setTimeout(() => {
                    router.push('/category');
                }, 2000);

            } else {
                errorMessage.value = data.message;

                const form = document.querySelector('.form-validation-sub');
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
            <label for="name">Subcategory title<span class="required">*</span></label>
            <input v-if="subcategoryID === undefined" class="inputfield" type="text" id="name" name="name" v-model="name">
            <input v-else-if="subcategoryID !== undefined" class="inputfield" type="text" id="name" name="name" v-model="subcategoryName">
        </div>

        <div>
            <SelectCategory />
        </div>

        <div class="upload">
            <label for="fileUpload">Upload subcategory image<span class="required">*</span></label>
            <input @change="uploadSubcategoryImg" type="file" id="fileUpload" name="fileUpload">
        </div>

        <div class="image-section-subcategory hidden">
            <img class="subcategory-image" :src="subcategoryImgUrl">
        </div>

        <div v-if="subcategoryID !== undefined" class="showImage">
            <img class="subcategory-image" :src="image" alt="Clothing item image">
        </div>
    </div>

    <div class="form-validation-sub hidden">
        <p class="error-message">{{ errorMessage }}</p>
        <p class="success-message">{{ successMessage }}</p>
    </div>

    <div class="submit_section"> 
        <a v-if="subcategoryID === undefined" class="button" @click="uploadSubcategory">Submit</a>
        <a v-else-if="subcategoryID !== undefined" class="button" @click="updateSubcategory(subcategoryID)" >Update</a>
    </div> 

</template>

<style scoped>
    a {
        cursor: pointer;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
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
        height: 40px;
        width: 100%;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        background: #F9FAFB;
    }

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

    .form-validation-sub  {
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

    .subcategory-image {
        width: 100%;
        height: 100%;
    }

    .required {
        color: #F43F5E;
    }

</style>