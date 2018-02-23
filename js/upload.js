/**
 * yum_ui 文件上传插件
 * @type {{defExt: Array, defSize: number, name: string, url: string, files: string, model: Window, ajaxUpload: upload.ajaxUpload, ajaxFiles: upload.ajaxFiles, ajaxSend: upload.ajaxSend, addUploadButton: upload.addUploadButton, reload_option: upload.reload_option}}
 */
upload = {
    defExt: [],//允许上传的后缀，默认都可上传（数组方式传值）
    defSize: 0,//允许上传的文件大小，默认为不限制
    name: "file",//上传文件的name
    url: "api/upload.php",//上传地址
    files: 'file',//默认inputId
    model: window,//启用模型（如layer弹出框等）
    /**
     * 文件上传启动器
     * @param object  按钮ID
     * @param option  相关操作，默认值
     */
    ajaxUpload: function (object, option) {
        this.object = $("#" + object);
        this.option = option;
        if (option != undefined) {
            //初始化默认值
            this.defExt = option.defExt != undefined ? option.defExt : [];
            this.defSize = option.defSize != undefined && parseFloat(option.defSize) > 0 ? option.defSize : 0;
            this.name = option.name != undefined && option.name != '' ? option.name : "file";
            this.files = option.files != undefined && option.files != '' ? option.files : 'file';
            this.url = option.url != undefined && option.url != '' ? option.url : 'api/upload.php';
            this.model = option.model != undefined && option.model != '' ? option.model : window;
        }else{
            this.option = {};
        }
        this.addUploadButton();
    },
    /**
     * 上传类型判断
     * @param file
     * @returns {boolean}
     */
    ajaxFiles: function (file) {
        var file = file.files[0];
        if (file) {
            this.uploadName = file.name;//获取上传文件的名称
            this.size = Math.round(parseFloat(file.size) / 1024 * 100) / 100;//获取上传文件的大小,单位为Kb
            var ext = file.name.split(".");
            this.ext = ext[(ext.length - 1)];//获取上传文件的后缀
            //判断是否进行了文件上传限制
            if (this.defExt) {
                var regExp = this.defExt.join("|");
                regExp = new RegExp("(" + regExp + ")$");
                if (!regExp.test(this.ext)) {
                    this.model.alert("不支持的文件上传格式【" + this.ext + "】");
                    return false;
                }
            }
            if (this.defSize > 0 && this.defSize < parseFloat(this.size)) {
                this.model.alert("上传文件大小控制在"+this.defSize+"Kb以内！");
                return false;
            }
            //组装上传数据
            var format = new FormData();
            format.append(this.name, file);
            format.append("file_name", this.name);
            this.data = format;
            //上传数据
            this.ajaxSend();
        } else {
            return false;
        }
    },
    /**
     * 上传文件
     */
    ajaxSend: function () {
        var url = this.url;
        var data = this.data;
        $.ajax({
            url: url,
            cache: false,
            data: data,
            processData: false,
            contentType: false,
            type: "post",
            success: function (d) {
                if (upload.option.success != undefined && typeof upload.option.success == "function") {
                    upload.option.success(d);
                } else {
                    if (typeof d != "object") d = eval("(" + d + ")");
                    if (d.code != 1) {
                        upload.model.alert(d.msg);
                    } else {
                        var msg = upload.object.parent().find("#message");
                        var html = "";
                        var number = msg.find("li").length;
                        html = "<li>" + (number + 1) + ". " + upload.uploadName + "</li>";
                        msg.append(html);
                        upload.model.alert(d.msg);
                    }
                }
                upload.data = "";
            },
            error: function (d) {
                if (upload.option.error != undefined && typeof upload.option.error == "function") {
                    upload.option.error(d);
                } else {
                    upload.model.alert("上传文件失败！");
                }
            }
        });
    },
    /**
     * 上传按钮生成器
     */
    addUploadButton: function () {
        this.success = "";
        this.error = "";
        if (this.option.success && typeof this.option.success == "function") {
            this.success = this.option.success;
        }
        if (this.option.error && typeof this.option.error == "function") {
            this.error = this.option.error;
        }
        var html = "<div class='upload'><input name='" + upload.name + "' type='file' id='" + upload.files + "' hidden onchange='upload.ajaxFiles(this)'/><ul id='message'></ul>";
        html += "<p class='item' style='display: none'><input name='defExt' value='" + JSON.stringify(this.defExt) + "'><input name='defSize' value='" + this.defSize + "'><input name='name' value='" + this.name + "'><input name='files' value='" + this.files + "'><input name='url' value='" + this.url + "'><input name='model' value='" + this.model + "'><input name='option' value='" + JSON.stringify(this.option) + "'>";
        html += "<span id='success'>" + encodeURI(encodeURI(this.success)) + "</span>";
        html += "<span id='error'>" + encodeURI(encodeURI(this.error)) + "</span>";
        html += "</p></div>";
        this.object.parent().append(html);
        this.object.attr("onclick", "upload.reload_option(this)");
    },
    /**
     * 更新默认配置
     * @param object
     */
    reload_option: function (object) {
        upload.object = $(object);
        object = $(object);
        var option = object.parent().find(".item");
        //重写默认函数
        option.find("input").each(function () {
            switch (this.name) {
                case "model":
                    upload.model = this.value == '' ? window : eval('(' + this.value + ')');
                    break;
                case "defExt":
                    var val = eval('(' + this.value + ')');
                    upload.defExt = val == '' || val.length < 1 ? [] : val;
                    break;
                case "defSize":
                    var val = parseFloat(this.value);
                    upload.defSize = val <= 0 ? 0 : val;
                    break;
                case "name":
                case "files":
                    var val = $.trim(this.value);
                    upload[this.name] = val == '' ? 'file' : val;
                    break;
                case "url":
                    var val = $.trim(this.value);
                    upload.url = val == '' ? 'api/upload.php' : val;
                    break;
                case "option":
                    var val = eval("(" + this.value + ")");
                    var success = $(this).siblings("#success").text();
                    var error = $(this).siblings("#error").text();
                    upload.option = val;
                    if (success != '') {
                        upload.option.success = eval("(" + decodeURI(decodeURI(success)) + ")");
                    }

                    if (error != '') {
                        upload.option.error = eval("(" + decodeURI(decodeURI(error)) + ")");
                    }
                    break;
            }
        });
        object.siblings(".upload").find("#" + upload.files).click();
    }
};