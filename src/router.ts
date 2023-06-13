import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Category from './views/Category.vue'
import Collection from './views/Collection.vue'
import Product from './views/Product.vue'
import ProductList from './views/ProductList.vue'
import Order from './views/Order.vue'
import Store from './views/Store.vue'
import Settings from './views/Settings.vue'
import EditCategory from './views/EditCategory.vue'
import EditSubcategory from './views/EditSubcategory.vue'
import EditCollection from './views/EditCollection.vue'
import EditProduct from './views/EditProduct.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home', 
            component: Home
        },
        {
            path: '/login', 
            name: 'login',
            component: Login
        },
        {
            path: '/category',
            name: 'category',
            component: Category
        },
        {
            path: '/collection',
            name: 'collection',
            component: Collection
        },
        {
            path: '/product',
            name: 'product',
            component: Product
        },
        {
            path: '/productlist',
            name: 'productlist',
            component: ProductList
        },
        {
            path: '/order',
            name: 'order',
            component: Order
        },
        {
            path: '/store',
            name: 'store',
            component: Store
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        },
        {
            path: '/editcategory/:id',
            name: 'editcategory',
            component: EditCategory
        },
        {
            path: '/editsubcategory/:id',
            name: 'editsubcategory',
            component: EditSubcategory
        },
        {
            path: '/editcollection/:id',
            name: 'editcollection',
            component: EditCollection
        },
        {
            path: '/editproduct/:id',
            name: 'editproduct',
            component: EditProduct
        }

    ]
})
