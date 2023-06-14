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
    import router from '../router';

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
    const subcategory:Ref = ref([])
    const subcategoryNames:Ref = ref([]);
    const tempSubCat:Ref = ref('');

    const errorMessage = ref('');
    const successMessage = ref('');

    const productID = window.location.pathname.split("/")[2];
    console.log(productID);

    //update form data if productID is defined
    const productName: Ref = ref('');
    const productArticleNumber: Ref = ref('');
    const productBrand: Ref = ref('');
    const productDescription: Ref = ref('');
    const productColors:Ref = ref([]);
    const productPrice: Ref = ref('');
    const productMaterials:Ref = ref([]);
    const productStock: Ref = ref('');
    const productHeadImage: Ref = ref('');
    const productModelImage: Ref = ref('');
    const productModelImage2: Ref = ref('');
    const productSizes:Ref = ref([]);
    const productCategory: Ref = ref('');
    const productSubcategory: Ref = ref('');
    const productCollection: Ref = ref('');
    
    onMounted(() => {
        if (productID === undefined) {
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
                    //console.log(storeId.value);
                } else {
                    console.log(data);
                    
                }
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            fetch(`${import.meta.env.VITE_API_URL}/clothing/${productID}`, {
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
                    productName.value = data.data.name;
                    productArticleNumber.value = data.data.articleNumber;
                    productBrand.value = data.data.brand;
                    productDescription.value = data.data.description;
                    productColors.value = data.data.colors;
                    productPrice.value = data.data.price;
                    productMaterials.value = data.data.materials;
                    productStock.value = data.data.stock;
                    productHeadImage.value = data.data.headImage;
                    productModelImage.value = data.data.modelImage;
                    productModelImage2.value = data.data.modelImage2;
                    productSizes.value = data.data.sizes;
                    productCategory.value = data.data.category;
                    productSubcategory.value = data.data.subCategories;
                    productCollection.value = data.data.collectionStore;

                    tempSubCat.value = data.data.subCategories[0];

                } else {
                    console.log(data);
                    
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        
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

        //check if colors and materials are empty
        if (colors.value.length === 0) {
            colors.value = [''];
        } else {
            colors.value = colors.value.split(',');
        }

        if (materials.value.length === 0) {
            materials.value = [''];
        } else {
            materials.value = materials.value.split(',');
        }

        let data = {
            name: name.value,
            articleNumber: articleNumber.value,
            description: description.value,
            brand: brand.value,
            colors: colors.value,
            sizes: tempSizes.value,
            price: price.value,
            materials: materials.value,
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

                const message = document.querySelector('.form-validation');
                message?.classList.toggle('hidden');
            } else {
                console.log("error");

                const message = document.querySelector('.form-validation');
                message?.classList.toggle('hidden');
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

    function getSubcategory(category: string){
        console.log(category);
        // get subcategories based on category
        fetch(`${import.meta.env.VITE_API_URL}/subCategories/category/${category}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === "success") {
                    subcategory.value = data.data;
                    subcategoryNames.value = data.data.map((category: any) => category.name);
                } else {
                    console.log(data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    watch(categoryID, (value) => {
        tempCategory.value = value;

        getSubcategory(value);
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

    const updateClothing = (id: string) => {

        if (tempHeadImage.value === '') {
            tempHeadImage.value = productHeadImage.value;
        }

        if (tempModelImage.value === '') {
            tempModelImage.value = productModelImage.value;
        }

        if (tempModelImage2.value === '') {
            tempModelImage2.value = productModelImage2.value;
        }

        if (tempSizes.value.length === 0) {
            tempSizes.value = productSizes.value;
        }

        if (tempCategory.value === '') {
            tempCategory.value = productCategory.value;
        }

        if (tempSubcategory.value === '') {
            tempSubcategory.value = productSubcategory.value;
        }

        if (tempCollection.value === '') {
            tempCollection.value = productCollection.value;
        }

        let data = {
            name: productName.value,
            articleNumber: productArticleNumber.value,
            description: productDescription.value,
            brand: productBrand.value,
            colors: productColors.value,
            sizes: tempSizes.value,
            price: productPrice.value,
            materials: productMaterials.value,
            category: tempCategory.value,
            subCategories: tempSubcategory.value,
            collectionStore: tempCollection.value,
            headImage: tempHeadImage.value,
            modelImage: tempModelImage.value,
            modelImage2: tempModelImage2.value,
            stock: productStock.value
        }

        fetch(`${import.meta.env.VITE_API_URL}/clothing/${id}`, {
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
                    router.push('/productlist');
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
    <div class="container">
        <div class="info">
            <h2 class="subtitle">General information<span class="required">*</span></h2>
            <p class="section_description">
                To start selling, all you need is a name and a price.
            </p>
            <div class="input_grid">
                <div class="text_input">
                    <label for="name">Title<span class="required">*</span></label>
                    <input v-if="productID === undefined" class="inputfield" type="text" id="name" name="name" v-model="name">
                    <input v-else-if="productID !== undefined" class="inputfield" type="text" id="name" name="name" v-model="productName">
                </div>

                <div class="text_input">
                    <label for="articleNumber">Article number<span class="required">*</span></label>
                    <input v-if="productID === undefined" class="inputfield" type="text" id="articleNumber" name="articleNumber" v-model="articleNumber">
                    <input v-else-if="productID !== undefined" class="inputfield" type="text" id="articleNumber" name="articleNumber" v-model="productArticleNumber">
                </div>

                <div class="text_input">
                    <label for="brand">Brand</label>
                    <input v-if="productID === undefined" class="inputfield" type="text" id="brand" name="brand" v-model="brand">
                    <input v-else-if="productID !== undefined" class="inputfield" type="text" id="brand" name="brand" v-model="productBrand">
                </div>
            </div>
            
            <div class="text_input description">
                <label for="description">Description<span class="required">*</span></label>
                <textarea v-if="productID === undefined" class="textarea_input" type="textarea" id="description" name="description" v-model="description"></textarea>
                <textarea v-else-if="productID !== undefined" class="textarea_input" type="textarea" id="description" name="description" v-model="productDescription"></textarea>
            </div>
            
        </div> 

        <div class="info">
            <h2 class="subtitle">Product variables</h2>
            <p class="section_description">
                Fill in your basic product information here. 
            </p>
            <div class="input_grid_variable">
                <div class="text_input">
                    <label for="colors">Colors</label>
                    <input v-if="productID === undefined" class="inputfield" type="text" id="colors" name="colors" v-model="colors"> 
                    <input v-else-if="productID !== undefined" class="inputfield" type="text" id="colors" name="colors" v-model="productColors">   
                </div>

                <div class="text_input">
                    <label for="price">Price</label>
                    <input v-if="productID === undefined" class="inputfield" type="number" id="price" name="price" v-model="price">  
                    <input v-else-if="productID !== undefined" class="inputfield" type="number" id="price" name="price" v-model="productPrice">  
                </div>

                <div class="text_input">
                    <label for="materials">Materials</label>
                    <input v-if="productID === undefined" class="inputfield" type="text" id="materials" name="materials" v-model="materials">  
                    <input v-else-if="productID !== undefined" class="inputfield" type="text" id="materials" name="materials" v-model="productMaterials">  
                </div>

                <div class="text_input">
                    <label for="stock">Stock</label>
                    <input v-if="productID === undefined" class="inputfield" type="number" id="stock" name="stock" v-model="stock">
                    <input v-else-if="productID !== undefined" class="inputfield" type="number" id="stock" name="stock" v-model="productStock">    
                </div>
            </div>        
        </div>      

        <div>
            <SizesList />
        </div>

        <div class="info">
            <h2 class="subtitle">Product categories<span class="required">*</span></h2>
            <p class="section_description">
                Link the product to its corresponding categories. 
            </p>
            <div class="input_grid">
                <div>
                    <CategoryList/> 
                </div>

                <div>
                    <SubcategoryList :subCategories="subcategory" :names="subcategoryNames" :activeSubCategory="tempSubCat"/>
                </div>

                <div>
                    <CollectionList />
                </div>
            </div>
        </div>
            
        <div class="info">
            <h2 class="subtitle">Media</h2>
            <p class="section_description">
                Upload your product images here. The product image will be used as the try on image for your customers. The other two images will show the clothing on your models and will be used on the item detail screen. 
            </p>

            <div class="image-upload-section">
                <div class="upload-component">
                    <UploadHeadimage />
                    <div v-if="productID !== undefined" class="showImage">
                        <img class="product-image" :src="productHeadImage" alt="Clothing item image">
                    </div>
                </div>

                <div class="upload-component">
                    <UploadModelimage />
                    <div v-if="productID !== undefined" class="showImage">
                        <img class="product-image" :src="productModelImage" alt="Clothing item image">
                    </div>
                </div>

                <div class="upload-component">
                    <UploadSecondModelimage />
                    <div v-if="productID !== undefined" class="showImage">
                        <img class="product-image" :src="productModelImage2" alt="Clothing item image">
                    </div>
                </div>
            </div>


        </div>

        <div class="form-validation hidden">
            <p class="error-message">{{ errorMessage }}</p>
            <p class="success-message">{{ successMessage }}</p>
        </div>

        <div class="submit_section"> 
            <a v-if="productID === undefined" class="button" @click="uploadClothing">Submit</a>
            <a v-else-if="productID !== undefined" class="button" @click="updateClothing(productID)">Update</a>
        </div>

    </div>
    
</template>

<style scoped>
    a {
        cursor: pointer;
    }

    label {
        font-size: 14px;
        color: #6B7280;
        font-weight: 600;
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
        flex-direction: row;
        align-items: flex-start;
        text-transform: capitalize;
    }

    .required {
        color: #F43F5E;
    }

    .section_description {
        font-size: 16px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        text-align: left;
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
        height: 40px;
        width: 100%;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        background: #F9FAFB;
    }

    .description {
        margin-top: 1rem;
    }

    .textarea_input {
        width: 100%;
        resize: none;
        height: 88px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        background: #F9FAFB;
        padding: 1rem;
    }

    .image-upload-section{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4rem;
        align-items: first baseline;
    }

    .showImage {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 2rem;
    }

    .product-image {
        width: 50%;
        height: 100%;
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

    
    .form-validation  {
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

    
</style>