<script lang="ts" setup>
    import SelectCategory from "./SelectCategory.vue";
    import { ref, onMounted, watch } from 'vue'
    import { storeToRefs } from "pinia";
    import { useClothingStore } from "../store/clothing";

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
    <div>
        <label for="name">Subcategory name</label>
        <input type="text" id="name" name="name" v-model="name">
    </div>

    <div>
        <SelectCategory />
    </div>

    <div>
        <label for="fileUpload">Upload subcategory image</label>
        <input @change="uploadSubcategoryImg" type="file" id="fileUpload" name="fileUpload">
    </div>

    <a @click="uploadSubcategory">submit</a>
</template>

<style scoped>
    a {
        cursor: pointer;
    }
</style>