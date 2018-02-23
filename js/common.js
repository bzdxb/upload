function get_api_list(token) {
    var list = api[token];
    $("#api").empty().html("<option>请选择</option>");
    $("#option").empty();
    if (typeof list == undefined || list.length < 1) return false;
    // console.log(list);
    // console.log(list.uri);
    $("input#link").val(list.uri);
    var html = '<option>请选择</option>'
    // $active
    var action = list.action;
    $.each(action, function (i, v) {
        var t = JSON.stringify(v.active);
        html += '<option value="' + v.uri + '" str=\'' + t + '\'>' + v.name + '</option>';
    });
    $("#api").html(html);
}

function get_input(obj) {
    obj = eval('(' + $(obj).find("option:selected").attr("str") + ')');
    // console.log(obj);
    $("#option").empty();
    var html = "";
    $.each(obj, function (i, v) {
        html += "<dl>";
        html += '<dt><i>' + (v.req ? '*' : '') + '</i>' + v.cn + '</dt>';
        if (v.type != 'select') {
            html += '<dd><input type="' + v.type + '" ' + (v.req ? 'required' : '') + ' name="' + v.name + '" placeholder="' + v.eg + '" autocomplete="off"></dd>';
        } else {
            html += "<dd><select name='" + v.name + "' " + (v.req ? 'required' : '') + "><option>请选择</option>";
            $.each(v.option, function (k, va) {
                html += "<option value='" + va.value + "'>" + va.name + "</option>"
            });
            html += "</select></dd>"
        }

        html += "</dl>"
    });
    $("#option").html(html);
}


function get_third(obj) {
    var th = third[obj.value];
    $("#options").empty();
    var html = "";
    $.each(th, function (i, v) {
        // var readonly = ""
        if (v.attr && v.attr == "not") {
            html += '<dl><dt><i>' + (v.req ? '*' : '') + '</i>' + v.cn + '</dt><dd><input type="text" name="' + v.name + '" readonly/></dd></dl>';
        } else {
            var fn = '';
            if (v.clic) {
                fn = "onblur = \"get_value_in(this,'" + v.clic + "')\"";
            }
            html += "<dl>";
            html += '<dt><i>' + (v.req ? '*' : '') + '</i>' + v.cn + '</dt>';
            if (v.type != 'select') {
                html += '<dd><input type="' + v.type + '" ' + (v.req ? 'required' : '') + ' name="' + v.name + '" placeholder="' + v.eg + '" autocomplete="off" ' + fn + '></dd>';
            } else {
                html += "<dd><select name='" + v.name + "' " + (v.req ? 'required' : '') + " " + fn + "><option>请选择</option>";
                $.each(v.option, function (k, va) {
                    html += "<option value='" + va.value + "'>" + va.name + "</option>"
                });
                html += "</select></dd>"
            }

            html += "</dl>"
        }

    });
    $("#options").html(html);
}

function get_value_in(obj, input) {
    // $.sha1();
    var v = $(obj).val();
    var token = $("input[name=token]").val();
    var o = $("input[name=" + input + "]");
    o.val($.sha1(token + v));
}

function on_submit(obj) {
    var $this = $(obj);
    if ($this.find("input#link").val() == '') {
        layer.msg("请选择平台！");
        return false;
    }

    if ($this.find("select#system").val() == '') {
        layer.msg("请选择测试环境！");
        return false;
    }

    if ($this.find("select#api").val() == '') {
        layer.msg("请选择调试接口！");
        return false;
    }

    var uri = $this.find("select#system").val() + "/" + $this.find("input#link").val();
    var header = {},
        body = {},
        token = $this.find("select#op").val();
    header.method = $this.find("select#api").val();
    header.times = times();
    var op = $this.find("#option");
    op.find("input,select").each(function () {
        body[this.name] = this.value;
    });
    header.sign = $.md5(objKeySort(body) + token).toUpperCase();
    var post = {header: header, body: body};
    console.log(post);
    $("#post div").empty().html(htmlEncode(JSON.stringify(post)));
    $.ajax({
        type: 'post',
        url: uri,
        data: post,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $("#return div").empty().html(htmlEncode(JSON.stringify(data)))
        },
        error: function (data) {
            layer.msg("请求失败！");
        }
    });
    return false;
}

