import { intl } from "@chaoswise/intl";
import React, { useEffect, useState, useCallback } from "react";
import { CWTable as Table, Input, Button, Tooltip, Popconfirm, Modal, Icon ,Form, FormItemWrapper} from "@chaoswise/ui";
// import GetAuth from "@/components/GetAuth";
import { observer, toJS } from "@chaoswise/cw-mobx";
import store from "@/stores/airStore";


import style from "./index.less";

const AirList = observer(() => {
	const { getList, listData } = store;
	const { current = 1, total = 0, records = [], size = 10 } = listData;

    //加载动画
    const [loading, setLoading] = useState(false);


    //初始化新增表单的数据
    const [formData, setFormData] = useState({
        aid: '',
        brand: '',
        color: '',
        level: '',
        model: '',
        price: '',
    });

    //新增modal部分
    const [visible, setVisible] = useState(false);
    const showaddModal = () => {
        setVisible(true);
    }
    const handleClose = () => {
        setVisible(false);
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (formnewdata) => {
        console.log("提交的内容", formData);
        store.added(formnewdata=formData);
        getAirList();
        setVisible(false);
    }


//初始化修改表单的数据
    const [formUpData, setFormUpData] = useState({
        aid: '666',
        brand: '666',
        color: '666',
        level: '666',
        model: '666',
        price: '666',
    });

//修改modal部分
    const [visibleUp, setVisibleUp] = useState(false);
    const showModalUp = () => {
        setVisibleUp(true);
    }
    const handleCloseUp = () => {
        setVisibleUp(false);
    }

    const handleInputChangeUp = (e) => {
        setFormUpData({
            ...formUpData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitUp = (formdataup) => {
        console.log("提交的内容", formUpData);
        store.added(formdataup=formUpData);
        getAirList();
        setVisibleUp(false);
    }


	const columns = [
		{
			title: "空调编号",
			dataIndex: "aid",
			key: "aid",
			sorter: (a, b) => a.aid - b.aid,
			sortDirections: ["descend", "ascend", undefined],
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
			title: "空调品牌",
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
			title: "空调颜色",
			dataIndex: "color",
			key: "color",
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
			title: "节能等级",
			dataIndex: "level",
			key: "level",
			sorter: (a, b) => a.level - b.level,
			sortDirections: ["descend", "ascend", undefined],
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
			title: "空调型号",
			dataIndex: "model",
			key: "model",
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
			title: "空调单价(k)",
			dataIndex: "price",
			key: "price",
			sorter: (a, b) => a.level - b.level,
			sortDirections: ["descend", "ascend", undefined],
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
			title: "创建人",
			dataIndex: "create_name",
			key: "create_name",
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
			title: "创建时间",
			dataIndex: "create_time",
			key: "create_time",
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
			title: "修改时间",
			dataIndex: "update_time",
			key: "update_time",
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
            render:(text,record) => {
                return (
                    <>
                    <Button
                        type="primary"
                        onClick={showModalUp}
                        style={{marginRight: 10}}>
                            修改
                    </Button>
                    <Popconfirm
                        title="确定删除该空调吗？"
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
        let deleteIdmsg=store.deleted(record.carId);
        console.log(deleteIdmsg);
        getAirList();
    }
//获取数据部分
	const getAirList = useCallback(
		async (params = {}) => {
			setLoading(true);
			await getList(params);
			setLoading(false);
		},
		[getList]
	);

	useEffect(() => {
		getAirList({
			current: current,
			size: size,
		});
	}, [getAirList, current, size]);

	const onSearch = (searchParams, current, size) => {
		getAirList({
			current: current,
			size: size,
			...searchParams,
		});
	};

	const changePage = (current, size, searchParams) => {
		getAirList({
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
                            placeholder={"输入搜索内容"}
                            name={"搜索框"}
                            allowClear
                        />
				),
				showLabel: true,
			},
		];
	};



	return (
		<div className={style["air"]}>
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
                                    {"新增"}
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
{/* 新增空调信息表单 */}
            <Modal
                title="新增空调信息"
                visible={visible}
                onCancel={handleClose}
                footer={null}
            >
                <Form
                    layout="vertical"
                >
{/* aid */}
                    <Form.Item
                        label="空调编号"
                        help={formData.aid.length > 0 ? "" : "请输入空调编号"}
                        validateStatus={formData.aid.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写空调编号，请不要重复"
                            iconOption={{
                                icon:
                                <Tooltip title="空调编号是唯一的数字，请不要重复">
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
                    </Form.Item>
{/* 空调品牌 */}
                    <Form.Item
                        label="空调品牌"
                        help={formData.brand.length > 0 ? "" : "请输入空调品牌"}
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
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 空调颜色 */}
                    <Form.Item
                        label="空调颜色"
                        help={formData.color.length > 0 ? "" : "请输入空调颜色"}
                        validateStatus={formData.color.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写空调颜色"
                            iconOption={{
                                icon:
                                <Tooltip title="空调颜色是字符串">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="color"
                                value={formData.color}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 节能等级 */}
                    <Form.Item
                        label="节能等级"
                        help={formData.level.length > 0 ? "" : "请输入生产日期"}
                        validateStatus={formData.level.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写生产日期"
                            iconOption={{
                                icon:
                                <Tooltip title="生产日期是时间">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="level"
                                value={formData.level}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 空调型号 */}
                    <Form.Item
                        label="空调型号"
                        help={formData.model.length > 0 ? "" : "请输入空调型号"}
                        validateStatus={formData.model.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写空调型号"
                            iconOption={{
                                icon:
                                <Tooltip title="空调型号是字符串">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="model"
                                value={formData.model}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 空调单价 */}
                    <Form.Item
                        label="空调单价(k)"
                        help={formData.price.length > 0 ? "" : "请输入单价"}
                        validateStatus={formData.price.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写空调的单价(k)"
                            iconOption={{
                                icon:
                                <Tooltip title="空调单价的单位是千">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="price"
                                value={formData.price}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleSubmit}>提交</Button>
                    </Form.Item>
                </Form>
            </Modal>
{/* 修改商品的Modal  */}
            <Modal
                title="修改空调信息"
                visible={visibleUp}
                onCancel={handleCloseUp}
                footer={null}
            >
                <Form
                    layout="vertical"
                >
{/* aid */}
                    <Form.Item
                        label="空调编号"
                        help={formUpData.aid.length > 0 ? "" : "请输入空调编号"}
                        validateStatus={formUpData.aid.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写空调编号，请不要重复"
                            iconOption={{
                                icon:
                                <Tooltip title="空调编号是唯一的数字，请不要重复">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="aid"
                                value={formUpData.aid}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 空调品牌 */}
                    <Form.Item
                        label="空调品牌"
                        help={formUpData.brand.length > 0 ? "" : "请输入空调品牌"}
                        validateStatus={formUpData.brand.length > 0 ? "success" : "error"}
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
                                value={formUpData.brand}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 空调颜色 */}
                    <Form.Item
                        label="空调颜色"
                        help={formUpData.color.length > 0 ? "" : "请输入空调颜色"}
                        validateStatus={formUpData.color.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写空调颜色"
                            iconOption={{
                                icon:
                                <Tooltip title="空调颜色是字符串">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="color"
                                value={formUpData.color}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 节能等级 */}
                    <Form.Item
                        label="节能等级"
                        help={formUpData.level.length > 0 ? "" : "请输入生产日期"}
                        validateStatus={formUpData.level.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写生产日期"
                            iconOption={{
                                icon:
                                <Tooltip title="生产日期是时间">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="level"
                                value={formUpData.level}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 空调型号 */}
                    <Form.Item
                        label="空调型号"
                        help={formUpData.model.length > 0 ? "" : "请输入空调型号"}
                        validateStatus={formUpData.model.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写空调型号"
                            iconOption={{
                                icon:
                                <Tooltip title="空调型号是字符串">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="model"
                                value={formUpData.model}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 空调单价 */}
                    <Form.Item
                        label="空调单价(k)"
                        help={formUpData.price.length > 0 ? "" : "请输入单价"}
                        validateStatus={formUpData.price.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写空调的单价(k)"
                            iconOption={{
                                icon:
                                <Tooltip title="空调单价的单位是千">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="price"
                                value={formUpData.price}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleSubmitUp}>提交</Button>
                    </Form.Item>
                </Form>
            </Modal>
		</div>
	);
});

export default AirList;
