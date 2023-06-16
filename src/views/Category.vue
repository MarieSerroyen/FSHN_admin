<script lang="ts" setup>
    import UploadCategory from '../components/UploadCategory.vue'
    import UploadSubCategory from '../components/UploadSubCategory.vue'
    import Nav from '../components/NavComponent.vue'
    import CategoryList from '../components/lists/CategoryList.vue'
    import SubcategoryList from '../components/lists/SubcategoryList.vue'

    import router from '../router'

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        router.push("/login");
    }

</script>

<template>
    <div class="page">
        <Nav />
        <div class="content">
            <div class="header">
                <h1 class="title">Add categories</h1>
                <!-- <img src="../assets/Avatar.png" alt="Profile picture"> -->
            </div>

            <div class="uploads">
                <div>
                    <h2 class="subtitle">Upload category</h2>
                    <p class="section_description">
                        Upload your head categories here. Most used head categories are: Women, Men and Unisex.
                    </p>
                    <UploadCategory />

                    <div class="list">
                        <CategoryList />
                    </div>
                </div>

                <div>
                    <h2 class="subtitle">Upload subcategory</h2>
                    <p class="section_description">
                        Upload your subcategories here. These subcategories can be linked to their head category by selecting the right category in the dropdown menu. 
                    </p>
                    <UploadSubCategory />

                    <div class="list">
                        <SubcategoryList />
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<style scoped>
    .page {
        display: flex;
        flex-direction: row;
    }

    .content {
        flex: 1 1 0;
        padding: 2rem;

        @media (max-width: 768px) {
            padding: 6rem;
        }
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 2rem;
    }
    .title {
        font-size: 24px;
        color: black;
        text-transform: capitalize;
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

    .uploads {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        gap: 2rem;
    }

    .section_description {
        font-size: 16px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        text-align: left;
    }

    .list {
        margin-top: 1rem;
    }
</style>