<script lang="ts" setup>
    //import parts for clothing upload
    import CategoryList from "./parts/CategoryList.vue";
    import SubcategoryList from "./parts/SubcategoryList.vue";
    import CollectionList from "./parts/CollectionList.vue";
    import SizesList from "./parts/SizesList.vue";
    import UploadHeadimage from "./parts/UploadHeadimage.vue";
    import UploadModelimage from "./parts/UploadModelimage.vue";
    import UploadSecondModelimage from "./parts/UploadSecondModelimage.vue";

    import { ref, onMounted, watch, Ref } from 'vue'
    import { storeToRefs } from "pinia";
    import { useClothingStore } from "../store/clothing";

    const storeId = ref('');
    const clothingStore = useClothingStore();
    const { categoryID, subcategoryID, collectionID, sizes, headImage, modelImage, modelImage2 } = storeToRefs(clothingStore);

    const emit = defineEmits(["getCategoryID"]);

    let name = ref('');
    let articleNumber = ref('');
    let description = ref('');
    let brand = ref('');
    let colors:Ref = ref([]);
    let price = ref('');
    let materials:Ref = ref([]);
    let stock = ref('');
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

    const uploadClothing = () => {

        emit("getCategoryID", {
            category: tempCategory.value,
            subcategory: tempSubcategory.value,
            collection: tempCollection.value,
            sizes: tempSizes.value,
            headImage: tempHeadImage.value,
            modelImage: tempModelImage.value,
            modelImage2: tempModelImage2.value
            
        });  

        let data = {
            name: name.value,
            articleNumber: articleNumber.value,
            description: description.value,
            brand: brand.value,
            colors: colors.value.split(','),
            sizes: tempSizes.value,
            price: price.value,
            materials: materials.value.split(','),
            category: tempCategory.value,
            subCategories: tempSubcategory.value,
            collectionStore: tempCollection.value,
            headImage: tempHeadImage.value,
            modelImage: tempModelImage.value,
            modelImage2: tempModelImage2.value,
            stock: stock.value,
            store: storeId.value
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
    const tempCollection = ref("");
    const tempSizes:Ref = ref([]);
    const tempHeadImage = ref("");
    const tempModelImage = ref("");
    const tempModelImage2 = ref("");


    watch(categoryID, (value) => {
        tempCategory.value = value;
        //console.log(value);
    });

    watch(subcategoryID, (value) => {
        tempSubcategory.value = value;
        //console.log(value);
    });

    watch(collectionID, (value) => {
        tempCollection.value = value;
        //console.log(value);
    });

    watch(sizes, (values) => {
        tempSizes.value = Object.values(values);        
        //console.log(values);
    });

    watch(headImage, (value) => {
        tempHeadImage.value = value;
        console.log(value);
    });

    watch(modelImage, (value) => {
        tempModelImage.value = value;
        console.log(value);
    });

    watch(modelImage2, (value) => {
        tempModelImage2.value = value;
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
        <SizesList />
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
        <CollectionList />
    </div>

    <div>
        <label for="stock">Stock</label>
        <input type="number" id="stock" name="stock" v-model="stock">  
    </div>

    <div>
        <UploadHeadimage />
    </div>

    <div>
        <UploadModelimage />
    </div>

    <div>
        <UploadSecondModelimage />
    </div>



    <a @click="uploadClothing">submit</a>
</template>

<style scoped>
    a {
        cursor: pointer;
    }
</style>