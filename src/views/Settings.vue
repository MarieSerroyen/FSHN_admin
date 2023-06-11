<script lang="ts" setup>
    import Nav from '../components/NavComponent.vue'
    import AccountForm from '../components/AccountForm.vue'

    import router from '../router'

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        router.push("/login");
    }

</script>

<template>
    <div class="page">
        <Nav/>
        <div class="content">
            <div class="header">
                <h1 class="title">Settings</h1>
                <img src="../assets/Avatar.png" alt="Profile picture">
            </div>
            <div class="section">
                <h2 class="subtitle">Store settings</h2>
                <p class="section_description">
                    Change your store information here. 
                </p>
                <AccountForm/>
            </div>

            <div class="section">
                <h2 class="subtitle">Change password</h2>
                <p class="section_description">
                    Change your password here.
                </p>
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

    .section_description {
        text-align: left;
    }

    .section {
        margin-bottom: 2rem;
    }
</style>