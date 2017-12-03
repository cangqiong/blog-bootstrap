/******************************通用JS方法*************************************** */

// 引用其他js文件
document.write('<script language=javascript src="js/constants.js"></script>');

/**
 * 跳转至登录界面
 */
function processError(res) {
    // 用户未登录

    if (res.status === 401) {
        redirtLogin();
    } else {
        // TODO
        alert("异常！" + res.statusText);
    }
}


/**
 * 跳转至登录界面
 */
function redirtLogin() {
    location.href = './login.html'
}

/**
 * 检验博客标题或内容是否存在
 */
function checkBlogContent() {
    if ($('#blog-title').val() === '' || $('#my-editormd-markdown-doc').val() === '') {
        alert("内容不能为空");
        return true;
    }
    return false;
}

/**
 * 保存或更新博客
 */
function saveOrUpdateBlog() {

    var checkResult = checkBlogContent();
    if (checkResult) return;

    if (blogId === '') {
        // 保存博客
        var aj = $.ajax({
            type: 'POST',
            url: saveBlogUrl,
            contentType: 'application/json; charset=utf-8',
            xhrFields:{withCredentials:true},
            data: JSON.stringify({
                title: $('#blog-title').val(),
                content: $('#my-editormd-markdown-doc').val(),
            }),
            dataType: 'json',
            success: function (data) {
                if (data.code == '000000') {
                    blogId = data.data;
                    alert("新建博客成功！");
                } else {
                    alert(data.msg);
                }
            },
            error: function (res) {
                processError(res);
            }
        });
    } else {
        // 更新博客
        var aj = $.ajax({
            url: updateBlogUrl,
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            xhrFields:{withCredentials:true},
            data: JSON.stringify({
                blogId: blogId,
                title: $('#blog-title').val(),
                content: $('#my-editormd-markdown-doc').val(),
            }),
            cache: false,
            dataType: 'json',
            success: function (data) {
                if (data.code == '000000') {
                    alert("修改博客成功！");
                } else {
                    alert(data.msg);
                }
            },
            error: function () {
                processError(res);
            }
        });
    }
}