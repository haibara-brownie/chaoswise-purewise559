import { toMobx } from "@chaoswise/cw-mobx";
import { message } from "@chaoswise/ui";
import { orderListPage,orderAdd,getbrandbyid,getairidbrand,orderSearch,orderDelete } from "@/services/airOrderServices";


// 设置数据接收
const model = {
    namespace: 'airOrderStore',
    state: {
        listData:{},
        // inputSearchName:'',
    },
    effects:{
        *getList(params) {
            const res = yield orderListPage(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("res====>",res);
                console.log("获取成功");
                this.listData = res.data;
            }
            else{
                message.error(
                    (res && res.msg) || '商品列表获取失败'
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
        *added(params){
            const res = yield orderAdd(params);
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
            )
            ;
        },
        *airListget() {
            const res = yield getairidbrand();
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("res====>",res);
                console.log("获取成功");
                // this.listData = res.data;
            }
            else{
                message.error(
                    (res && res.msg) || '商品列表获取失败'
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
        *brandget(params) {
            const res = yield getbrandbyid(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("res====>",res);
                console.log("获取成功");
                // this.listData = res.data;
            }
            else{
                message.error(
                    (res && res.msg) || '商品列表获取失败'
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
        *searched(params){
            const res = yield orderSearch(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("查询成功");
                console.log("res====>",res);
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
        *deleted(params){
            console.log("shanchupar====>",params);
            const res = yield orderDelete(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("删除成功");
                console.log("res====>",res);
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
            );
        },
    },
};

export default toMobx(model);