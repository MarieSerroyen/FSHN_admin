<script lang="ts" setup>

</script>

<template>
    <div class="section">
        <div class="titles">
            <h3 class="title">Product</h3>
            <h3 class="title">Total orders</h3>
            <h3 class="title">Status</h3>
            <h3 class="title">Price</h3>
        </div>

        <div class="items">
            <p class="item name">HALF-PLACKET SHORT-SLEEVED SHIRT</p>
            <p class="item">413</p>
            <li class="item green">Stock</li>
            <p class="item">&euro;59,00</p>
        </div>
        <div class="items">
            <p class="item name">WASHED-COTTON TOTE</p>
            <p class="item">378</p>
            <li class="item green">Stock</li>
            <p class="item">&euro;59,00</p>
        </div>
        <div class="items">
            <p class="item name">LIGHT BLUE KNITTED SHORTS</p>
            <p class="item">211</p>
            <li class="item green">Stock</li>
            <p class="item">&euro;25,30</p>
        </div>
        <div class="items">
            <p class="item name">CHECKED KNITTED SHORT-SLEEVED SHIRT</p>
            <p class="item">104</p>
            <li class="item red">Out</li>
            <p class="item">&euro;99,00</p>
        </div>
        <div class="items">
            <p class="item name">ELASTICATED POPLIN SHORTS</p>
            <p class="item">41</p>
            <li class="item green">Stock</li>
            <p class="item">&euro;45,00</p>
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
        grid-template-columns: repeat(4, 1fr);
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
        grid-template-columns: repeat(4, 1fr);
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

    .green {
        color: #1EB564;
    }

    .red {
        color: #E45757;
    }

</style>