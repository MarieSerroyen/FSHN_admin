import { defineStore } from 'pinia'


export const useClothingStore = defineStore({
    id: 'clothing',
    state: () => ({
        categoryID: '',
        subcategoryID: '',
    }),
    actions: {
        setCategoryID(id: string) {
            this.categoryID = id
        },
        setSubcategoryID(id: string) {
            this.subcategoryID = id
        }
    },
    getters: {
        getCategoryID():any {
            return this.categoryID;
        },
        getSubcategoryID():any {
            return this.subcategoryID;
        }
    }
});