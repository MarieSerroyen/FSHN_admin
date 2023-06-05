<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue'

    const storeId = ref('');
    const categories:Ref = ref([]);

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
            })
            .catch((error) => {
                console.log(error);
            });
    }

</script>

<template>
    <div class="list-section">
        <div class="description">
            <h2 class="subtitle">Categroy list</h2>
            <p class="section_description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore.
            </p>
        </div>

        <div class="section">
            <div class="titles">
                <h3 class="title">Category name</h3>
                <h3 class="title">Added</h3>
            </div>

            <div v-for="category in categories" :key="category._id" class="items">
                <p class="item name">{{category.name}}</p>
                <p class="item">{{category.date.substring(0,10)}}</p>
                <p class="item">Update</p>
                <p class="item red">Delete</p>
                <img src="../../assets/dropdown-arrow.svg" alt="">
            </div>
        </div>
    </div>

</template>

<style scoped> 
    .list-section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
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

    .section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .titles {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
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
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
        align-items: center;
    }

    .item {
        font-size: 15px;
        color: #000000;
        font-weight: 400;
    }

    .red {
        color: #E45757;
    }

</style>