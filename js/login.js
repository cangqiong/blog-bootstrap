// 引用其他js文件
document.write('<script language=javascript src="js/constants.js"></script>');

$(function () {
    $('#username').focus();
    // $('#username').focus().blur(checkName);
    // $('#password').blur(checkPassword);
});

function checkName() {
    var name = $('#username').val();
    if (name == null || name == "") {
        //提示错误
        $('#count-msg').html("用户名不能为空");
        return false;
    }
    var reg = /^\w{3,10}$/;
    if (!reg.test(name)) {
        $('#count-msg').html("输入3-10个字母或数字或下划线");
        return false;
    }
    $('#count-msg').empty();
    return true;
}

function checkPassword() {
    var password = $('#password').val();
    if (password == null || password == "") {
        //提示错误
        $('#password-msg').html("密码不能为空");
        return false;
    }
    var reg = /^\w{3,10}$/;
    if (!reg.test(password)) {
        $('#password-msg').html("输入3-10个字母或数字或下划线");
        return false;
    }
    $('#password-msg').empty();
    return true;
}

function login() {

    if (!checkName() || !checkPassword()) {
        return;
    }

    // 登录
    var aj = $.ajax({
        type: 'POST',
        url: loginUrl,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            userName: $('#username').val(),
            password: $('#password').val(),
        }),
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.code == '000000') {
                blogId = data.data;
                alert("登录成功！");
                location.href = './index.html';
            } else {
                alert(data.msg);
            }
        },
        error: function (res) {
            processError(res);
        }
    });
}

function testAddCookie() {
    var aj = $.ajax({
        type: 'POST',
        url: addCookieUrl,
        contentType: 'application/json; charset=utf-8',
        data: '',
        dataType: 'json',
        success: function (data) {
            if (data.code == '000000') {
                blogId = data.data;
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        }
    });
}

function reset() {
    $('#username').val('');
    $('#password').val('');
}