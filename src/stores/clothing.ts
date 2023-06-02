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
        getCategoryID():string {
            return this.categoryID;
        },
        getSubcategoryID():string {
            return this.subcategoryID;
        },
        getCollectionID():string {
            return this.collectionID;
        },
        getSizes():Array<string>{
            return this.sizes;
        },
        getHeadImage():string {
            return this.headImage;
        },
        getModelImage():string {
            return this.modelImage;
        },
        getModelImage2():string {
            return this.modelImage2;
        }
    }
});