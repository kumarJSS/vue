// This import can be any in your files
// window.Vue = require('vue');
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

import('./main.css')

const app = createApp(App);

// Now any template can access `answer` and `capitalizeFirstLetter()`
app.config.globalProperties = {
    allCharactersList: [],
    capitalizeFirstLetter(str) {
        if (!str) {
            return '';
        }
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    }
};

app.use(router).mount('#app');