<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue'
    import { useClothingStore } from "../../stores/clothing";

    const clothingStore = useClothingStore();
    const storeId = ref('');
    const collections:Ref = ref([]);
    const names:Ref = ref([]);
    const collectionID = ref('');
    

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

                getCollection(storeID);
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });
    

    const getCollection = (value:Ref) => {
        fetch(`${import.meta.env.VITE_API_URL}/collections/store/${value}`, {
            
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
                collections.value = data.data;
                names.value = data.data.map((category: any) => category.name);
                names.value.unshift("Geen");



            })
            .catch((error) => {
                console.log(error);
            });
    }

    const selectCollection = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        console.log(value);

        if (value === "Geen") {
            collectionID.value = "0";
            clothingStore.setCollectionID(collectionID.value);
        } else {
            getCollectionId(value);
        }
        
        getCollectionId(value);
    }

    const getCollectionId = (value:any):void => {
        fetch(`${import.meta.env.VITE_API_URL}/collections/name/${value}`, {
            
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
                console.log(data);
                collectionID.value = data.data._id;
                clothingStore.setCollectionID(collectionID.value);

            })
            .catch((error) => {
                console.log(error);
            });
    }

</script>

<template>

    <div class="select">
        <label for="name">Collection</label>
        <select class="dropdown" name="collection" id="collection" @click="selectCollection">
            <option v-for="(name, key) in names" :key="key" :value="name">{{ name }}</option>
        </select>
    </div>

</template>

<style scoped>

    label {
        font-size: 14px;
        color: #6B7280;
        font-weight: 600;
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
        height: 49.41px;
        width: 187.71px;
        background: #FFFFFF;
        box-shadow: 0px 4.94124px 19.765px rgba(0, 0, 0, 0.04);
        border-radius: 7.41186px;
        border-color: #FFFFFF;
        color: #5C5F66;
    }
</style>