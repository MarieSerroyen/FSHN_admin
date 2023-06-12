<script lang="ts" setup>
    import BestProductsList from "../components/lists/BestProductsList.vue";

</script>

<template>
    <div class="dashboard">
        <div class="graphs">
            <div class="graph">
                <h2 class="subtitle">Total orders</h2>
                <p class="days">Last 7 days</p>

                <div class="graph-section">
                    <h3 class="number">25.7K</h3>
                    <img src="../assets/graph.png" alt="">
                </div>

                <div class="margin">
                    <img src="../assets/green-arrow.svg" alt="">
                    <p class="percentage green">6%</p>
                    <p>vs last 7 days</p>
                </div>
            </div>

            <div class="graph">
                <h2 class="subtitle">Total profit</h2>
                <p class="days">Last 7 days</p>
                <div class="graph-section">
                    <h3 class="number">50K</h3>
                    <img src="../assets/graph.png" alt="">
                </div>
                <div class="margin">
                    <img src="../assets/green-arrow.svg" alt="">
                    <p class="percentage green">12%</p>
                    <p>vs last 7 days</p>
                </div>
            </div>
        </div>

        <div class="selling-section">
            <div class="best-products-section">
                <div class="title-heading">
                    <h2 class="subtitle">Best selling products</h2>
                    <img class="dots" src="../assets/dots.svg" alt="">
                </div>
                <BestProductsList />                
            </div>

            <div class="best-category-section">
                <div class="title-heading">
                    <h2 class="subtitle">Top selling category</h2>
                    <img class="dots" src="../assets/dots.svg" alt="">
                </div>

                <img class="graph-img" src="../assets/category-graph.png" alt="">
            </div>

        </div>
    </div>  
</template>

<style scoped>
    .graphs {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 4rem;
    }

    .graph {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        padding: 1rem;
        border-radius: 10px;
        background-color: white;
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

    .days {
        margin: 0;
    }

    .graph-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        width: 100%;
        gap: 4rem;
    }

    .number {
        font-size: 32px;
        color: black;
        font-weight: 700;
        margin: 0;
    }

    .margin {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        gap: 1rem;
    }

    .green {
        color: #1EB564;
    }

    .title-heading {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .selling-section{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-top: 29px;
    }

    .best-products-section {
        grid-column: span 2;
        background-color: #ffffff;
    }

    .graph-img {
        width: 100%;
    }

    .best-category-section {
        background-color: #ffffff;
    }

</style>