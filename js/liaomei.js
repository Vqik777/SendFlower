
// 女孩的top坐标值=中间路段的中间坐标值-女孩的高度-40(40是修正值)
// 中间路段的中间坐标值=c-background-top高度+(c-background-middle高度/2)
// 女孩的left坐标值=大容器宽度/2
$("#girl").css({
    top: $(".c-background-top").height() + ($(".c-background-middle").height() / 2) - $("#girl").height() - 40,
    left: $("#content").width() / 2
})

// 门方法
function doorAction(left, right, time) {
    var defer = $.Deferred()
    var flag = 2
    var complete = function () {
        if (flag == 1) {
            defer.resolve()
            return
        }
        flag--
    }
    $(".door-left").transition({
        left: left
    }, time, complete)
    $(".door-right").transition({
        right: right
    }, time, complete)
    return defer
}
// 开门
function openDoor(time) {
    return doorAction("-50%", "-50%", time)
}
// 关门
function shutDoor(time) {
    return doorAction("0%", "0%", time)
}

// 开灯
function lampBright() {
    $(".b-background").addClass("lamp-bright")
}

// 关灯
function lampDark() {
    $(".b-background").removeClass("lamp-bright")
}

// 鸟飞行
function birdMove() {
    setTimeout(function () {
        $(".bird").transition({
            right: "100%"
        }, 6000, "linear")
    }, 1000)
}
var instanceX
// 男孩相关
function boyWalk() {
    // 男孩的top坐标值=中间路段的中间坐标值-男孩的高度+25(25是修正值)
    // 中间路段的中间坐标值=a-background-top高度+(a-background-middle高度/2)
    $("#boy").css({
        top: $(".a-background-top").height() + ($(".a-background-middle").height() / 2) - $("#boy").height() + 25
    })

    ////////////////////////////////////////////////////////
    //===================动画处理============================ //
    ////////////////////////////////////////////////////////


    // 计算移动距离
    // 走到1/2的位置,具体的坐标值的计算就是:实际X轴位置 = 0.5 * 页面宽度,同样Y轴的计算也是如此
    function calculateDist(direction, proportion) {
        if (direction == "x") {
            return $("#content").width() * proportion
        }
        if (direction == "y") {
            return $("#content").height() * proportion
        }
    }

    // 用transition做运动
    function startRun(options, runTime) {
        var defer = $.Deferred()
        // 恢复走路--也就是移除暂停慢走动画类名
        $("#boy").removeClass("pauseWalk")
        // 运动的属性
        $("#boy").transition(options, runTime, "linear", function () {
            defer.resolve()
        })
        return defer
    }

    // 开始走路
    function walkRun(time, distX, distY) {
        // 为男孩添加慢走动画
        $("#boy").addClass("slowWalk")
        var defer = startRun({
            left: distX + "px",
            top: distY ? distY : undefined
        }, time)
        return defer
    }
    // 走近商店(走来纠正距离)
    function toShop(time) {
        var defer = $.Deferred()
        // 当前需要移动的坐标=门中间的left值 - 男孩中间的left值
        // 门中间的left值=门的left值+门自身宽度的一半
        // 男孩中间的left值=小男孩的left值+小男孩自身宽度的一半
        instanceX = ($(".door").offset().left + $(".door").width() / 2) - ($("#boy").offset().left + $("#boy").width() / 2)
        // 开始走路
        var walkPlay = startRun({
            transform: `translateX(${instanceX}px)`,
        }, time)
        // 走路完毕后，监听了一个done的成功方法，用来设置人物的隐藏，这个是Deferred的一个接口，与then效果一致
        walkPlay.done(function () {
            defer.resolve()
        })
        return defer
    }
    // 走进商店
    function enterShop(time) {
        var defer = $.Deferred()
        // 当前需要移动的坐标=门中间的left值 - 男孩中间的left值
        // 门中间的left值=门的left值+门自身宽度的一半
        // 男孩中间的left值=小男孩的left值+小男孩自身宽度的一半
        // instanceX = ($(".door").offset().left + $(".door").width() / 2) - ($("#boy").offset().left + $("#boy").width() / 2)
        // 开始走路
        var walkPlay = startRun({
            transform: `translateX(${instanceX}px) scale(0.3,0.3)`,
        }, time)
        // 走路完毕后，监听了一个done的成功方法，用来设置人物的隐藏，这个是Deferred的一个接口，与then效果一致
        walkPlay.done(function () {
            $("#boy").css({
                opacity: 0
            })
            defer.resolve()
        })
        return defer
    }
    // 走出商店
    function outShop(time) {
        var defer = $.Deferred()
        // 恢复走路--也就是移除暂停慢走动画类名
        $("#boy").removeClass("pauseWalk")
        // 开始走路
        var walkPlay = startRun({
            transform: `translateX(${instanceX}px) scale(1,1)`,
            opacity: 1
        }, time)
        // 走路完毕后，监听了一个done的成功方法，用来设置人物的隐藏，这个是Deferred的一个接口，与then效果一致
        walkPlay.done(function () {
            defer.resolve()
        })
        return defer
    }

    // 取花
    function takeFlower(time) {
        var defer = $.Deferred()
        // 增加延时等待效果
        setTimeout(function () {
            $("#boy").addClass("takeFlowerWalk")
            defer.resolve()
        }, time)
        return defer
    }

    // 返回接口方法
    return {
        // 开始走路
        walkRun: function (time, proportionX, proportionY) {
            var distX = calculateDist("x", proportionX)
            var distY = calculateDist("y", proportionY)
            return walkRun(time, distX, distY)
        },
        // 停止走路
        stopWalk: function () {
            $("#boy").addClass("pauseWalk")
        },
        // 走近商店(用来纠正距离)
        toShop: function (time) {
            return toShop(time)
        },
        // 走进商店
        enterShop: function (time) {
            return enterShop(time)
        },
        // 走出商店
        outShop: function (time) {
            return outShop(time)
        },
        // 取花
        takeFlower: function (time) {
            return takeFlower(time)
        },
        // 复位初始状态
        resetOriginal: function () {
            $("#boy").addClass("pauseWalk")
            $("#boy").removeClass("slowWalk takeFlowerWalk").addClass("boyOriginal")
        },
        // 男孩和女孩一起转身
        rotate: function (time) {
            setTimeout(function () {
                $("#boy").removeClass("boyOriginal pauseWalk").addClass("boy-rotate")
                $("#girl").addClass("girl-rotate")
            }, time)
        }
    }
}