<script lang="ts" setup>
    import { ref, onBeforeMount } from 'vue'

    const role = ref('');

    onBeforeMount(() => {
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
                //console.log(data);
                role.value = data.data.role;

                if (role.value === "admin") {
                    console.log("admin");
                } else if (role.value === "store") {
                    console.log("store");
                } 
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });

    const logout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("storeID");
        window.location.href = "/login";
    }


</script>

<template>
    <div class="navigation">
        <div>
            <div class="logo">
                <img src="../assets/FSHN.svg" alt="FSHN logo">
            </div>

            <div class="menu">
                <div class="menu-section"> 
                    <div class="menu-item">
                        <h4 class="menu-title">Main menu</h4>
                        <router-link class="menu-links" exact to="/">
                            <img src="../assets/dashboard.svg" alt="">
                            <span>Dashboard</span>
                        </router-link>
                        <router-link class="menu-links" exact to="/order">
                            <img src="../assets/order-management.svg" alt="">
                            <span>Order Management</span>
                        </router-link>
                    </div>

                    <div class="menu-item">
                        <h4 class="menu-title">Products</h4>
                        <router-link class="menu-links" exact to="/product">
                            <img src="../assets/add-products.svg" alt="">
                            <span>Add Products</span>
                        </router-link>
                        <router-link class="menu-links" exact to="/category">
                            <img src="../assets/add-products.svg" alt="">
                            <span>Categories</span>
                        </router-link>
                        <router-link class="menu-links" exact to="/collection">
                            <img src="../assets/product-list.svg" alt="">
                            <span>Collections</span>
                        </router-link>
                        <router-link class="menu-links" exact to="/productlist">
                            <img src="../assets/product-list.svg" alt="">
                            <span>Product List</span>
                        </router-link>
                    </div>

                    <div v-if="role === 'admin'" class="menu-item">
                        <h4 class="menu-title">Admin menu</h4>
                        <router-link class="menu-links" exact to="/store">
                            <img src="../assets/add-products.svg" alt="">
                            <span>Add Stores</span>
                        </router-link>
                        <router-link class="menu-links" exact to="/order">
                            <img src="../assets/order-management.svg" alt="">
                            <span>Order Management</span>
                        </router-link>
                    </div>
                </div>          
            </div>
        </div>       

        <div class="menu-section">
            <div class="menu-item logout">
                <a @click="logout" class="menu-links">
                    <img src="../assets/dashboard.svg" alt="">
                    <span>Logout</span>
                </a>
            </div>
        </div>

        
    </div>

</template>

<style scoped>
    a {
        cursor: pointer;
    }
    .navigation {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        width: 220px;
        background-color: white;
    }

    .logo {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 1.5rem;
    }

    .menu {
        padding-left: 1.5rem;
    }

    .menu-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
    }

    .menu-links {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
    }

    .menu-title {
        font-weight: 400;
        text-transform: uppercase;
        font-size: 11px;
    }

    span {
        font-size: 15px;
        font-weight: 400;
        color: black;
        padding: 0.5rem 0.5rem;
    }

    .menu-section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        padding: 1rem 0;
    }

    .logout {
        padding-left: 1.5rem;
    }
</style>