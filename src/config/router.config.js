module.exports = {
	loadingComponent: "@/components/Loading", // 路由按需加载 loading组件
	noAuthShow: "@/components/NoAuth", // 无权限展示效果
	routes: [
		{
			path: "/404", // 路径
			code: "44", // 唯一code，权限校验用，无code代办无权限
			exact: true, // 是否精确匹配
			dynamic: false, // 是否懒加载
			component: "@/pages/Error",
		},
		{
			path: "/noAuth", // 路径
			exact: true, // 是否精确匹配
			dynamic: false, // 是否懒加载
			component: "@/pages/NoAuth",
		},
		{
			path: "/",
			component: "@/layouts/BasicLayout",
			dynamic: false,
			routes: [
				{
					icon: "unordered-list",
					name: 'intl.get("db4c52ab-41e0-4827-af7d-5c87218d331e").d("日志审计")', //日志审计
					path: "/log-audit",
					component: "@/pages/LogAudit",
					routes: [
						{
							// code: "DOUC-DLRZ",
							icon: "appstore",
							name: 'intl.get("f9ab6c4e-6629-4a32-b0be-e2c7de7fb768").d("登录日志")',
							path: "/log-audit/login-log", //登录日志
							parentPath: "/log-audit",
							component: "@/pages/LogAudit/LoginLog",
						},
					],
				},
				{
					icon: "unordered-list",
					name: "空调信息",
					path: "/air",
					component: "@/pages/Air",
					routes: [
						{
							icon: "appstore",
							name: "空调列表",
							path: "/air/airlist", //空调列表
							parentPath: "/air",
							component: "@/pages/Air/AirList",
						},
						{
							icon: "appstore",
							name: "Clean",
							path: "/air/clean", //商品列表
							parentPath: "/air",
							component: "@/pages/Air/Clean",
						},
					],
				},
				{ from: "/", to: "/log-audit/login-log" },
			],
		},
	],
};
