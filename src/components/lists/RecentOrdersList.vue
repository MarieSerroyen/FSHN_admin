<script lang="ts" setup>

</script>

<template>
     <div class="section">
        <div class="titles">
            <h3 class="title">Id</h3>
            <h3 class="title">Status</h3>
            <h3 class="title">Price</h3>
        </div>

        <div class="items">
            <p class="item name">Item name</p>
            <p class="item">506</p>
            <p class="item">&euro;85,00</p>
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

