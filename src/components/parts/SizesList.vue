<script lang="ts" setup>
    import { ref, Ref } from 'vue'
    import { useClothingStore } from "../../stores/clothing";

    const clothingStore = useClothingStore();

    let sizes:Ref = ref([
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "30",
        "32",
        "34",
        "36",
        "38",
        "40",
        "42",
        "44",
        "46",
        "48",
        "50",
        "52",
        "54",
        "56",
        "58",
        "60",
        "62",
    ]);

    let selectedSizes:Ref = ref([]);

    const selectSize = (e: Event) => {
        const target = e.target as HTMLInputElement;
        
        if (target.checked) {
            selectedSizes.value.push(target.value);
            //console.log (selectedSizes.value);
            clothingStore.setSizes({...selectedSizes.value});
        } else {
            selectedSizes.value = selectedSizes.value.filter((sizes: string) => sizes !== target.value);
            //console.log (selectedSizes.value);
        }
    }
</script>

<template>
    <div class="sizes_section">
        <p>Sizes</p>
        <div class="sizes" v-for="(size, key) in sizes" :key="key" >
            <input type="checkbox" :id="size" :name="size" :value="size" class="size" @change="selectSize">
            <label :for="size">{{ size }}</label>
        </div>

    </div>

</template>

<style scoped>

    p {
        font-size: 16px;
        color: black;
        font-weight: 700;
    }

    .sizes_section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;    
    }
    

</style>