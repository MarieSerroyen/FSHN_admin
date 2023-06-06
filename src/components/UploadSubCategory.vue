<script lang="ts" setup>
    import SelectCategory from "./parts/CategoryDropdown.vue";
    import { ref, onMounted, watch } from 'vue'
    import { storeToRefs } from "pinia";
    import { useClothingStore } from "../stores/clothing";

    const clothingStore = useClothingStore();
    const { categoryID } = storeToRefs(clothingStore);

    let subcategoryImgUrl = ref('');
    let name = ref('');

    const store = ref('');


    const emit = defineEmits(["getCategoryID"]);


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
                console.log("success");
            } else {
                console.log("error");
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
        
</script>

<template>
    <div class="grid">
        <div class="input">
            <label for="name">Subcategory name</label>
            <input class="inputfield" type="text" id="name" name="name" v-model="name">
        </div>

        <div>
            <SelectCategory />
        </div>

        <div class="upload">
            <label for="fileUpload">Upload subcategory image</label>
            <input @change="uploadSubcategoryImg" type="file" id="fileUpload" name="fileUpload">
        </div>
    </div>


    <div class="submit_section"> 
        <a class="button" @click="uploadSubcategory">submit</a>
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
</style>