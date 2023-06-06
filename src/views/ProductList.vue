<script lang="ts" setup>
    import Nav from '../components/NavComponent.vue'
    import ProductList from '../components/lists/ProductListItems.vue'

</script>

<template>
    <Nav />

    <div class="content">
        <div class="header">
            <h1 class="title">Product list</h1>
        </div>

        <div class="tabs">
            <div class="tab-item">
                <h4 class="tab-title active">All products</h4>
            </div>
            <div class="tab-item">
                <h4 class="tab-title">Tab</h4>
            </div>
            <div class="tab-item">
                <h4 class="tab-title">Tab</h4>
            </div>
            <div class="tab-item">
                <h4 class="tab-title">Tab</h4>
            </div>
            <div class="tab-item">
                <h4 class="tab-title">Tab</h4>
            </div>
            <div class="tab-item">
                <h4 class="tab-title">Tab</h4>
            </div>
            <div class="tab-item">
                <h4 class="tab-title">Tab</h4>
            </div>
            <div class="tab-item">
                <h4 class="tab-title">Tab</h4>
            </div>

        </div>

        <hr class="line">

        <div class="search">
            <input class="search-input" type="text" placeholder="Search by product id">
        </div>

        <div class="list">
            <ProductList />
        </div>
    </div>

</template>

<style scoped>
    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
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

    .search-input {
        background-image: url('../assets/search.svg');
        background-repeat: no-repeat;
        background-position: 10px center;
        background-size: 15px;
        padding-left: 40px;
        border: solid 1px #CCCCCC;
        border-radius: 5px;
        width: 100%;
        height: 40px;
        font-size: 15px;
        color: #5C5F66;
        font-weight: 400;
    }

    .list {
        margin-top: 2rem;
    }

</style>