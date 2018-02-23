var api = {
    "B886EC8663DD63A457A0EB0D1D2886A9": {
        uri: "applet.php",//短链接
        action: [
            {
                uri: "user/login",
                name: "登陆",
                active: [
                    {
                        name: "account",
                        cn: "账号",
                        req: true,
                        type: "text",
                        eg: "登录账号【手机号|账号】"
                    },
                    {
                        name: "password",
                        cn: "密码",
                        req: true,
                        type: "password",
                        eg: "登录密码"
                    }
                ]
            }, {
                uri: "user/sign",
                name: "登陆验证",
                active: [
                    {
                        name: "account",
                        cn: "账号",
                        req: true,
                        type: "text",
                        eg: "登录账号【手机号|账号】"
                    }
                ]
            }, {
                uri: "user/logout",
                name: "退出登录",
                active: [
                    {
                        name: "account",
                        cn: "账号",
                        req: true,
                        type: "text",
                        eg: "登录账号【手机号|账号】"
                    }
                ]
            }, {
                uri: "order/order_add",
                name: "核销订单",
                active: [
                    {
                        name: "account",
                        cn: "账号",
                        req: true,
                        type: "text",
                        eg: "登录账号【手机号|账号】"
                    }, {
                        name: "code",
                        cn: "核销码",
                        req: true,
                        type: "number",
                        eg: "核销码为8位或19位"
                    }
                ]
            }, {
                uri: "order/order_add",
                name: "核销记录",
                active: [
                    {
                        name: "account",
                        cn: "账号",
                        req: true,
                        type: "text",
                        eg: "登录账号【手机号|账号】"
                    }, {
                        name: "type",
                        cn: "类型",
                        req: false,
                        type: "number",
                        eg: "请求核销类型"
                    }, {
                        name: "page",
                        cn: "页码",
                        req: false,
                        type: "number",
                        eg: "请求页码"
                    }
                ]
            }, {
                uri: "order/order_details",
                name: "核销详情",
                active: [
                    {
                        name: "account",
                        cn: "账号",
                        req: true,
                        type: "text",
                        eg: "登录账号【手机号|账号】"
                    }, {
                        name: "mark",
                        cn: "ID",
                        req: true,
                        type: "number",
                        eg: "请求核销类型"
                    }
                ]
            }
        ]
    },
    "468542ba9984fb15b985defaac25b7fb": {
        uri: "api.php",//短链接
        action: [
            {
                uri: "user/login",
                name: "登陆",
                active: [
                    {
                        name: "account",
                        cn: "账号",
                        req: true,
                        type: "text",
                        eg: "会员账号【身份证号|手机号|会员卡号】"
                    },
                    {
                        name: "password",
                        cn: "密码",
                        req: true,
                        type: "password",
                        eg: "登录密码"
                    // },
                    // {
                    //     name: "integral",
                    //     cn: "积分源",
                    //     req: true,
                    //     type: "text",
                    //     eg: "登录密码"
                    }
                ]
            }, {
                uri: "user/sign",
                name: "登陆验证",
                active: [
                    {
                        name: "uid",
                        cn: "UID",
                        req: true,
                        type: "text",
                        eg: "登录用户编号"
                    }
                ]
            }, {
                uri: "user/logout",
                name: "退出登录",
                active: [
                    {
                        name: "uid",
                        cn: "UID",
                        req: true,
                        type: "text",
                        eg: "登录用户编号"
                    }
                ]
            }, {
                uri: "user/user_status",
                name: "会员状态",
                active: [
                    {
                        name: "account",
                        cn: "账号",
                        req: true,
                        type: "text",
                        eg: "会员账号【身份证号|手机号|会员卡号】"
                    }
                ]
            }, {
                uri: "order/order_list",
                name: "订单信息",
                active: [
                    {
                        name: "uid",
                        cn: "UID",
                        req: true,
                        type: "text",
                        eg: "会员uid"
                    }, {
                        name: "type",
                        cn: "查询类型",
                        req: false,
                        type: "number",
                        eg: "查询类型"
                    }, {
                        name: "page",
                        cn: "查询页码",
                        req: false,
                        type: "number",
                        eg: "查询页码"
                    }
                ]
            }, {
                uri: "order/order_total",
                name: "单量统计",
                active: [
                    {
                        name: "uid",
                        cn: "UID",
                        req: true,
                        type: "text",
                        eg: "会员uid"
                    }
                ]
            },
            {
                uri: "pay/mileage_exchange",
                name: "里程兑换",
                active: [
                    {
                        name: "uid",
                        cn: "会员账号",
                        req: true,
                        type: "text",
                        eg: "会员账号"
                    },
                    {
                        name: "store_id",
                        cn: "门店编号",
                        req: true,
                        type: "number",
                        eg: "门店编号"
                    },
                    {
                        name: "amount",
                        cn: "兑换金额",
                        req: true,
                        type: "number",
                        eg: "兑换金额"
                    }
                ]
            },
            {
                uri: "pay/bar_qrcode",
                name: "二维码/条形码",
                active: [
                    {
                        name: "uid",
                        cn: "UID",
                        req: true,
                        type: "text",
                        eg: "会员uid"
                    },
                    {
                        name: "order_sn",
                        cn: "订单编号",
                        req: true,
                        type: "number",
                        eg: "订单编号"
                    },
                    {
                        name: "type",
                        cn: "请求类型",
                        req: true,
                        type: "number",
                        eg: "请求类型 3—二维码和条形码 1—条形码  2—二维码"
                    }
                ]
            },
            {
                uri: "order/quota",
                name: "订单限额",
                active: [
                    {
                        name: "uid",
                        cn: "UID",
                        req: true,
                        type: "text",
                        eg: "会员uid"
                    },
                    {
                        name: "store_id",
                        cn: "门店",
                        req: true,
                        type: "number",
                        eg: ""
                    },
                    {
                        name: "amount",
                        cn: "兑换金额",
                        req: true,
                        type: "number",
                        eg: ""
                    }
                ]
            },
            {
                uri: "pay/balance_pay",
                name: "余额支付",
                active: [
                    {
                        name: "uid",
                        cn: "UID",
                        req: true,
                        type: "text",
                        eg: "会员uid"
                    },
                    {
                        name: "store_id",
                        cn: "门店",
                        req: true,
                        type: "number",
                        eg: ""
                    }
                ]
            },
            {
                uri: "stores/store_info",
                name: "门店信息",
                active: [
                    {
                        name: "mark",
                        cn: "门店标识码",
                        req: true,
                        type: "text",
                        eg: "32位门店标识码"
                    }
                ]
            },
            {
                uri: "stores/store_mark",
                name: "门店标识码",
                active: [
                    {
                        name: "store_id",
                        cn: "门店编号",
                        req: true,
                        type: "text",
                        eg: ""
                    }
                ]
            },
            {
                uri: "user/balance_query",
                name: "余额查询",
                active: [
                    {
                        name: "uid",
                        cn: "用户编号",
                        req: true,
                        type: "text",
                        eg: ""
                    }
                ]
            },
            {
                uri: "order/order_status",
                name: "订单状态",
                active: [
                    {
                        name: "order_sn",
                        cn: "订单编号",
                        req: true,
                        type: "text",
                        eg: ""
                    }
                ]
            },
            {
                uri: "order/order_sms",
                name: "限额验证码",
                active: [
                    {
                        name: "amount",
                        cn: "兑换金额",
                        req: true,
                        type: "text",
                        eg: ""
                    },
                    {
                        name: "uid",
                        cn: "UID",
                        req: true,
                        type: "text",
                        eg: ""
                    },
                    {
                        name: "store_id",
                        cn: "门店编号",
                        req: true,
                        type: "text",
                        eg: ""
                    }
                ]
            },
            {
                uri: "order/order_sms_input",
                name: "限额验证码",
                active: [
                    {
                        name: "uid",
                        cn: "UID",
                        req: true,
                        type: "text",
                        eg: ""
                    },
                    {
                        name: "input",
                        cn: "验证码",
                        req: true,
                        type: "number",
                        eg: ""
                    }
                ]
            },
            {
                uri: "user/user_query",
                name: "无密查询（修改密码）",
                active: [
                    {
                        name: "account",
                        cn: "账号",
                        req: true,
                        type: "text",
                        eg: "身份证号、护照、军官证、其他证件号码"
                    },
                    {
                        name: "type",
                        cn: "证件类型",
                        req: true,
                        type: "select",
                        eg: "",
                        option: [
                            {
                                name: '身份证',
                                value: 'IDCARD'
                            },
                            {
                                name: '护照',
                                value: 'PASSPORT'
                            },
                            {
                                name: '军官证',
                                value: 'ARMY'
                            },
                            {
                                name: '其他证件',
                                value: 'OTHER'
                            }
                        ]
                    }
                ]
            },
            {
                uri: "order/edit_password_sms",
                name: "修改密码验证码",
                active: [
                    {
                        name: "memberId",
                        cn: "会员卡号",
                        req: true,
                        type: "text",
                        eg: ""
                    }
                ]
            },
            {
                uri: "user/modify_password",
                name: "修改密码",
                active: [
                    {
                        name: "MemberID",
                        cn: "会员卡号",
                        req: true,
                        type: "text",
                        eg: ""
                    },
                    {
                        name: "type",
                        cn: "证件类型",
                        req: true,
                        type: "select",
                        eg: "",
                        option: [
                            {
                                name: '身份证',
                                value: 'IDCARD'
                            },
                            {
                                name: '护照',
                                value: 'PASSPORT'
                            },
                            {
                                name: '军官证',
                                value: 'ARMY'
                            },
                            {
                                name: '其他证件',
                                value: 'OTHER'
                            }
                        ]
                    },
                    {
                        name: "code",
                        cn: "验证码",
                        req: true,
                        type: "number",
                        eg: ""
                    },
                    {
                        name: "number",
                        cn: "证件号码",
                        req: true,
                        type: "text",
                        eg: ""
                    },
                    {
                        name: "birth",
                        cn: "生日",
                        req: true,
                        type: "text",
                        eg: ""
                    },
                    {
                        name: "password",
                        cn: "新密码",
                        req: true,
                        type: "password",
                        eg: ""
                    }
                ]
            },
            {
                uri: "integral/integral_list",
                name: "积分源查询（列表）",
                active: [
                    {
                        name: "status",
                        cn: "积分源状态",
                        req: true,
                        type: "text",
                        eg: ""
                    }
                ]
            },
            {
                uri: "integral/query_rate",
                name: "积分汇率查询",
                active: [
                    {
                        name: "id",
                        cn: "积分mark",
                        req: true,
                        type: "text",
                        eg: ""
                    }
                ]
            },
            {
                uri: "draw/draw",
                name: "新喜之旅活动抽奖",
                active: [
                    {
                        name: "ordersn",
                        cn: "订单号码",
                        req: true,
                        type: "text",
                        eg: ""
                    }
                ]
            }
        ]
    }
};

var third = {
    "oauth/token": [
        // {
        //     name: "appid",
        //     cn: "应用ID",
        //     req:true,
        //     type:'text',
        //     eg:''
        // },
        {
            name: "nonce",
            cn: "随机字符串",
            req:true,
            type:'text',
            eg:'',
            clic:"secret"
        },
        {
            name: "secret",
            cn: "签名认证",
            req:true,
            type:'text',
            eg:'',
            attr:'not'
        }
    ],
    "pay/write_off":[
        {
            name:"order_sn",
            cn:"核销串码",
            req:true,
            type:'text',
            eg:''
        },
        {
            name: "post_type",
            cn: "请求类型",
            req: true,
            type: "select",
            eg: "",
            option: [
                {
                    name: '核销',
                    value: 'ACCESS'
                },
                {
                    name: '查询',
                    value: 'QUERY'
                }
            ]
        },
        {
            name: "total_fee",
            cn: "核销金额",
            req: true,
            type: "number",
            eg: ""
        },
        {
            name: "confirm_id",
            cn: "核销码",
            req: false,
            type: "number",
            eg: ""
        },
        {
            name: "store_code",
            cn: "门店识别码",
            req: false,
            type: "text",
            eg: ""
        }
    ]
}