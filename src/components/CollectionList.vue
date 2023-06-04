<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue'

    const storeId = ref('');
    const collections:Ref = ref([]);

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
            })
            .catch((error) => {
                console.log(error);
            });
    }

</script>

<template>
    <div class="section">
        <div class="titles">
            <h3 class="title">Collection name</h3>
            <h3 class="title">Added</h3>
        </div>

        <div v-for="collection in collections" :key="collection._id" class="items">
            <p class="name">{{collection.name}}</p>
            <p class="date">{{collection.date}}</p>
        </div>

    </div>

</template>

<style scoped>
    .section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .titles {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        border-bottom: solid 1px #CCCCCC;
    }

    .title {
        font-size: 16px;
        color: #5C5F66;
        font-weight: 500;
        text-transform: uppercase;
    }

    .name {
        font-size: 15px;
        color: #000000;
        font-weight: 600;
    }

    .items {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        border-bottom: solid 1px #CCCCCC;
    }

    .date {
        font-size: 15px;
        color: #000000;
        font-weight: 400;
    }
</style>