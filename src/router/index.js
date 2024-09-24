
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
//获取路由页面
const Pages = import.meta.glob('@/views/**/*.vue')
// console.log(Pages);
//获取路由页面的配置
const PagesConfig = import.meta.glob('@/views/**/index.json', {
  eager: true,
  import: 'default'
})
// console.log(PagesConfig);

//动态路由方案一
const routes = Object.entries(PagesConfig).map(([path, config]) => {
  let key = path.replace(/\.json$/, '.vue');
  return {
    path: config.path,
    name: config.name,
    component: Pages[key],
    meta: config.meta,
  }
})
console.log(routes);
// console.log(JSON.stringify(routes));
//动态路由方案二(处理子路由,未实现)
// const createRoutes = (PagesConfig) => {
//   return Object.entries(PagesConfig).map(([path, config]) => {
//     // console.log(config);
//     // console.log(path);
//     let key = path.replace(/\.json$/, '.vue');
//     // console.log(Pages[key]);
//     let route = {
//       path: config.path,
//       name: config.name,
//       component: Pages[key],
//       meta: config.meta,
//     }
//     if (config.children) {
//       console.log(config);
//       console.log(path);
//       let keyjosn = `${path.replace(/index\.json$/, '')}${config.path.replace('/', '')}one/index.json`
//       // console.log(Pages[keyjosn.replace(/\.json$/, '.vue')]);
//       // console.log(PagesConfig[keyjosn]);
//       route.children = createRoutes(config.children)
//       route.children.push({
//         path: PagesConfig[keyjosn].path,
//         name: PagesConfig[keyjosn].name,
//         component: Pages[keyjosn.replace(/\.json$/, '.vue')],
//         meta: PagesConfig[keyjosn].meta,
//       })
//     }
//     return route
//   })
// }
// const routes = createRoutes(PagesConfig)
// console.log(routes);
//const map = structuredClone({})//深拷贝对象
//console.log(map);
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...routes]
})
// 导航守卫，用来更新页面标题
router.beforeEach((to, from, next) => {
  // 检查路由的 meta 信息
  if (to.meta.title) {
    document.title = to.meta.title; // 可以根据自己的需要修改标题格式
  } else {
    document.title = 'demo'; // 如果没有设置标题，默认标题
  }
  next();
});
export default router




