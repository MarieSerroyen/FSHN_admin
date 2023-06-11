<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue'
    import router from '../../router';

    const storeId = ref('');
    const subcategories:Ref = ref([]);

    //const names:Ref = ref([]);

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
        fetch(`${import.meta.env.VITE_API_URL}/subCategories/store/${value}`, {
            
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
                //console.log(data.data[0].category);
                subcategories.value = data.data;

                /*names.value = data.data.map((category: any) => category.category);
                console.log(names.value);*/
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const removeItem = (id: string) => {
        fetch(`${import.meta.env.VITE_API_URL}/subCategories/${id}`, {            
            method: "DELETE",
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
                router.go(0);
                /*Fixen zodat er geen reload is.  */
            })
            .catch((error) => {
                console.log(error);
            });
    }

</script>

<template> 
    <div class="list-section">
        <div class="description">
            <h2 class="subtitle">Subcategory list</h2>
        </div>

        <div class="section">
            <div class="titles">
                <h3 class="title">Name</h3>
                <h3 class="title">Head category</h3>
                <h3 class="title">Added</h3>
            </div>

            <div v-for="subcategory in subcategories" :key="subcategory._id" class="items">
                <p class="item name">{{subcategory.name}}</p>
                <p class="item">{{subcategory.category}}</p>
                <p class="item">{{subcategory.date.substring(0,10)}}</p>
                <p class="item blue">Edit</p>
                <a @click="removeItem(subcategory._id)">
                    <p class="item red">Delete</p>
                </a>
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
        grid-template-columns: repeat(6, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
        text-align: left;
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
        grid-template-columns: repeat(6, 1fr);
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
        font-size: 15px;
        color: #000000;
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