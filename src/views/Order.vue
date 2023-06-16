<script lang="ts" setup>
    import Nav from '../components/NavComponent.vue'
    import OrderList from '../components/lists/OrderList.vue'

    import router from '../router'

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        router.push("/login");
    }

</script>

<template>
    <div class="page">
        <Nav/>
        <div class="content">
            <div class="header">
                <h1 class="title">Order management</h1>
                <!-- <img src="../assets/Avatar.png" alt="Profile picture"> -->
            </div>

            <div class="tabs">
                <div class="tab-item">
                    <h4 class="tab-title active">All orders</h4>
                </div>
                <!-- <div class="tab-item">
                    <h4 class="tab-title">Pending</h4>
                </div>
                <div class="tab-item">
                    <h4 class="tab-title">Confirmed</h4>
                </div>
                <div class="tab-item">
                    <h4 class="tab-title">Processing</h4>
                </div>
                <div class="tab-item">
                    <h4 class="tab-title">Picked</h4>
                </div>
                <div class="tab-item">
                    <h4 class="tab-title">Shipped</h4>
                </div>
                <div class="tab-item">
                    <h4 class="tab-title">Deliverd</h4>
                </div>
                <div class="tab-item">
                    <h4 class="tab-title">Cancelled</h4>
                </div> -->

            </div>

            <hr class="line">

            <div class="filter-section">
                <div class="search">
                    <!-- <input class="search-input" type="text" placeholder="Search by order id"> -->
                </div>

                <div class="filter">
                    <!-- <select class="filter-select">
                        <option class="option" value="date">Filter by date</option>
                        <option value="Option">Option</option>
                        <option value="Option">Option</option>
                        <option value="Option">Option</option>
                        <option value="Option">Option</option>
                        <option value="Option">Option</option>
                        <option value="Option">Option</option>
                        <option value="Option">Option</option>
                    </select> -->
                </div>
            </div>

            <div class="list">
                <OrderList/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .page {
        display: flex;
        flex-direction: row;
    }

    .content {
        flex: 1 1 0;
        padding: 2rem;

        @media (max-width: 768px) {
            padding: 6rem;
        }
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 2rem;
    }
    .title {
        font-size: 24px;
        color: black;
        text-transform: capitalize;
    }

    .tabs {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        gap: 2rem;
    }

    .tab-title{
        font-size: 15px;
        color: #5C5F66;
        text-transform: capitalize;
        font-weight: 400;
    }

    .active {
        color: #0F60FF;
        border-bottom: solid 2px #0F60FF;
    }

    .line {
        width: 100%;
        border: solid 1px #CCCCCC;
    }

    .filter-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 2rem;
    }

    .filter-select {
        height: 30px;
        width: 100%;
        margin-right: 2rem;
        border-radius: 5px;
    }

    .search-input {
        background-image: url('../assets/search.svg');
        background-repeat: no-repeat;
        background-position: 10px center;
        background-size: 15px;
        padding-left: 40px;
        border: solid 1px white;
        border-radius: 5px;
        width: 100%;
        height: 40px;
        font-size: 15px;
        color: #5C5F66;
        font-weight: 400;
    }

    .list {
        margin-top: 1rem;
    }

</style>