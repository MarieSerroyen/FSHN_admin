<script lang="ts" setup>


</script>

<template>
    <div class="navigation">
        <div class="logo">
            <img src="../assets/FSHN.svg" alt="FSHN logo">
        </div>

        <div class="menu">
            <div class="menu-item">
            <h4 class="menu-title">Main menu</h4>
            <a class="menu-links" href="">
                <img src="../assets/dashboard.svg" alt="">
                <span>Dashboard</span>
            </a>
            <a class="menu-links" href="">
                <img src="../assets/order-management.svg" alt="">
                <span>Order Management</span>
            </a>
            </div>

            <div class="menu-item">
                <h4 class="menu-title">Products</h4>
                <a class="menu-links" href="">
                    <img src="../assets/add-products.svg" alt="">
                    <span>Add Products</span>
                </a>
                <a class="menu-links" href="">
                    <img src="../assets/product-list.svg" alt="">
                    <span>Product List</span>
                </a>
            </div>
        </div>

        
    </div>

</template>

<style scoped>
    .navigation {
        position: fixed;
        top: 0;
        left: 0;
        align-items: flex-start;
        justify-content: space-between;
    }

    .logo {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 1rem;
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
</style>