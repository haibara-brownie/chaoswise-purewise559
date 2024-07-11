import { intl } from "@chaoswise/intl";
import React, { useEffect, useState, useCallback } from "react";
import { CWTable as Table, Input, Button, Tooltip, Popconfirm, Modal, Icon ,Form, FormItemWrapper,Select} from "@chaoswise/ui";
// import GetAuth from "@/components/GetAuth";
import { observer, toJS } from "@chaoswise/cw-mobx";
import store from "@/stores/airOrderStores";


import style from "./index.less";

const OrderList = observer(() => {
	const { getList, listData } = store;
	const { current = 1, total = 0, records = [], size = 10 } = listData;

    const [loading, setLoading] = useState(false);


    //初始化新增订单表单的数据
    const [formData, setFormData] = useState({
        oid: '',
        aid: '',
        brand: '',
        quantity: '',
    });

//新增modal部分
    const [visible, setVisible] = useState(false);
// 显示modal
    const showaddModal = () => {
        setVisible(true);
// 置空表单
        setFormData({
            oid: '',
            aid: '',
            brand: '',
            quantity: '',
        });
// 获取空调的数据
        getAirList();
    }

    const handleClose = () => {
        setVisible(false);
    }

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (formdata) => {
        console.log("提交的内容", formData);
        store.added(formdata=formData);
        getOrderList();
        setVisible(false);
    }


// //获取修改表单的数据
//     const [formUpData, setFormUpData] = useState({
//         aid: '666',
//         brand: '666',
//         color: '666',
//         price: '666',
//         productionDate: '666',
//         model: '666',
//     });

    // //修改modal部分
    // const [visibleUp, setVisibleUp] = useState(false);
    // const showModalUp = (record) => {
    //     // console.log("修改的记录", record);
    //     setFormUpData({
    //         // ...formUpData,
    //         aid: record.aid || '',
    //         brand: record.brand || '',
    //         color: record.color || '',
    //         price: record.price || '',
    //         productionDate: record.productionDate || '',
    //         model: record.model || '',
    //     });
    //     setVisibleUp(true);

    // }
    // const handleCloseUp = () => {
    //     setVisibleUp(false);
    // }

    // const handleInputChangeUp = (event) => {
    //     setFormUpData({
    //         ...formUpData,
    //         [event.target.name]: event.target.value
    //     });
    // };

    // const handleSubmitUp = (formdataup) => {
    //     console.log("提交的内容", formUpData);
    //     store.updated(formdataup=formUpData);
    //     getOrderList({
	// 		current: current,
	// 		size: size,
	// 	});
    //     setVisibleUp(false);
    // }


	const columns = [
        {
			title: "订单编号",
			dataIndex: "oid",
			key: "oid",
			render: (text) => {
				return (
                    //气泡提示
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
		{
			title: "编号",
			dataIndex: "aid",
			key: "aid",
			render: (text) => {
				return (
                    //气泡提示
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
		{
			title: "品牌",
			dataIndex: "brand",
			key: "brand",
            render: (text) => {
				return (
                    //气泡提示
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
        {
			title: "数量",
			dataIndex: "quantity",
			key: "quantity",
			render: (text) => {
				return (
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
		// {
		// 	title: "创建人",
		// 	dataIndex: "ocreate_id",
		// 	key: "ocreate_id",
		// 	render: (text) => {
		// 		return (
		// 			<Tooltip
		// 				title={text}
		// 				placement="topLeft">
		// 				<div className={style["table-content"]}>{text}</div>
		// 			</Tooltip>
		// 		);
		// 	},
		// },
        {
			title: "创建时间",
			dataIndex: "ocreate_time",
			key: "ocreate_time",
			render: (text) => {
				return (
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
        {
            title: "操作",
            dataIndex: "actions",
            keys: "actions",
            render:(_,record) => {
                console.log("recordrender===>",record);
                return (
                    <>
                    {/* <Button
                        type="primary"
                        onClick={() =>showModalUp(record)}
                        style={{marginRight: 10}}>
                            修改
                    </Button> */}
                    <Popconfirm
                        title="确定删除该商品吗？"
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={() => {
                            console.log("recordbutton===>",record);
                            deleteClick(record);
                        }}>
                            <Button type="danger" >删除</Button>
                    </Popconfirm>
                </>
                )
            }
        }
	];
//删除按钮部分
    function deleteClick(record) {
        console.log("record===>",record);
        let deleteIdmsg=store.deleted(record.aid);
        console.log(deleteIdmsg);
        getOrderList();
        // window.location.reload();
    }
//获取数据部分
	const getOrderList = useCallback(
		async (params = {}) => {
			setLoading(true);
			await getList(params);
			setLoading(false);
		},
		[getList]
	);

	useEffect(() => {
		getOrderList({
			current: current,
			size: size,
		});
	}, [getOrderList, current, size]);

	const onSearch = (searchParams, current, size) => {
		console.log("searchParams===>",searchParams);
        console.log("current===>",current);
        console.log("size===>",size);
        let newse = {
            current: current,
            size: size,
            brand: searchParams.searchinput,
        }
        console.log("newse===>",newse);
        store.searched(newse).then((res)=>{
            console.log("newse返回res===>",res.data);
        })
	};

	const changePage = (current, size, searchParams) => {
		getOrderList({
			current: current,
			size: size,
			...searchParams,
		});
	};

	const searchContent = () => {
		return [
			{
				components: (
                        <Input
                            id="searchinput"
                            key="searchinput"
                            placeholder={"输入订单id，例ORDER001"}
                            name={"订单id搜索"}
                            allowClear
                        />
				),
				showLabel: true,
			},
		];
	};

    const {Option} = Select;

    const [ idbrand, setIdbrand] = useState([]);

    const getAirList = () =>{
        store.airListget().then((res)=>{
            const extractedIds = [];
            res.data.forEach((item) => {
                const id = item.aid;
                extractedIds.push(id);
            });
            setIdbrand(extractedIds);
            })
            console.log("kkidbrand===>",idbrand);
        }

    // const [idvalue, setIdvalue] = useState("");

    const selectChange = (idval) => {
        console.log(`selected id: ${idval}`);
        // setIdvalue(idval);
        // setFormData((prev)=>{
        //     return {
        //         ...prev,
        //         aid: idval,
        //     }
        // })
        store.brandget(idval).then((res)=>{
            console.log("residbrand===>",res.data);
            setFormData({
                ...formData,
                // aid: res.data.aid,
                // brand: res.data.brand,
                // aid: idval,
                brand: res.data,
            })
            setTimeout(() => {
                console.log("formdataaaaa===>",formData);
            }, 1000);
        });
    }

    const renderIdOptions = () => {
        return idbrand.map((aid) => (
            <Option key={aid} value={aid}>
                {aid}
            </Option>
        ));
    };

	return (
		<div className={style["order"]}>
			<Table
				autoHeight={true}
				loading={loading}
				columns={columns}
				scroll={{ x: 1300 }}
				dataSource={toJS(records)}
				pagination={{
					pageSize: size,
					currentPage: current,
					total: total,
					onChange: changePage,
					onShowSizeChange: changePage,
					showSizeChanger: true,
				}}
				searchBar={{
					onSearch: onSearch,
					extra: () => {
						return [
                            <>
                                <Button
                                    onClick={showaddModal}
                                    type="primary">
                                    {"新增订单"}
                                </Button>
                                {/* <GetAuth
                                    key="Export"
                                    code="1054102401"
                                    render={(hasAuth) => (
                                        <Button
                                            type="primary"
                                            disabled={!hasAuth}>
                                            {"导出"}
                                        </Button>
                                    )}
                                /> */}
                            </>
						];
					},
					searchContent: searchContent(intl),
				}}
			/>
            <Modal
                title="填写表单"
                visible={visible}
                onCancel={handleClose}
                footer={null}
            >
                <Form
                    layout="vertical"
                >
{/* order_id */}
                    <Form.Item
                        label="订单id"
                        help={formData.oid.length > 0 ? "" : "请输入商品id"}
                        validateStatus={formData.oid.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写订单id，请不要重复"
                            iconOption={{
                                icon:
                                <Tooltip title="订单id是唯一的数字，请不要重复">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="oid"
                                value={formData.oid}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* car_id */}
                    <Form.Item
                        label="空调id"
                    >
                        <Form.Item
                            name="aid"
                            rules={[{ required: true, message: '请输入空调id' }]}
                        >
                            <Select
                                placeholder="请选择空调id"
                                onChange={(idval) => selectChange(idval)}
                                value={formData.aid}
                            >
                                {renderIdOptions()}
                            </Select>
                        </Form.Item>
                    </Form.Item>

                    {/* <Form.Item
                        label="商品id"
                        help={formData.aid.length > 0 ? "" : "请输入商品id"}
                        validateStatus={formData.aid.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写商品id，请不要重复"
                            iconOption={{
                                icon:
                                <Tooltip title="商品id是唯一的数字，请不要重复">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="aid"
                                value={formData.aid}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item> */}
{/* 品牌 */}
                    <Form.Item
                        label="品牌"
                        help={formData.brand.length > 0 ? "" : "请输入商品品牌"}
                        validateStatus={formData.brand.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写品牌"
                            iconOption={{
                                icon:
                                <Tooltip title="品牌是字符串">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="brand"
                                value={formData.brand}
                                showCount
                                readOnly
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 数量 */}
                    <Form.Item
                        label="数量"
                        help={formData.quantity.length > 0 ? "" : "请输入空调数量"}
                        validateStatus={formData.quantity.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写空调数量"
                            iconOption={{
                                icon:
                                <Tooltip title="空调数量是整型">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="quantity"
                                value={formData.quantity}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 提交 */}
                    <Form.Item>
                        <Button type="primary" onClick={handleSubmit}>提交</Button>
                    </Form.Item>
                </Form>
            </Modal>
		</div>
	);
});

export default OrderList;
