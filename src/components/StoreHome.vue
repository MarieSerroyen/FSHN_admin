<script lang="ts" setup>
    import BestProductsList from "../components/lists/BestProductsList.vue";
    import RecentOrdersList from "../components/lists/RecentOrdersList.vue";

</script>

<template>
    <main id="Home-page">
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

            <div class="bottom-section">
                <div class="popular-products">
                    <div class="title-heading">
                        <h2 class="subtitle">Popular products</h2>
                        <img class="dots" src="../assets/dots.svg" alt="">
                    </div>

                    <div class="products">
                        <div class="product">
                            <div class="product-info">
                                <p class="product-name">Item name</p>
                                <p class="product-number">Item: #FXZ-3456</p>
                            </div>

                            <div class="product-price">
                                <p class="product-price">&euro;85,00</p>
                            </div>
                        </div>

                        <div class="product">
                            <div class="product-info">
                                <p class="product-name">Item name</p>
                                <p class="product-number">Item: #FXZ-3456</p>
                            </div>

                            <div class="product-price">
                                <p class="product-price">&euro;85,00</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="recent-orders">
                    <div class="title-heading">
                        <h2 class="subtitle">Recent orders</h2>
                        <img class="dots" src="../assets/dots.svg" alt="">
                    </div>

                    <RecentOrdersList />
                </div>
            </div>
        </div>
    </main>    
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
    }

    .graph-img {
        width: 70%;
    }

    .bottom-section {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-top: 29px;
    }

    .products {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
    }

    .product {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 1rem;
        text-align: left;
    }

    .product-name {
        font-weight: 700;
        font-size: 15px;
    }

    .product-number {
        font-size: 13px;
        color: #5C5F66;
    }

    .product-price {
        font-size: 15px;
    }

    .recent-orders{
        grid-column: span 2;
    }
</style>