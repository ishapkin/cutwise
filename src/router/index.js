import Vue from "vue";
import Router from "vue-router";
import Catalog from "@/components/Catalog";
import Product from "@/components/Product";
import Login from "@/components/Login";
Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: "/products",
            name: "Catalog",
            component: Catalog,
        },
        {
            path: "/products/:id",
            name: "Product",
            component: Product,
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.guest)) {
        return next()
    } else if (!localStorage.getItem('token')) {
        return next({
            path: '/',
            params: { nextUrl: to.fullPath }
        })
    }

    return next();
})

export default router

