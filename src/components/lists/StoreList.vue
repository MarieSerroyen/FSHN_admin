<script lang="ts" setup>

</script>

<template>
    <div class="section">
        <div class="titles">
            <h3 class="title">Store</h3>
            <h3 class="title">Added</h3>
            <h3 class="title">Mail</h3>
            <h3 class="title">Phone</h3>
        </div>

        <div class="items">
            <p class="item name">Store</p>
            <p class="item">date</p>
            <p class="item">mail</p>
            <p class="item">phone</p>
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
      }

    .title {
        font-size: 16px;
        color: #5C5F66;
        font-weight: 500;
        text-transform: uppercase;
    }

    .items {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
    }

    .item {
        font-size: 15px;
        color: #000000;
        font-weight: 400;
    }

    
    .name {
        font-weight: 600;
    }

</style>