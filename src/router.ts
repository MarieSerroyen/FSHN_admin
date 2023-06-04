import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Category from './views/Category.vue'
import Collection from './views/Collection.vue'
import Product from './views/Product.vue'

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
        }

    ]
})
