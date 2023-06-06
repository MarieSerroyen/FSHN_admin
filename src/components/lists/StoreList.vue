<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue'

    const stores:Ref = ref([]);

    onMounted(() => {
        fetch(`${import.meta.env.VITE_API_URL}/stores`, {
            
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors"
            
        }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                stores.value = data.data;
            })
            .catch((error) => {
                console.log(error);
            });
    });
</script>

<template>
    <div class="section">
        <div class="titles">
            <h3 class="title">Store</h3>
            <h3 class="title">Added</h3>
            <h3 class="title">Mail</h3>
            <h3 class="title">Phone</h3>
        </div>

        <div v-for="store in stores" :key="store._id" class="items">
            <p class="item name">{{store.name}}</p>
            <p class="item">{{store.date.substring(0,10)}}</p>
            <a v-bind:href="`mailto:${store.email}`" class="item">{{store.email}}</a>
            <p class="item">{{store.phone}}</p>
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
        align-items: center;
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