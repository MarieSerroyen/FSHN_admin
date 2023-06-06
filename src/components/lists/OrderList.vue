<script lang="ts" setup>

</script>

<template>
    <div class="section">
        <div class="titles">
            <h3 class="title">Order id</h3>
            <h3 class="title">Created</h3>
            <h3 class="title">Total</h3>
            <h3 class="title">Profit</h3>
            <h3 class="title">Status</h3>
        </div>
        <div class="items">
            <p class="item first">id</p>
            <p class="item">date</p>
            <p class="item">&euro;85,00</p>
            <p class="item">&euro;85,00</p>
            <select class="status-select">
                <option class="option" value="pending">Pending</option>
                <option class="option" value="confirmed">Confirmed</option>
                <option class="option" value="processing">Processing</option>
                <option class="option" value="picked">Picked</option>
                <option class="option" value="shipped">Shipped</option>
                <option class="option" value="delivered">Delivered</option>
                <option class="option" value="cancelled">Cancelled</option>
            </select>
            <img src="../../assets/dropdown-arrow.svg" alt="">
        </div>

        <div class="pages">
            <div class="dropdown-showing">
                <p>Showing</p>
                <select class="dropdown" name="subcategory" id="subcategory">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                <p>of 50</p>
            </div>

            <div class="page-numbers">
                <img class="number-box page-icon" src="../../assets/left-arrow.svg">
                <p class="number-box active">1</p>
                <p class="number-box">2</p>
                <p class="number-box">3</p>
                <p class="number-box">4</p>
                <p class="number-box">5</p>
                <img class="number-box page-icon" src="../../assets/right-arrow.svg">
            </div>
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
        grid-template-columns: repeat(6, 1fr);
        border-bottom: solid 1px #CCCCCC;
        width: 100%;
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
        gap: 2rem;
    }

    .item {
        font-size: 15px;
        color: #000000;
        font-weight: 400;
    }
    
    .first {
        font-weight: 600;
    }

    .status-select {
        height: 30px;
        width: 100%;
        margin-right: 2rem;
        border-radius: 5px;
    }

    /*PAGES*/

    .pages {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 1rem;
    }

    .dropdown-showing {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
    }

    .dropdown {
        width: 4.5rem;
        height: 2rem;
        border: solid 1px #CCCCCC;
        border-radius: 4px;
        padding: 0 1rem;
        background-color: #FFFFFF;
        color: #000000;
        font-size: 15px;
        font-weight: 400;
    }

    .page-numbers {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
    }

    .number-box {
        width: 2rem;
        height: 2rem;
        border: solid 1px #F1F2F6;
        border-radius: 4px;
        background-color: #F1F2F6;
        color: #000000;
        font-size: 15px;
        font-weight: 400;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .active {
        background-color: #0F60FF;
        color: #FFFFFF;
    }

    .page-icon {
        width: 0.5rem;
    }
</style>