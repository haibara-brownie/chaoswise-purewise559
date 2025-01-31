import { fetchPost, fetchDelete, fetchGet } from "@chaoswise/request/lib/fetch/methods";


const API = "/gateway/local559";

//分页展示方法
export function orderListPage(
    params = {}
) {
    return fetchPost(
        `${API}/orders/backlist`,
        {body: params},
    );
}

//新增数据方法
export function orderAdd(
    params = {}
)
{
    return fetchPost(
        `${API}/orders/backadd`,
        {body: params},
    );
}

export function getbrandbyid(params){
    return fetchPost(
        `${API}/air/getbrand/${params}`,
    )
}

export function getairidbrand(){
    return fetchGet(
        `${API}/air/list`
    )
}

// 查询数据方法
// export function orderSearch(params){
//     return fetchPost(
//         `${API}/orders/backsearch/${params}`,
//     );
// }
export function orderSearch(params={}){
    return fetchPost(
        `${API}/orders/backSearchParams/`,
        {body: params},
    );
}

//删除数据方法
export function orderDelete(params){
    console.log("shanchupar====>",params);
    return fetchPost(
        `${API}/orders/backdelete/${params}`,
    );
}

