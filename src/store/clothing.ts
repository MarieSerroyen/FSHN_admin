import { defineStore } from 'pinia'


export const useClothingStore = defineStore({
    id: 'clothing',
    state: () => ({
        categoryID: '',
        subcategoryID: '',
        collectionID: '',
        sizes: [''],
    }),
    actions: {
        setCategoryID(id: string) {
            this.categoryID = id
        },
        setSubcategoryID(id: string) {
            this.subcategoryID = id
        },
        setCollectionID(id: string) {
            this.collectionID = id
        },
        setSizes(sizes: string[]) {
            this.sizes = sizes
        }
    },
    getters: {
        getCategoryID():any {
            return this.categoryID;
        },
        getSubcategoryID():any {
            return this.subcategoryID;
        },
        getCollectionID():any {
            return this.collectionID;
        },
        getSizes():any {
            return this.sizes;
        }
    }
});