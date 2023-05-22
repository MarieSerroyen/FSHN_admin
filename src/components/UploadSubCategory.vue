<script lang="ts" setup>
    import { ref, onMounted, Ref } from 'vue'

    let subcategoryImgUrl = ref('');
    let name = ref('');

    let store = ref('');
    const categories:Ref = ref([]);
    const names:Ref = ref([]);


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
                store.value = data.data.storeId;
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });

        fetch(`${import.meta.env.VITE_API_URL}/categories/store/COS`, {
            
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors"
            
        }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                categories.value = data.data;
                names.value = data.data.map((category: any) => category.name);
                //console.log(names.value);
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

        let data = {
            name: name.value,
            image: subcategoryImgUrl.value,
            store: store.value,
            category: "646b3425e139a0f8e9b50ea5"
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
</script>

<template>
    <div>
        <label for="name">Subcategory name</label>
        <input type="text" id="name" name="name" v-model="name">
    </div>

    <div>
        <label for="name">Head category</label>
        <select name="headCategory" id="headCategory">
            <option v-for="(name, key) in names" :key="key" :value="key">{{ name }}</option>
        </select>
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