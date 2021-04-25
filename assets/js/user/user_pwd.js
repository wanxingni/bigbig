$(function() {
    // alert('ok')
    // 1.定义表单校验规则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            // 新旧密码不能一致
            if (value === $('[name=oldPwd').val()) {
                return '新旧密码不能一致'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newname').val()) {
                return '两次密码不一致'
            }
        }
    })

    // 2.完成密码更改
    $('layui-form').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        console.log(data)
        $.ajax({
            method: 'post',
            url: '/my/updatapwd',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    $('.layui-form')[0].reset()
                })
            }
        })
    })








})