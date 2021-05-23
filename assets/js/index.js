$(function() {

    //
    var form = layui.form;
    var layer = layui.layer;

    userInfo()

    //拿到用户的用户名渲染头像

    //退出功能
    $('#exitLogout').on('click', function() {
        //
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = './login.html'


            layer.close(index);
        });

    })

})


function userInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        //请求头配置对象  统一在baseAPI中设置
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function(res) {
            if (res.status !== 0) return layer.msg(res.message)
            console.log(res);
            //调用renderAvatar()方法渲染用户的头像
            renderAvatar(res.data)
        },
        //不论成功还是失败都会调用complete回调函数
        // complete: function(res) {

        //     //在complete回调函数中通过res.responseJSON对象拿到返回的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空token 
        //         localStorage.removeItem('token')

        //         //强制跳转到登录页
        //         location.href = './login.html'

        //     }

        // }
    })
}

//渲染用户头像函数
function renderAvatar(user) {
    //定义用户的名称  昵称的权限高 所以先渲染昵称的名字
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)

    //判断用户是否有头像
    if (user.user_pic !== null) {
        //说有有头像
        $('.layui-nav-img').attr('src', user.pic).show()
        $('.text-avatar').hide()

    } else {

        // 拿到名字渲染第一个字母
        var first = name[0].toUpperCase()

        //渲染文字头像
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    }

}