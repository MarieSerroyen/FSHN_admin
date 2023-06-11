<script lang="ts" setup>

</script>

<template>
    <div class="section">
        <div class="titles">
            <h3 class="title">Sku</h3>
            <h3 class="title">Name</h3>
            <h3 class="title">Price</h3>
            <h3 class="title">Qty</h3>
            <h3 class="title">Total</h3>
        </div>

        <div class="items">
            <p class="item">#6548</p>
            <p class="item name">Item name</p>
            <p class="item">&euro;85,00</p>
            <p class="item">x1</p>
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
        grid-template-columns: repeat(7, 1fr);
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
        grid-template-columns: repeat(7, 1fr);
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
</style>