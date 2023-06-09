<script lang="ts" setup>

</script>

<template> 
    <div class="list-section">
        <div class="description">
            <h2 class="subtitle">Subcategory list</h2>
        </div>

        <div class="section">
            <div class="titles">
                <h3 class="title">Name</h3>
                <h3 class="title">Head category</h3>
                <h3 class="title">Added</h3>
            </div>

            <div class="items">
                <p class="item name">name</p>
                <p class="item">category</p>
                <p class="item">date</p>
                <p class="item blue">Edit</p>
                <p class="item red">Delete</p>
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
        grid-template-columns: repeat(6, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
        text-align: left;
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
        grid-template-columns: repeat(6, 1fr);
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
        font-size: 15px;
        color: #000000;
        font-weight: 600;
    }


    .blue {
        color: #0F60FF;
        cursor: pointer;
    }

    .red {
        color: #E45757;
        cursor: pointer;
    }
</style>