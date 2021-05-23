$(function() {


    //拼接根路劲统一管理
    $.ajaxPrefilter(function(options) {

        options.url = 'http://api-breakingnews-web.itheima.net' + options.url


        //统一为有权限的接口设置headers请求头

        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''

            }

        }


        //全局统一挂载complete回调函数 来处理有权限的接口登录
        options.complete = function(res) {

            //在complete回调函数中通过res.responseJSON对象拿到返回的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //强制清空token 
                localStorage.removeItem('token')

                //强制跳转到登录页
                location.href = './login.html'

            }

        }


    })
})