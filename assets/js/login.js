$(function() {
    var form = layui.form

    var layer = layui.layer

    $('#link_reg').on('click', function() {
        $('.form_box_reg').show()

        $('.form_box_login').hide()
    })

    //点击去登录的a链接
    $('#link_login').on('click', function() {
        $('.form_box_reg').hide()

        $('.form_box_login').show()
    })

    // 表单验证
    // http://api-breakingnews-web.itheima.net  备用接口

    form.verify({
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //确认密码框的验证
            repass: function(value) {
                if (value !== $('.form_box_reg [name = password]').val()) {
                    return '两次密码输入不一致!'
                }
            }
        })
        //表单注册验证提交ajax请求
    $("#fr_reg").on('submit', function(e) {
        e.preventDefault()
            // var data = $('#fr_reg').serialize()
            // console.log(data);

        var data1 = {
            username: $('#fr_reg [name=username]').val(),
            password: $('#fr_reg [name=password]').val()
        }
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            // data: data,
            data: data1,
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)

                layer.msg('注册成功,请登录!')
                $('#link_login').click()


            }
        })
    })

    //表单登录发起的ajax请求
    $('#fr_login').on('submit', function(e) {
        e.preventDefault()
        var data2 = {
            username: $('#fr_login [name=username]').val(),
            password: $('#fr_login [name=password]').val()
        }
        $.ajax({
            method: "POST",
            url: '/api/login',
            //通过函数serialize()直接拿到表单数值
            data: $(this).serialize(),
            // data: data2,
            // data: { username: $('#fr_login [name=username]').val, password: $('#fr_login [name=password]').val() },
            success: function(res) {
                if (res.status !== 0) return layer.msgg(res.message)

                layer.msg('登录成功！')

                //打印token值
                // console.log(res.token);
                //将登录成功之后的token值保存到本地存储里面  setItem是存数据
                localStorage.setItem('token', res.token)
                    // console.log(token);
                    //跳转到后台首页
                location.href = './index.html'
            }
        })
    })




})