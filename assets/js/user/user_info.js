// 入口函数
$(function() {
    // alert('ok')
    // 1.获取用户的信息，展示到表单
    // 1.1获取用户信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // $('[name=username]').val(res.data.username)
                // $('[name=nickname]').val(res.data.nickname)
                // $('[name=email]').val(res.data.email)
                // $('[name=id]').val(res.data.id)
                // 快速给所有的表单赋值
                layui.form.val('formUserInfo', res.data)
            }
        })
    }

    // 2.重置表单信息
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    // 自定义验证昵称长度的规则
    layui.form.verify({
        nickname: function(value, item) {
            if (value.length > 6) {
                return '昵称不能超过6个字'
            }
        }
    })

    // 3.完成用户信息的修改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 })

                // 更改父页面index.html中的欢迎语
                // window.parent父页面对应的window对象

                window.parent.getUserInfo()
            }
        })
    })




})