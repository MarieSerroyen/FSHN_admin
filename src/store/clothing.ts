import { defineStore } from 'pinia'


export const useClothingStore = defineStore({
    id: 'clothing',
    state: () => ({
        categoryID: '',
        subcategoryID: '',
        collectionID: '',
        sizes: [''],
        headImage: '',
        modelImage: '',
        modelImage2: '',
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
        },
        setHeadImage(image: string) {
            this.headImage = image
        },
        setModelImage(image: string) {
            this.modelImage = image
        },
        setModelImage2(image: string) {
            this.modelImage2 = image
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
        },
        getHeadImage():any {
            return this.headImage;
        },
        getModelImage():any {
            return this.modelImage;
        },
        getModelImage2():any {
            return this.modelImage2;
        }
    }
});