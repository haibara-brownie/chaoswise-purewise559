import { toMobx } from "@chaoswise/cw-mobx";
import { message } from "@chaoswise/ui";
import { airList,airDelete,airAdd,airUpdate,airSearch } from "@/services/airServices";


// 设置数据接收
const model = {
    namespace: 'airStore',
    state: {
        listData:{},
        // inputSearchName:'',
    },
    effects:{
        //获取分页数据方法并判定成功
        *getList(params) {
            const res = yield airList(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("res====>",res);
                console.log("获取成功");
                this.listData = res.data;
            }
            else{
                message.error(
                    (res && res.msg) || '空调列表获取失败'
                );
                console.log("获取失败");
                console.log("res====>",res);
                console.log("-------------------------");
            }
            console.log("res222====>",res);
            return (
                res
            )
            ;
        },
        // 删除方法并判定是否成功
        *deleted(params){
            console.log("params====>",params);
            const res = yield airDelete(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("res====>",res);
                console.log("删除成功");
            }
            else{
                message.error(
                    (res && res.msg) || '删除失败'
                );
                console.log("删除失败");
                console.log("res====>",res);
                console.log("-------------------------");
            }
            console.log("res222====>",res);
            return (
                res
            )
            ;
        },
        // 新增方法并判定是否成功
        *added(params){
            const res = yield airAdd(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("新增成功");
                console.log("res====>",res);
            }
            else{
                message.error(
                    (res && res.msg) || '新增失败'
                );
                console.log("新增失败");
                console.log("res====>",res);
                console.log("-------------------------");
            }
            console.log("res222====>",res);
            return (
                res
            );
        },
        // 修改方法并判定是否成功
        *updated(params){
            const res = yield airUpdate(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("修改成功");
                console.log("res====>",res);
            }
            else{
                message.error(
                    (res && res.msg) || '修改失败'
                );
                console.log("修改失败");
                console.log("res====>",res);
                console.log("-------------------------");
            }
            console.log("res222====>",res);
            return (
                res
            );
        },
        *searched(params){
            const res = yield airSearch(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("查询成功");
                console.log("res====>",res);
                // const resData = {
                //     current: params.current,
                //     total: params.total,
                //     records: res.data,
                //     size: params.size,
                // }
                // this.listData = resData;
                this.listData = res.data;
            }
            else{
                message.error(
                    (res && res.msg) || '查询失败'
                );
                console.log("查询失败");
                console.log("res====>",res);
                console.log("-------------------------");
            }
            console.log("res222====>",res);
            return (
                res
            );
        },
    },
};

export default toMobx(model);