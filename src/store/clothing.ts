import { defineStore } from 'pinia'


export const useClothingStore = defineStore({
    id: 'clothing',
    state: () => ({
        categoryID: ''
    }),
    actions: {
        setCategoryID(id: string) {
            this.categoryID = id
        }
    },
    getters: {
        getCategoryID():any {
            return this.categoryID;
        }
    }
});