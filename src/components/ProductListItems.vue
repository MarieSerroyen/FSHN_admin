<script lang="ts" setup>

</script>

<template>
    <div class="section">
        <div class="titles">
            <h3 class="title">Product id</h3>
            <h3 class="title">Added</h3>
            <h3 class="title">Category</h3>
            <h3 class="title">Price</h3>
        </div>

        <div class="items">
            <p class="item name">Name</p>
            <p class="item">Date</p>
            <p class="item">Category</p>
            <p class="item">Price</p>
            <img src="../assets/dropdown-arrow.svg" alt="">
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
        gap: 1rem;
      }

    .title {
        font-size: 16px;
        color: #5C5F66;
        font-weight: 500;
        text-transform: uppercase;
    }

    .name {
        font-size: 15px;
        color: #000000;
        font-weight: 600;
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
    }

</style>