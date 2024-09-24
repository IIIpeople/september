const user = [{
    path: '/user',
    name: 'user',
    component: () => import('../../views/user/index.vue'),
    meta: {
        title: '用户',
        icon: 'Avatar'
    }
}]
export default user