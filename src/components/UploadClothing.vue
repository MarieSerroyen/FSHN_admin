<script lang="ts" setup>
    import CategoryList from "./CategoryList.vue";
    import SubcategoryList from "./SubcategoryList.vue";

    import { ref, onMounted, watch, Ref } from 'vue'
    import { storeToRefs } from "pinia";
    import { useClothingStore } from "../store/clothing";

    const clothingStore = useClothingStore();
    const { categoryID, subcategoryID } = storeToRefs(clothingStore);

    const emit = defineEmits(["getCategoryID"]);

    let imageUrl = ref('');
    let modelImageUrl = ref('');
    let modelImage2Url = ref('');
    let name = ref('');
    let articleNumber = ref('');
    let description = ref('');
    let brand = ref('');
    let colors:Ref = ref([]);
    let price = ref('');
    let materials:Ref = ref([]);
    let stock = ref('');
    let store = ref('');

    let sizes:Ref = ref([
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "30",
        "32",
        "34",
        "36",
        "38",
        "40",
        "42",
        "44",
        "46",
        "48",
        "50",
        "52",
        "54",
        "56",
        "58",
        "60",
        "62",
    ]);

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
                store.value = data.data.name;
                //console.log(store.value);
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });


    const select = (e: Event) => {
        const target = e.target as HTMLInputElement;
        
        if (target.checked) {
            sizes.value.push(target.value);
            //console.log (sizes.value);
        } else {
            sizes.value = sizes.value.filter((sizes: string) => sizes !== target.value);
            //console.log (sizes.value);
        }
    }


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

        })
        .catch(error => {
            console.log(error);
        });
    }

    const uploadClothing = () => {
        emit("getCategoryID", {
            category: tempCategory.value,
            subcategory: tempSubcategory.value
            
        });  

        let data = {
            name: name.value,
            articleNumber: articleNumber.value,
            description: description.value,
            brand: brand.value,
            colors: colors.value.split(','),
            sizes: sizes.value,
            price: price.value,
            materials: materials.value.split(','),
            category: tempCategory.value,
            subCategories: tempSubcategory.value,
            collectionStore:"sfdlfksdf",
            headImage: imageUrl.value,
            modelImage: modelImageUrl.value,
            modelImage2: modelImage2Url.value,
            stock: stock.value,
            store: store.value
        }

        console.log(data);

        fetch(`${import.meta.env.VITE_API_URL}/clothing`, {
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
    const tempSubcategory = ref("");


    watch(categoryID, (value) => {
        tempCategory.value = value;
        console.log(value);
    });

    watch(subcategoryID, (value) => {
        tempSubcategory.value = value;
        console.log(value);
    });

</script>

<template>
    <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" v-model="name">
    </div>

    <div>
        <label for="articleNumber">Article number</label>
        <input type="text" id="articleNumber" name="articleNumber" v-model="articleNumber">
    </div>

    <div>
        <label for="description">Description</label>
        <input type="textarea" id="description" name="description" v-model="description">
    </div>

    <div>
        <label for="brand">Brand</label>
        <input type="text" id="brand" name="brand" v-model="brand">
    </div>

    <div>
        <p>Sizes</p>
        <div>
            <input type="checkbox" id="S" name="S" class="size" value="S" @change="select">
            <label for="S">S</label>
        </div>

        <div>
            <input type="checkbox" id="M" name="M" class="size" value="M" @change="select">
            <label for="M">M</label>
        </div>

        <div>
            <input type="checkbox" id="L" name="L" class="size" value="L" @change="select">
            <label for="L">L</label>
        </div>
    </div>

    <div>
        <label for="colors">Colors</label>
        <input type="text" id="colors" name="colors" v-model="colors">  
    </div>

    <div>
        <label for="price">Price</label>
        <input type="number" id="price" name="price" v-model="price">  
    </div>

    <div>
        <label for="materials">Materials</label>
        <input type="text" id="materials" name="materials" v-model="materials">  
    </div>

    <div>
        <CategoryList /> 
    </div>

    <div>
        <SubcategoryList />
    </div>

    <div>
        <label for="stock">Stock</label>
        <input type="number" id="stock" name="stock" v-model="stock">  
    </div>

    <div>
        <label for="fileUpload">Upload image</label>
        <input @change="uploadImage" type="file" id="fileUpload" name="fileUpload">
    </div>

    <div>
        <label for="fileUpload">Upload image</label>
        <input @change="uploadImage" type="file" id="fileUpload" name="fileUpload">
    </div>

    <div>
        <label for="fileUpload">Upload image</label>
        <input @change="uploadImage" type="file" id="fileUpload" name="fileUpload">
    </div>



    <a @click="uploadClothing">submit</a>
</template>

<style scoped>
    a {
        cursor: pointer;
    }
</style>