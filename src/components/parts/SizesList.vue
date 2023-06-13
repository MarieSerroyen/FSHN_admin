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

    const handleClick = (_e: Event) => {        
        const select = document.querySelector('.options');
        select?.classList.toggle('hidden');
    }
</script>

<template>
    <div class="sizes_section">
        <p>Sizes</p>
        <div class="multiselect" @click="handleClick">
            <div class="options hidden">
                <div class="option" v-for="(size, key) in sizes" :key="key">
                    <div class="checkbox">
                        <input type="checkbox" :id="size" :name="size" :value="size" class="size" @change="selectSize">
                    </div>
                    <div class="text">
                        {{ size }}
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="sizes" v-for="(size, key) in sizes" :key="key" >
            <input type="checkbox" :id="size" :name="size" :value="size" class="size" @change="selectSize">
            <label :for="size">{{ size }}</label>
        </div>-->

    </div>

</template>

<style scoped>

    p {
        font-size: 14px;
        color: #6B7280;
        font-weight: 600;
    }

    .sizes_section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;    
    }

    .multiselect{
        background: #FFFFFF;
        padding: 6px, 12px;
        border: 1px solid #E5E7EB;
        display: inline-block; 
        border-radius: 7.41186px;
        box-sizing: border-box;
        min-height: 33px;
        min-width: 222px;
        position: relative;
        display: flex;
        flex-wrap: wrap;
    }

    .multiselect:focus {
        outline: none;
    }

    .options {
        position: absolute;
        top: 34px;
        right: 0;
        left: 0;
        display: flex;
        background: white;
        flex-direction: column;
        min-height: 55px;
        max-height: 188px;
        overflow-y: auto;
    }

    .option {
        padding: 6px 11px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .size {
        width: 15px;
        height: 15px;
        border: 1px solid #E5E7EB;
        margin-right: 7px;
        position: relative;
        
    }

    .hidden {
        display: none;
    }
    

</style>