<script lang="ts" setup>
    import { ref } from 'vue'

    let imageUrl = ref('');
    let name = ref('');
    let articleNumber = ref('');
    let description = ref('');
    let brand = ref('');
    let colors = ref([]);
    let sizes =ref([]);
    let price = ref('');
    let materials = ref([]);
    let category = ref([]);
    let stock = ref('');



    const select = (e: Event) => {
        const target = e.target as HTMLInputElement;
        
        if (target.checked) {
            sizes.value.push(target.value);
            console.log (sizes.value);
        } else {
            sizes.value = sizes.value.filter(sizes => sizes !== target.value);
            console.log (sizes.value);
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

        let data = {
            name: name.value,
            articleNumber: articleNumber.value,
            description: description.value,
            brand: brand.value,
            colors: colors.value,
            sizes: sizes.value,
            price: price.value,
            materials: materials.value,
            category: category.value,
            headImage: imageUrl.value,
            subImages: imageUrl.value,
            stock: stock.value,
            store: "COS"
        }

        fetch("https://fshn-backend.onrender.com/api/v1/clothing", {
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
         <!--<ul>
            <li v-for="size in sizes" :key="size">
                <input type="checkbox" :id="size" :name="size" class="size" :value="size" @click="select">
                <label :for="size">{{ size }}</label>
            </li>
         </ul>-->
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

    <!--<div>
        <label for="sizes">Sizes</label>
        <input type="text" id="sizes" name="sizes" v-model="sizes">  
    </div>-->

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
        <label for="category">Categories</label>
        <input type="text" id="category" name="category" v-model="category">  
    </div>

    <div>
        <label for="stock">Stock</label>
        <input type="number" id="stock" name="stock" v-model="stock">  
    </div>

    <div>
        <label for="fileUpload">Upload image</label>
        <input @change="uploadImage" type="file" id="fileUpload" name="fileUpload">
    </div>
    <a @click="uploadClothing">submit</a>
</template>

<style scoped>
</style>