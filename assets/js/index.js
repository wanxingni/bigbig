$(function() {
    getUserInfo()



    var layer = layui.layer
    $('#logout').on('click', function() {
        layer.confirm('您确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = 'login.html'
            layer.close(index);

        })

    })

})

// 把获取用户信息和渲染用户信息函数，放到入口函数外面
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            // 渲染用户信息
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     // 请求成功和失败都会调用此回调函数
        //     console.log(res)
        //     console.log(res.responseJSON)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
        // 渲染欢迎语
    $('#welcome').html('欢迎  ' + name)
        // 渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像，隐藏文字头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像，隐藏图片头像
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }


}