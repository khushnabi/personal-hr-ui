import "@babel/polyfill";
import Vue from "vue";
import App from "./App";
import Axios from "axios";
import dotenv from "dotenv";
import VueResource from "vue-resource";
import VueRouter from 'vue-router';
import { routes } from "./routes";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
dotenv.config();
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueResource);
// const baseUrl = 'http://personal-hr.local/';
const baseUrl = process.env.API_URL;
Vue.http.options.root = baseUrl;

Axios.defaults.baseURL = `${baseUrl}/api`;

const router = new VueRouter({
    routes,
    mode: 'history'
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})