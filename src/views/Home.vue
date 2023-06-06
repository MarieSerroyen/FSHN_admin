<script lang="ts" setup>
    import Nav from '../components/NavComponent.vue'

    import { ref, onMounted } from 'vue'

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

                if (role.value === "admin") {
                    console.log("admin");
                } else if (role.value === "store") {
                    console.log("store");
                } 
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
    <Nav/>
    <div class="header">
        <h1 class="title">Dashboard</h1>
    </div>

    <div>
        <h2>Role: {{role}}</h2>
        <p v-if="role  === 'admin'">test admin</p>
        <p v-else-if="role === 'store'">test Store</p>
    </div>


</template>

<style scoped>
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