<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue'

    const storeId = ref('');
    const orders:Ref = ref([]);

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

                getOrders(storeID);
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });

    const getOrders = (value:Ref) => {
        fetch(`${import.meta.env.VITE_API_URL}/orders/store/${value}`, {
            
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
                orders.value = data.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
</script>

<template>
     <div class="section">
        <div class="titles">
            <h3 class="title">Id</h3>
            <h3 class="title">Status</h3>
            <h3 class="title">Price</h3>
        </div>

        <div v-for="order in orders" :key="order._id" class="items">
            <p class="item name">{{order._id}}</p>
            <p class="item">506</p>
            <p class="item">&euro;{{order.amount}}</p>
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
        grid-template-columns: repeat(3, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
        justify-content: space-between;
        text-align: left;
    }

    .title {
        font-size: 15px;
        color: #5C5F66;
        font-weight: 500;
        text-transform: uppercase;
    }

    .items {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
        justify-content: space-between;
        align-items: center;
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
    }

</style>

