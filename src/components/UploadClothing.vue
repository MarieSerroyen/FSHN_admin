<script lang="ts" setup>
    //import parts for clothing upload
    import CategoryList from "./parts/CategoryDropdown.vue";
    import SubcategoryList from "./parts/SubcategoryDropdown.vue";
    import CollectionList from "./parts/CollectionDropdown.vue";
    import SizesList from "./parts/SizesList.vue";
    import UploadHeadimage from "./parts/UploadHeadimage.vue";
    import UploadModelimage from "./parts/UploadModelimage.vue";
    import UploadSecondModelimage from "./parts/UploadSecondModelimage.vue";

    import { ref, onMounted, watch, Ref } from 'vue'
    import { storeToRefs } from "pinia";
    import { useClothingStore } from "../stores/clothing";

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
    <div class="container">
        <div class="info">
            <h2 class="subtitle">Product information</h2>
            <p class="section_description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore.
            </p>
            <div class="input_grid">
                <div class="text_input">
                    <label for="name">Name</label>
                    <input class="inputfield" type="text" id="name" name="name" v-model="name">
                </div>

                <div class="text_input">
                    <label for="articleNumber">Article number</label>
                    <input class="inputfield" type="text" id="articleNumber" name="articleNumber" v-model="articleNumber">
                </div>

                <div class="text_input">
                    <label for="brand">Brand</label>
                    <input class="inputfield" type="text" id="brand" name="brand" v-model="brand">
                </div>
            </div>
            
            <div class="text_input description">
                <label for="description">Description</label>
                <textarea class="textarea_input" type="textarea" id="description" name="description" v-model="description"></textarea>
            </div>
            
        </div> 

        <div class="info">
            <h2 class="subtitle">Product variables</h2>
            <p class="section_description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore.
            </p>
            <div class="input_grid_variable">
                <div class="text_input">
                    <label for="colors">Colors</label>
                    <input class="inputfield" type="text" id="colors" name="colors" v-model="colors">  
                </div>

                <div class="text_input">
                    <label for="price">Price</label>
                    <input class="inputfield" type="number" id="price" name="price" v-model="price">  
                </div>

                <div class="text_input">
                    <label for="materials">Materials</label>
                    <input class="inputfield" type="text" id="materials" name="materials" v-model="materials">  
                </div>

                <div class="text_input">
                    <label for="stock">Stock</label>
                    <input class="inputfield" type="number" id="stock" name="stock" v-model="stock">  
                </div>
            </div>        
        </div>      

        <div>
            <SizesList />
        </div>

        <div class="info">
            <h2 class="subtitle">Product categories</h2>
            <p class="section_description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore.
            </p>
            <div class="input_grid">
                <div>
                    <CategoryList /> 
                </div>

                <div>
                    <SubcategoryList />
                </div>

                <div>
                    <CollectionList />
                </div>
            </div>
        </div>
            
        <div class="info">
            <h2 class="subtitle">Product images</h2>
            <p class="section_description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore.
            </p>

            <div>
                <UploadHeadimage />
            </div>

            <div>
                <UploadModelimage />
            </div>

            <div>
                <UploadSecondModelimage />
            </div>
        </div>

        <a class="button" @click="uploadClothing">Submit</a>
    </div>
    
</template>

<style scoped>
    a {
        cursor: pointer;
    }

    label {
        font-size: 16px;
        color: black;
        font-weight: 700;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
    }

    .subtitle {
        font-size: 18px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        text-transform: capitalize;
    }

    .section_description {
        font-size: 16px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }

    .input_grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4rem;
    }

    .input_grid_variable {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4rem;
    }

    .text_input {
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

    .description {
        margin-top: 1rem;
    }

    .textarea_input {
        width: 100%;
        resize: none;
        height: 100px;
    }

    .button {
        background-color: #000000;
        color: #ffffff;
        padding: 0.5rem 1rem;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 1rem;
    }

    
</style>