function on_third_submit(obj) {
    var $this = $(obj);
    if ($this.find("input[name=appid]") == '') {
        layer.msg("请输入appid！");
        return false;
    }

    if ($this.find("#api_name").val() == '') {
        layer.msg("请选择接口！");
        return false;
    }

    if ($this.find("#ops").val() == '') {
        layer.msg("请选择环境！");
        return false;
    }
    var appid = $this.find("input[name=appid]").val();
    var api_name = $this.find("#api_name").val();
    var uri = $this.find("#ops").val();
    var data = {};
    // alert(uri);
    if(api_name == "oauth/token"){
        data = get_token($this,api_name,appid);
    }else if(api_name == "pay/write_off"){
        data = get_pay($this,api_name,appid);
        if(!data){
            layer.msg("请获取token");
            return false;
        }
    }
    $("#post div").empty().html(htmlEncode(JSON.stringify(data)));
    $.ajax({
        type: 'post',
        url: uri,
        data: data,
        dataType: 'json',
        success: function (d) {
            console.log(d);
            if(api_name == "oauth/token" && d.message.errcode == 0){
                sessionStorage.setItem("token",d.data.access_token);
            }
            $("#return div").empty().html(htmlEncode(JSON.stringify(d)));
        },
        error: function (d) {
            layer.msg("请求失败！");
        }
    });
    return false;
}
function get_token(object,api,appid) {
    var header = {
        "method":api,
        "format":"json"
    };
    var body = {
        "appid":appid
    }
    var find = object.find("#options input,#options select");
    find.each(function () {
        body[this.name] = this.value;
    });
    return {header:header,body:body};
}

function get_pay(object,api,appid) {
    var token = sessionStorage.getItem("token");
    // console.log(token);
    if(!token) return false;
    var header = {
        "method":api,
        "format":"json"
    };
    var time = Date.parse(new Date());
    time = Math.floor(time/1000);
    var body = {
        appid:appid,
        timestamp:time
    }
    var find = object.find("#options input,#options select");
    find.each(function () {
        body[this.name] = this.value;
    });
    body.sign = $.md5(objKeySort(body)+token).toLocaleUpperCase();
    return {header:header,body:body};
}
function objKeySort(obj) {
    //排序的函数
    var newkey = Object.keys(obj).sort();
    var newsValue = '';
    for (var i in newkey) {
        if(obj[newkey[i]] != '')
            newsValue += newkey[i] + obj[newkey[i]];
    }
    //console.log(newsValue);
    return newsValue;
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function times() {
    var t = new Date();
    var year = t.getFullYear();
    var moth = (t.getMonth() + 1);
    var day = t.getDate();
    var hours = t.getHours();
    var m = t.getMinutes();
    var s = t.getSeconds();
    return year + "-" + (moth < 10 ? "0" + moth : moth) + "-" + (day < 10 ? "0" + day : day) + " " + (hours < 10 ? "0" + hours : hours) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

function get_dt_width() {
    var max = 0;
    $("dt").each(function () {
        var width = $(this).width();
        if (width > max) max = width;
    });
    $("dt").width(max);
}

function get_return_post(obj) {
    var $this = $(obj).next("div");
    var value = $this.text();
    // strObj.indexOf(subString[, startIndex])
    var v = value.indexOf("{");
    console.log(v);
    if (v >= 0) {
        $this.parent().append('<input type="hidden" value=\'' + value + '\'/>');
        value = eval("(" + value + ")");
        var key = Object.keys(value);
        var html = "";
        $.each(key, function (i, v) {
            html += '<p><i>' + v + ':</i>';
            if (typeof value[v] == "object") {
                html += "</p>"
                var keys = Object.keys(value[v]);
                $.each(keys, function (ii, vv) {
                    if (typeof value[v][vv] !== "object")
                        html += "<p style='padding-left:22px'><span style='color: #d01700'>" + vv + ": </span><span>" + value[v][vv] + "</span></p>";
                    else {
                        var abs = value[v][vv];
                        html += "<p style='padding-left:22px'><i>" + vv + ":</i></p>";
                        console.log(abs)
                        $.each(abs, function (iii, vvv) {
                            html += "<div style='padding-left: 44px;border: none;height: auto'>";
                            $.each(vvv, function (icon, val) {
                                html += "<p style='display: inline-block;margin-left: 5px;'><span style='color: #d01700'>" + icon + ":</span><span>" + val + "</span></p>";
                            });
                            html += "</div>";
                        })
                    }
                })
            } else {
                html += value[v] + "</p>";
            }
        });
        $this.empty().html(html);
    } else {
        value = $this.parent().find("input[type=hidden]").val();
        console.log(value);
        $this.html(htmlEncode(value));
        $this.parent().find("input[hidden]").remove();
    }
}