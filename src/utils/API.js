import service from './request'
// 模版
// export const MainTable = (params) => {
//     return service({
//         method: 'Post',
//         url: `/GetData/Get`,
//         data: params
//     })
// }
//上传Excel
export const Excel_Post = (params) => {
    console.log(params);

    return service({
        method: 'Post',
        url: `/RequestForm/Formmater`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: params
    })
}
