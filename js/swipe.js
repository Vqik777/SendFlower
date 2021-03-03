function swipe() {
    // ul宽度=li数量*大容器宽度
    $(".contentWrapper").css({
        width: $("#content").width() * $("#content").find("li").length
    })
    // 每个li的宽度=大容器宽度
    $("li").css({
        width: $("#content").width()
    })
    // 创建滑动对象
    let swipe = {}
    // 给滑动对象添加移动方法
    swipe.scrollTo = function (x, speed) {
        $(".contentWrapper").css({
            transition: `all linear ${speed}ms`,
            transform: `translateX(-${x}px)`
        })
    }
    // 返回滑动对象
    return swipe
}