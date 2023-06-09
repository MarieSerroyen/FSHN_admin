<script lang="ts" setup>
    import Nav from '../components/NavComponent.vue'
    import Admin from '../components/AdminHome.vue'
    import Store from '../components/StoreHome.vue'

    import { ref, onMounted } from 'vue'
    import router from '../router'

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        router.push("/login");
    }

    const role = ref('');

    onMounted(() => {
        fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors" 
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (data.status === "success") {
                //console.log(data);
                role.value = data.data.role;
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });

</script>

<template>
    <div class="page">
        <Nav/>
        <div class="content">
            <div class="header">
                <h1 class="title">Dashboard</h1>
                <img src="../assets/Avatar.png" alt="Profile picture">
            </div>

            <div class="admin-section" v-if="role === 'admin'">
                <Admin/>
            </div>

            <div class="store-section" v-else-if="role === 'store'">
                <Store/>
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
</style>