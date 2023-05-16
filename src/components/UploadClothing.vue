<script lang="ts" setup>
    import { ref } from 'vue'

    let imageUrl = ref('');
    let subImages = ref([]);
    let name = ref('');
    let articleNumber = ref('');
    let description = ref('');
    let brand = ref('');
    let colors:any = ref([]);
    let sizes:any =ref([]);
    let price = ref('');
    let materials:any = ref([]);
    let category:any = ref([]);
    let stock = ref('');


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

    /*const uploadSubImages = (e: Event) => {
        const target = e.target as HTMLInputElement;

        //console.log(target.files);

        const files =[target.files![0]] ;
        //console.log(file);
        let formData:any = new FormData();

        //for each file in the list, append it to the formData
        let urls:any = [];
        for (const file of files) {
            const data = file;
            urls.push(data); 
        }

        /*files.forEach((file: any) => {
            formData.append("file", file);
            console.log(formData);
        });*/



        /*formData.append("file", files);
        console.log(formData);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_USER_NAME}/image/upload`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(formData);
            subImages.value = (data.secure_url);

        })
        .catch(error => {
            console.log(error);
        });
    }*/

    const uploadClothing = () => {

        let data = {
            name: name.value,
            articleNumber: articleNumber.value,
            description: description.value,
            brand: brand.value,
            colors: colors.value.split(','),
            sizes: sizes.value,
            price: price.value,
            materials: materials.value.split(','),
            category: category.value.split(','),
            headImage: imageUrl.value,
            subImages: subImages.value,
            stock: stock.value,
            store: "COS"
        }

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

    <!--<div>
        <label for="fileUpload">Upload sub images</label>
        <input @change="uploadSubImages" type="file" id="filesUpload" name="filesUpload" multiple>
    </div>-->

    <a @click="uploadClothing">submit</a>
</template>

<style scoped>
    a {
        cursor: pointer;
    }
</style>