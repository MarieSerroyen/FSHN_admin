<script lang="ts" setup>
    //import Items from '../lists/OrderItemsList.vue'
    import { ref, Ref, onMounted } from 'vue'


    const storeId = ref('');
    const orders:Ref = ref([]);

    let numberOfOrders = ref(0);

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

                numberOfOrders = orders.value.length;

                //reverse the order of the orders
                orders.value = orders.value.reverse();

                //show the latest 10 orders
                orders.value = orders.value.slice(0, 10);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const dropdown = (_id: string) => {
        console.log('dropdown ' + _id);
    }

    const changeStatus = (id: string) => {
        //get the status
        const status = orders.value.find((order: any) => order._id === id).status;

        fetch(`${import.meta.env.VITE_API_URL}/orders/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors",            
            body: JSON.stringify({
                status: status
            })
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (data.status === "success") {
                console.log(data);

            } else {
                console.log(data);
            }
        })
        .catch((error) => {
            console.log(error);
        });        
    }
</script>

<template>
    <div class="section">
        <div class="titles">
            <h3 class="title">Order id</h3>
            <h3 class="title">Created</h3>
            <h3 class="title">Total</h3>
            <h3 class="title">Profit</h3>
            <h3 class="title">Status</h3>
        </div>
        <div v-for="order in orders" :key="order._id" class="items">
            <p class="item first">#{{order.orderNumber}}</p>
            <p class="item">{{order.date.substring(0,10)}}</p>
            <p class="item">&euro;{{order.amount}}</p>
            <p class="item">&euro;{{order.amount}}</p>
            <select @change="changeStatus(order._id)" v-model="order.status" v-if="order.status === 'pending'" class="status-select yellow">
                <option class="option" value="pending">Pending</option>
                <option class="option" value="confirmed">Confirmed</option>
                <option class="option" value="processing">Processing</option>
            </select>
            <select @change="changeStatus(order._id)" v-model="order.status" v-else-if="order.status === 'confirmed'" class="status-select green">
                <option class="option" value="pending">Pending</option>
                <option class="option" value="confirmed">Confirmed</option>
                <option class="option" value="processing">Processing</option>
            </select>
            <select @change="changeStatus(order._id)" v-model="order.status" v-else-if="order.status === 'processing'" class="status-select blue">
                <option class="option" value="pending">Pending</option>
                <option class="option" value="confirmed">Confirmed</option>
                <option class="option" value="processing">Processing</option>
            </select>
            <a @click="dropdown(order._id)" class="item">
                <img src="../../assets/dropdown-arrow.svg" alt="">
            </a>
        </div>


        <div class="pages">
            <div class="dropdown-showing">
                <p>Showing</p>
                <select class="dropdown" name="subcategory" id="subcategory">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                <p>of {{ numberOfOrders }}</p>
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
        grid-template-columns: repeat(6, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
        gap: 2rem;
        text-align: left;
    }

    .title {
        font-size: 16px;
        color: #5C5F66;
        font-weight: 500;
        text-transform: uppercase;
    }

    .items {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
        align-items: center;
        text-align: left;
        gap: 2rem;
    }

    .item {
        font-size: 15px;
        color: #000000;
        font-weight: 400;
        text-align: left;
    }
    
    .first {
        font-weight: 600;
    }

    .status-select {
        height: 30px;
        width: 100%;
        margin-right: 2rem;
        border-radius: 5px;
        font-weight: 600;
        border-color: transparent;
    }

    .yellow {
        color: #FBC67A;
        background-color: rgba(255, 198, 0, 0.16);
    }

    .green {
        color: #1EB564;
        background-color: rgba(40, 199, 111, 0.16);
    }

    .blue {
        color: #0FB7FF;
        background-color: rgba(15, 183, 255, 0.16);
    }

    /*PAGES*/

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