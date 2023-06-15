<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue'
    import router from '../../router';

    const storeId = ref('');
    const categories:Ref = ref([]);
    const subCategories:Ref = ref({});

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
                categories.value.forEach((category: {_id: string}) => {
                    console.log(category);
                    fetch(`${import.meta.env.VITE_API_URL}/subCategories/category/${category._id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
                        },
                        mode: "cors",
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if (data.status === "success") {
                                subCategories.value[category._id] = data.data;
                            } else {
                                console.log(data);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // const removeItem = (id: string) => {
    //     fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
            
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

    const dropdown = (name: string) => {
        console.log('dropdown ' + name);
       
        //show list of subcategories
        
        const subcategories = document.querySelector(`.subcats-${name}`);
        subcategories?.classList.toggle('hidden');

    }

    const editCategory = (id: string) => {
        router.push({ name: "editcategory", params: { id: id } });
    }

</script>

<template>
    <div class="list-section">
        <div class="description">
            <h2 class="subtitle">Category list</h2>
        </div>

        <div class="section">
            <div class="titles">
                <h3 class="title">Category name</h3>
                <h3 class="title">Added</h3>
            </div>

            <div v-for="category in categories" :key="category._id" class="category__container">
                <div class="items">
                    <p class="item name">{{category.name}}</p>
                    <p class="item">{{category.date.substring(0,10)}}</p>
                    <a @click="editCategory(category._id)">
                        <p class="item blue">Edit</p>
                    </a>
                    <!-- <a @click="removeItem(category._id)">
                        <p class="item red">Delete</p>
                    </a> -->
                    <a></a>
                    <a></a>
                    <a @click="dropdown(category.name)" class="item">
                        <img src="../../assets/dropdown-arrow.svg" alt="">
                    </a>
                </div>

                <div class="subcategory__container hidden" :class="`subcats-${category.name}`">
                    <h4 class="subcategory_title">Subcategories</h4>
                    <div class="subcategoryList" :class="`sub-${category.name}`" v-for="subcat in subCategories[category._id]">
                        {{ subcat.name }}
                    </div>
                </div>

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
        justify-content: space-between;
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
        justify-content: space-between;
        text-align: left;
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

    .subcategories {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
    }

    .subcategory_title{
        text-align: left;
        padding-left: 1.5rem;
        margin-bottom: 0.8rem;
    }

    .subcategorylist {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
        justify-content: space-between;
        text-align: left;
        align-items: center;
    }

    .category__container{
        width: 100%;
    }

    .hidden {
        display: none;
    }

    .subcategoryList{
        padding-left: 1.5rem;
        margin: 0.4rem 0;
        text-align: left;
    }

    .subcategory__container{
        margin-bottom: 2rem;
    }

</style>