var snowFlakeUrl = [
    "./images/snowflake/snowflake1.png",
    "./images/snowflake/snowflake2.png",
    "./images/snowflake/snowflake3.png",
    "./images/snowflake/snowflake4.png",
    "./images/snowflake/snowflake5.png",
    "./images/snowflake/snowflake6.png",
]
///////
//飘雪花 //
///////
function snowFlake() {
    // 创建一个雪花元素
    function createSnowFlake() {
        // 随机获取一个图片地址
        var url = snowFlakeUrl[Math.floor(Math.random() * 6)]
        // 开始创建
        return $(`<div class='snowFlake' />`).css({
            "backgroundImage": `url("${url}")`
        })
    }
    // 开始飘花
    setInterval(() => {
        // 运动的轨迹
        var startPositionLeft = Math.random() * $("#content").width() - 100
        var startOpacity = 1
        var endOpacity = 0.7
        var endPositionTop = $("#content").height() - 40
        var endPositionLeft = startPositionLeft - 100 + Math.random() * 500
        // 随机透明度 不小于0.5
        var randomOpacity = Math.random()
        randomOpacity = randomOpacity < 0.5 ? startOpacity : randomOpacity
        // 创建雪花
        var $snowFlake = createSnowFlake()
        // 设置起点位置
        $snowFlake.css({
            left: startPositionLeft,
            opacity: randomOpacity
        })
        // 把创建出来的雪花添加到雪花容器中
        $(".snowFlakeContainer").append($snowFlake)
        // 执行飘花动画
        $snowFlake.transition({
            top: endPositionTop,
            left: endPositionLeft,
            opacity: endOpacity
        }, 5000, "linear", function () {
            $(this).remove()
        })
    }, 200);
}