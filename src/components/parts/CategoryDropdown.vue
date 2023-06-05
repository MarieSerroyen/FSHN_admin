<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue'
    import { useClothingStore } from "../../stores/clothing";

    const clothingStore = useClothingStore();
    const storeId = ref('');
    const categories:Ref = ref([]);
    const names:Ref = ref([]);
    const categoryID = ref('');
    

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
                const storeID = storeId.value = data.data.storeId;

                getCategory(storeID);
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });
    

    const getCategory = (value:Ref) => {
        fetch(`${import.meta.env.VITE_API_URL}/categories/store/${value}`, {
            
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
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const selectCategory = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        //console.log(value);
        
        getCategoryId(value);
    }

    const getCategoryId = (value:string):void => {
        fetch(`${import.meta.env.VITE_API_URL}/categories/name/${value}`, {
            
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
                categoryID.value = data.data._id;
                //console.log(categoryID.value);
                clothingStore.setCategoryID(categoryID.value);
                //console.log(clothingStore.categoryID);
            })
            .catch((error) => {
                console.log(error);
            });
    }

</script>

<template>

    <div class="select">
        <label for="name">Head category</label>
        <select class="dropdown" name="headCategory" id="headCategory" @click="selectCategory">
            <option v-for="(name, key) in names" :key="key" :value="name">{{ name }}</option>
        </select>
    </div>

</template>

<style scoped>

    label {
        font-size: 16px;
        color: black;
        font-weight: 700;
    }
    .select {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }

    .dropdown {
        height: 30px;
        width: 100%;
    }

</style>