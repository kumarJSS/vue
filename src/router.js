import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./components/ComicsCharactersList.vue'), name: "Comics Characters List"},
  // { path: '/details/:id', component: () => import('./components/CharacterDetails.vue'), name: "Details", props: true },
  { path: '/compare', component: () => import('./components/ComparingView.vue'), name: "Compare", props: true },
  // { path: '/search', component: () => {
  //     console.log("api call");
  // }, name: "Search" }
]

const router = createRouter({
  base: process.env.BASE_URL,
  mode: 'abstract',
  history: createWebHashHistory(),
  routes,
});

export default router;
export {routes};