<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue'

    const storeId = ref('');
    const products:Ref = ref([]);

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

                getProduct(storeID);
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });

    const getProduct = (value:Ref) => {
        fetch(`${import.meta.env.VITE_API_URL}/clothing/store/${value}`, {
            
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
                products.value = data.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

</script>

<template>
    <div class="section">
        <div class="titles">
            <h3 class="title">Product id</h3>
            <h3 class="title">Added</h3>
            <h3 class="title">Category</h3>
            <h3 class="title">Price</h3>
        </div>

        <div v-for="product in products" :key="product._id" class="items">
            <p class="item name">{{product._id}}</p>
            <p class="item">{{product.date.substring(0,10)}}</p>
            <p class="item">{{product.category}}</p>
            <p class="item">&euro;{{product.price}}</p>
            <img src="../../assets/dropdown-arrow.svg" alt="">
        </div>
    </div>

    <div class="pages">
        <div class="dropdown-showing">
            <p>Showing</p>
            <select class="dropdown" name="subcategory" id="subcategory">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
            <p>of 50</p>
        </div>

        <div class="page-numbers">
            <img class="number-box page-icon" src="../../assets/left-arrow.svg">
            <p class="number-box active">1</p>
            <p class="number-box">2</p>
            <p class="number-box">3</p>
            <p class="number-box">4</p>
            <p class="number-box">5</p>
            <img class="number-box page-icon" src="../../assets/right-arrow.svg">
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
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
        justify-content: space-between;
        text-align: left;
        gap: 2rem;
    }

    .title {
        font-size: 15px;
        color: #5C5F66;
        font-weight: 500;
        text-transform: uppercase;
    }

    .items {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .item {
        font-size: 15px;
        color: #000000;
        font-weight: 400;
        text-align: left;
    }

    .name {
        font-size: 15px;
        color: #000000;
        font-weight: 600;
        text-transform: lowercase;
    }

    
    .pages {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 1rem;
    }

    .dropdown-showing {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
    }

    .dropdown {
        width: 4.5rem;
        height: 2rem;
        border: solid 1px #CCCCCC;
        border-radius: 4px;
        padding: 0 1rem;
        background-color: #FFFFFF;
        color: #000000;
        font-size: 15px;
        font-weight: 400;
    }

    .page-numbers {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
    }

    .number-box {
        width: 2rem;
        height: 2rem;
        border: solid 1px #F1F2F6;
        border-radius: 4px;
        background-color: #F1F2F6;
        color: #000000;
        font-size: 15px;
        font-weight: 400;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .active {
        background-color: #0F60FF;
        color: #FFFFFF;
    }

    .page-icon {
        width: 0.5rem;
    }

</style>