<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue'
    import { useClothingStore } from "../../stores/clothing";

    const clothingStore = useClothingStore();

    const productID = window.location.pathname.split("/")[2];
    const selectedSizes:Ref = ref([]);
    const productSizes:Ref = ref([]);

    const tempSizes: Ref = ref('');

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


    if (productID !== undefined) {
        onMounted (() => {
        fetch(`${import.meta.env.VITE_API_URL}/clothing/${productID}`, {
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
                    productSizes.value = data.data.sizes;
                                        
                } else {
                    console.log(data);
                    
                }
            })
            .catch((error) => {
                console.log(error);
            });
        });

    }


    const selectSize = (e: Event) => {
        const target = e.target as HTMLInputElement;
        //add already selected sizes to the list
        if (productSizes.value.length > 0) {
            selectedSizes.value = [...selectedSizes.value, ...productSizes.value];

            //only add sizes once to the list
            selectedSizes.value = selectedSizes.value.filter((size: string, index: number) => selectedSizes.value.indexOf(size) === index);
        }

        //remove deselected sizes from the productSizes list
        if (productSizes.value.length > 0) {
            productSizes.value = productSizes.value.filter((size: string) => size !== target.value);

            //remove from upload
            clothingStore.setSizes({...productSizes.value});
        }
        
        if (target.checked) {
            selectedSizes.value.push(target.value);
            clothingStore.setSizes({...selectedSizes.value});
            //return selectedSizes.value;
        } else {
            selectedSizes.value = selectedSizes.value.filter((sizes: string) => sizes !== target.value);

        }

        tempSizes.value = selectedSizes.value.join(",");
    }
</script>

<template>
    <div class="select-section">
        <div class="sizes_section">
            <p>Sizes</p>
            <div class="multiselect">
                <div class="options">
                    <div class="option" v-for="(size, key) in sizes" :key="key">
                        <div class="checkbox">
                            <input v-if="productID === undefined" type="checkbox" :id="size" :name="size" :value="size" class="size" @change="selectSize">
                            <input v-else-if="productID !== undefined" type="checkbox" :id="size" :name="size" :value="size" class="size" @change="selectSize" :checked="productSizes.includes(size)">
                        </div>
                        <div class="text">
                            {{ size }}
                        </div>
                    </div>
                </div>
            </div>
                
        </div>

        <div class="selected-sizes">
            <p>Selected sizes:</p>
            <input v-if="productID === undefined" class="inputfield"  type="text" v-model="tempSizes" readonly> 
            <input v-else-if="productID !== undefined" class="inputfield"  type="text" v-model="tempSizes" readonly>

        </div>

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

    .select-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
    }

    .multiselect{
        min-height: 33px;
        min-width: 222px;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        color: black;
    }

    .multiselect:focus {
        outline: none;
    }

    .options {
        position: sticky;
        top: 34px;
        right: 0;
        left: 0;
        display: flex;
        background: white;
        flex-direction: column;
        min-height: 55px;
        max-height: 188px;
        width: 100%;
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

    .selected-sizes {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .selectedSizesList {
        list-style-type: none;
        padding: 0;
        text-align: left;
    }

    .inputfield {
        height: 40px;
        width: 100%;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        background: #F9FAFB;
    }
    

</style>