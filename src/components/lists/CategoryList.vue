<script lang="ts" setup>

</script>

<template>
    <div class="list-section">
        <div class="description">
            <h2 class="subtitle">Categroy list</h2>
            <p class="section_description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore.
            </p>
        </div>

        <div class="section">
            <div class="titles">
                <h3 class="title">Category name</h3>
                <h3 class="title">Added</h3>
            </div>

            <div class="items">
                <p class="item name">Name</p>
                <p class="item">Date</p>
                <p class="item">Update</p>
                <p class="item red">Delete</p>
                <img src="../../assets/dropdown-arrow.svg" alt="">
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
        grid-template-columns: repeat(5, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
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

    .red {
        color: #E45757;
    }

</style>