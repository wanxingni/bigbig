$(function() {
    // alert('ok')
    // 1.把图片初始化成裁剪区
    // 1.1 获取裁剪区域的 元素对象
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)

    // 2.单击上传按钮，弹出文件选择框
    $('#btnChooseImage').on('click', function() {
        console.log('ok')
            // 触发文件选择框的click事件
        $('#file').click()
    })

    //  3.选择了新图片，更换建材区域的图片
    $('#file').on('change', function(e) {
        // 获取用户选中的文件列表（伪数组）
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layui.layer.msg('请选择图片文件')
        }
        // 获取到用户选中的文件
        var file = fileList[0]
            // 把选中的文件，生成一个可访问的文件路径
        var newImgURL = URL.createObjectURL(file)
            // 销毁原来剪裁区域，重新设置剪裁区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 4.上传头像（单击‘确定’，把选中的文件提交给服务器）
    $('#btnUpload').on('click', function() {
        // 判断用户是否选择了文件
        var fileList = $('#file')[0].files
        if (fileList.length === 0) {
            return layui.layer.msg('请选择头像')
        }

        // 裁剪图片并转换成base64格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') //将 Canvas 画布上的内容，转化为base64格式的字符串

        // 调接口
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    window.parent.getUserInfo()
                })
            }
        })
    })











})