import { fetchPost,fetchDelete,fetchGet} from "@chaoswise/request/lib/fetch/methods";


const API = "/gateway/local559";

//分页展示方法
export function airList(
    params = {}
) {
    return fetchPost(
        `${API}/air/backlist`,
        {body: params},
    );
}
//新增数据方法
export function airAdd(
    params = {}
){

    return fetchPost(
        `${API}/air/backadd`,
        {body: params},
    );
}
// 删除数据方法
export function airDelete(params){
    return fetchPost(
        `${API}/air/backdelete/${params}`,
    );
}


// 修改数据方法
export function airUpdate(
    params = {}
){

    return fetchPost(
        `${API}/air/backupdate`,
        {body: params},
    );
}


// 查询数据方法
export function airSearch(params = {}){
    return fetchPost(
        `${API}/air/backSearchParams/`,
        {body: params},
    );
}
// export function airSearch(params){
//     return fetchPost(
//         `${API}/air/backsearch/${params}`,
//     );
// }
