<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue'
    import router from '../../router';

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

    // const removeItem = (id: string) => {
    //     fetch(`${import.meta.env.VITE_API_URL}/collections/${id}`, {
            
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
    //         },
    //         mode: "cors"            
    //     }
    //     )
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             router.go(0);
    //             /*Fixen zodat er geen reload is.  */
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    const editCollection = (id: string) => {
        router.push({ name: "editcollection", params: { id: id } });
    }

</script>

<template>
    <div class="section">
        <div class="titles">
            <h3 class="title">Collection name</h3>
            <h3 class="title">Added</h3>
        </div>

        <div v-for="collection in collections" :key="collection._id" class="items">
            <p class="item name">{{collection.name}}</p>
            <p class="item">{{collection.date.substring(0,10)}}</p>
            <a @click="editCollection(collection._id)">
                <p class="item blue">Edit</p>
            </a>
            <!-- <a @click="removeItem(collection._id)">
                <p class="item red">Delete</p>
            </a> -->
            <!-- <a>
                <img src="../../assets/dropdown-arrow.svg" alt="open collection">
            </a> -->
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
        text-align: left;
        justify-content: flex-start;
        gap: 2rem;
    }

    .title {
        font-size: 16px;
        color: #5C5F66;
        font-weight: 500;
        text-transform: uppercase;
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
        text-align: left;
    }

    .name {
        font-weight: 600;
    }

    .blue {
        color: #0F60FF;
        cursor: pointer;
    }

    .red {
        color: #E45757;
        cursor: pointer;
    }
</style>