$.ajaxPrefilter(function(options) {
    // 统一设置请求的url地址根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        // 如果请求的URl地址是有权限的接口，设置请求头
        // url中包含了/my/说明就是有权限的接口
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
        // 请求成功和失败都会调用此回调函数
        console.log(res)
        console.log(res.responseJSON)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})