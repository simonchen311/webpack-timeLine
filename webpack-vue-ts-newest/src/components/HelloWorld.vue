<template>
    <div class="container">
        <div class="left-container">
            <!-- <div id="bar-chart" ref="barChart"></div>
            <div id="line-chart" ref="lineChart"></div> -->
        </div>
        <div class="middle-container">
            <!-- <div id="china-map" ref="chinaMap"></div> -->
            <div class="canvas">
                <div class="title"></div>
                <div class="top-left"></div>
                <div class="top-middle"></div>
                <div class="top-right"></div>
                <div class="bottom-left"></div>
                <div class="bottom-right"></div>
                <div class="bottom"></div>
            </div>
        </div>
        <div class="right-container">
            <!-- <div id="radar-chart" ref="radarChart"></div>
            <div id="gauge-chart" ref="gaugeChart"></div> -->
        </div>
    </div>

</template>

<script>
// import * as echarts from "echarts"
// import chinaJson from "../utils/china.json"
export default {
    // mounted() {
    //     const barChart = echarts.init(this.$refs.barChart)
    //     barChart.setOption({
    //         tooltip: {
    //             trigger: "axis",
    //             axisPointer: {
    //                 type: "shadow"
    //             }
    //         },
    //         legend: {},
    //         grid: {
    //             left: "3%",
    //             right: "4%",
    //             bottom: "3%",
    //             containLabel: true
    //         },
    //         xAxis: [
    //             {
    //                 type: "category",
    //                 data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    //             }
    //         ],
    //         yAxis: [
    //             {
    //                 type: "value"
    //             }
    //         ],
    //         dataZoom: [
    //             {
    //                 type: "slider", // 滑块类型 值有slider和inside，inside不像slider会有一个单独的一个滑动条，而是迁入到了坐标系中
    //                 xAxisIndex: [0],
    //                 start: 0, // 数据窗口范围的起始百分比，范围是0~100
    //                 end: 10, // 数据窗口范围的起始结束百分比，范围是0~100
    //                 minSpan: 0, // 用于限制窗口大小的最小值（百分比值），取值范围是 0 ~ 100。
    //                 maxSpan: 20 // 用于限制窗口大小的最大值（百分比值），取值范围是 0 ~ 100。
    //             }
    //         ],
    //         series: [
    //             {
    //                 name: "Direct",
    //                 type: "bar",
    //                 emphasis: {
    //                     focus: "series"
    //                 },
    //                 data: [320, 332, 301, 334, 390, 330, 320]
    //             },
    //             {
    //                 name: "Email",
    //                 type: "bar",
    //                 stack: "Ad",
    //                 emphasis: {
    //                     focus: "series"
    //                 },
    //                 data: [120, 132, 101, 134, 90, 230, 210]
    //             },
    //             {
    //                 name: "Union Ads",
    //                 type: "bar",
    //                 stack: "Ad",
    //                 emphasis: {
    //                     focus: "series"
    //                 },
    //                 data: [220, 182, 191, 234, 290, 330, 310]
    //             },
    //             {
    //                 name: "Video Ads",
    //                 type: "bar",
    //                 stack: "Ad",
    //                 emphasis: {
    //                     focus: "series"
    //                 },
    //                 data: [150, 232, 201, 154, 190, 330, 410]
    //             },
    //             {
    //                 name: "Search Engine",
    //                 type: "bar",
    //                 data: [862, 1018, 964, 1026, 1679, 1600, 1570],
    //                 emphasis: {
    //                     focus: "series"
    //                 },
    //                 markLine: {
    //                     lineStyle: {
    //                         type: "dashed"
    //                     },
    //                     data: [[{ type: "min" }, { type: "max" }]]
    //                 }
    //             },
    //             {
    //                 name: "Baidu",
    //                 type: "bar",
    //                 barWidth: 5,
    //                 stack: "Search Engine",
    //                 emphasis: {
    //                     focus: "series"
    //                 },
    //                 data: [620, 732, 701, 734, 1090, 1130, 1120]
    //             },
    //             {
    //                 name: "Google",
    //                 type: "bar",
    //                 stack: "Search Engine",
    //                 emphasis: {
    //                     focus: "series"
    //                 },
    //                 data: [120, 132, 101, 134, 290, 230, 220]
    //             },
    //             {
    //                 name: "Bing",
    //                 type: "bar",
    //                 stack: "Search Engine",
    //                 emphasis: {
    //                     focus: "series"
    //                 },
    //                 data: [60, 72, 71, 74, 190, 130, 110]
    //             },
    //             {
    //                 name: "Others",
    //                 type: "bar",
    //                 stack: "Search Engine",
    //                 emphasis: {
    //                     focus: "series"
    //                 },
    //                 data: [62, 82, 91, 84, 109, 110, 120]
    //             }
    //         ]
    //     })

    //     const lineChart = echarts.init(this.$refs.lineChart)
    //     lineChart.setOption({
    //         title: {
    //             text: "Stacked Line"
    //         },
    //         tooltip: {
    //             trigger: "axis"
    //         },
    //         legend: {
    //             data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"]
    //         },
    //         grid: {
    //             left: "3%",
    //             right: "4%",
    //             bottom: "3%",
    //             containLabel: true
    //         },
    //         toolbox: {
    //             feature: {
    //                 saveAsImage: {}
    //             }
    //         },
    //         xAxis: {
    //             type: "category",
    //             boundaryGap: false,
    //             data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"] // 类目
    //         },
    //         yAxis: {
    //             type: "value"
    //         },
    //         series: [
    //             {
    //                 name: "Email",
    //                 type: "line",
    //                 stack: "Total",
    //                 data: [120, 132, 101, 134, 90, 230, 210]
    //             },
    //             {
    //                 name: "Union Ads",
    //                 type: "line",
    //                 stack: "Total",
    //                 data: [220, 182, 191, 234, 290, 330, 310]
    //             },
    //             {
    //                 name: "Video Ads",
    //                 type: "line",
    //                 stack: "Total",
    //                 data: [150, 232, 201, 154, 190, 330, 410]
    //             },
    //             {
    //                 name: "Direct",
    //                 type: "line",
    //                 stack: "Total",
    //                 data: [320, 332, 301, 334, 390, 330, 320]
    //             },
    //             {
    //                 name: "Search Engine",
    //                 type: "line",
    //                 stack: "Total",
    //                 data: [820, 932, 901, 934, 1290, 1330, 1320]
    //             }
    //         ]
    //     })

    //     echarts.registerMap("china", chinaJson)
    //     var chinaData = [
    //         { name: "北京", value: "100" }, { name: "天津", value: this.randomData() },
    //         { name: "上海", value: this.randomData() }, { name: "重庆", value: this.randomData() },
    //         { name: "河北", value: this.randomData() }, { name: "河南", value: this.randomData() },
    //         { name: "云南", value: this.randomData() }, { name: "辽宁", value: this.randomData() },
    //         { name: "黑龙江", value: this.randomData() }, { name: "湖南", value: this.randomData() },
    //         { name: "安徽", value: this.randomData() }, { name: "山东", value: this.randomData() },
    //         { name: "新疆", value: this.randomData() }, { name: "江苏", value: this.randomData() },
    //         { name: "浙江", value: this.randomData() }, { name: "江西", value: this.randomData() },
    //         { name: "湖北", value: this.randomData() }, { name: "广西", value: this.randomData() },
    //         { name: "甘肃", value: this.randomData() }, { name: "山西", value: this.randomData() },
    //         { name: "内蒙古", value: this.randomData() }, { name: "陕西", value: this.randomData() },
    //         { name: "吉林", value: this.randomData() }, { name: "福建", value: this.randomData() },
    //         { name: "贵州", value: this.randomData() }, { name: "广东", value: this.randomData() },
    //         { name: "青海", value: this.randomData() }, { name: "西藏", value: this.randomData() },
    //         { name: "四川", value: this.randomData() }, { name: "宁夏", value: this.randomData() },
    //         { name: "海南", value: this.randomData() }, { name: "台湾", value: this.randomData() },
    //         { name: "香港", value: this.randomData() }, { name: "澳门", value: this.randomData() }
    //     ]

    //     // https://blog.csdn.net/m0_59281691/article/details/137829453
    //     const chinaMap = echarts.init(this.$refs.chinaMap)
    //     var optionMap = {
    //         backgroundColor: "#FFFFFF",
    //         title: {
    //             text: "全国地图大数据",
    //             subtext: "",
    //             x: "center"
    //         },
    //         tooltip: {
    //             trigger: "item"
    //         },

    //         // 左侧小导航图标
    //         visualMap: {
    //             show: true,
    //             x: "left",
    //             y: "center",
    //             splitList: [
    //                 { start: 500, end: 600 }, { start: 400, end: 500 },
    //                 { start: 300, end: 400 }, { start: 200, end: 300 },
    //                 { start: 100, end: 200 }, { start: 0, end: 100 }
    //             ],
    //             color: ["#5475f5", "#9feaa5", "#85daef", "#74e2ca", "#e6ac53", "#9fb5ea"]
    //         },

    //         // 配置属性
    //         series: [{
    //             name: "数据",
    //             type: "map",
    //             mapType: "china",
    //             roam: true,
    //             label: {
    //                 normal: {
    //                     show: true // 省份名称
    //                 },
    //                 emphasis: {
    //                     show: false
    //                 }
    //             },
    //             data: chinaData // 数据
    //         }]
    //     }
    //     chinaMap.setOption(optionMap)

    //     // chinaMap.setOption({
    //     //     title: {
    //     //         text: "工地统计地图",
    //     //         left: "5%",
    //     //         textStyle: {
    //     //             fontSize: "28"
    //     //         }
    //     //     },
    //     //     tooltip: {
    //     //         show: "true",
    //     //         trigger: "item",
    //     //         formatter: function (params) {
    //     //             let str = ""
    //     //             if (isNaN(params.value)) {
    //     //                 str = params.seriesName + " : 0"
    //     //             } else {
    //     //                 str = params.seriesName + " : " + params.value
    //     //             }
    //     //             return str
    //     //         }
    //     //     },
    //     //     visualMap: {
    //     //         min: 0,
    //     //         max: 20,
    //     //         left: "left",
    //     //         top: "bottom",
    //     //         text: ["高", "低"],
    //     //         calculable: true
    //     //     },
    //     //     series: [
    //     //         {
    //     //             name: "工地数量",
    //     //             type: "map",
    //     //             mapType: "china",
    //     //             roam: true,
    //     //             label: {
    //     //                 normal: {
    //     //                     show: true,
    //     //                     textStyle: {
    //     //                         color: "#fff"
    //     //                     }
    //     //                 }
    //     //             },
    //     //             itemStyle: {
    //     //                 normal: {
    //     //                     borderColor: "#B79891",
    //     //                     borderWidth: "2",
    //     //                     areaColor: "#F6EFA6"
    //     //                 },
    //     //                 emphasis: {
    //     //                     areaColor: "#F2D5AD"
    //     //                 }
    //     //             },
    //     //             data: chinaData // 数据来源
    //     //         }
    //     //     ]

    //     // })

    //     const radarChart = echarts.init(this.$refs.radarChart)
    //     radarChart.setOption({
    //         title: {
    //             text: "Proportion of Browsers",
    //             subtext: "Fake Data",
    //             top: 10,
    //             left: 10
    //         },
    //         tooltip: {
    //             trigger: "item"
    //         },
    //         legend: {
    //             type: "scroll",
    //             bottom: 10,
    //             data: (function() {
    //                 var list = []
    //                 for (var i = 1; i <= 28; i++) {
    //                     list.push(i + 2000 + "")
    //                 }
    //                 return list
    //             })()
    //         },
    //         visualMap: {
    //             top: "middle",
    //             right: 10,
    //             color: ["red", "yellow"],
    //             calculable: true
    //         },
    //         radar: {
    //             indicator: [
    //                 { text: "IE8-", max: 400 },
    //                 { text: "IE9+", max: 400 },
    //                 { text: "Safari", max: 400 },
    //                 { text: "Firefox", max: 400 },
    //                 { text: "Chrome", max: 400 }
    //             ]
    //         },
    //         series: (function() {
    //             var series = []
    //             for (var i = 1; i <= 28; i++) {
    //                 series.push({
    //                     type: "radar",
    //                     symbol: "none",
    //                     lineStyle: {
    //                         width: 1
    //                     },
    //                     emphasis: {
    //                         areaStyle: {
    //                             color: "rgba(0,250,0,0.3)"
    //                         }
    //                     },
    //                     data: [
    //                         {
    //                             value: [
    //                                 (40 - i) * 10,
    //                                 (38 - i) * 4 + 60,
    //                                 i * 5 + 10,
    //                                 i * 9,
    //                                 (i * i) / 2
    //                             ],
    //                             name: i + 2000 + ""
    //                         }
    //                     ]
    //                 })
    //             }
    //             return series
    //         })()
    //     })

    //     const gaugeChart = echarts.init(this.$refs.gaugeChart)
    //     gaugeChart.setOption({
    //         tooltip: {
    //             formatter: "{a} <br/>{b} : {c}%"
    //         },
    //         series: [
    //             {
    //                 name: "Pressure",
    //                 type: "gauge",
    //                 progress: {
    //                     show: true
    //                 },
    //                 detail: {
    //                     valueAnimation: true,
    //                     formatter: "{value}"
    //                 },
    //                 data: [
    //                     {
    //                         value: 50,
    //                         name: "SCORE"
    //                     }
    //                 ]
    //             }
    //         ]
    //     })

    //     const chartList = [barChart, lineChart, chinaMap, radarChart, gaugeChart]
    //     window.addEventListener("resize", () => {
    //         chartList.forEach(chart => {
    //             chart.resize()
    //         })
    //     }, false)
    // },
    methods: {
        randomData() {
            return Math.round(Math.random() * 500)
        }
    }
}
</script>

<style>

.container {
    display: flex;
    margin-top: 20px;
    padding: 10px;
}

.container .left-container {
    padding: 0 10px 0 0;
    width: 200px;
    display: flex;
    flex-direction: column;
    background-color: lightcoral;
    height: 100vh;
}

.container .middle-container {
    flex: 1;
    padding: 0 10px;
}

.canvas {
    position: relative;
    width: 100%;
    transform-origin: left top;
    transform: scale(1, 1);
}

.canvas::after {
    content: " ";
    clear: both;
}

.canvas .title {
    position: absolute;
    width: 100%;
    height: 30px;
    background-color: lightsalmon;
}

.canvas .top-left {
    position: absolute;
    top: 40px;
    width: 25%;
    height: 80px;
    background-color: darkcyan;
}

.canvas .top-middle {
    position: absolute;
    top: 40px;
    left: 25.5%;
    width: 49%;
    height: 160px;
    background-color: darkgoldenrod;
}

.canvas .top-right {
    position: absolute;
    top: 40px;
    left: 75%;
    width: 25%;
    height: 80px;
    background-color: darkgray;
}

.container .right-container {
    padding: 0 0 0 10px;
    width: 200px;
    display: flex;
    flex-direction: column;
    background-color: lightblue;
    height: 100vh
}

#bar-chart {
    width: 100%;
    height: 400px;
    margin-bottom: 5px;
    border: 1px solid lightgray;
}

#line-chart {
    width: 100%;
    height: 400px;
    margin-top: 5px;
    border: 1px solid lightgray;
}

#china-map {
    width: 100%;
    height: 810px;
    border: 1px solid lightgray;
}

#radar-chart {
    width: 100%;
    height: 400px;
    margin-bottom: 5px;
    border: 1px solid lightgray;
}

#gauge-chart {
    width: 100%;
    height: 400px;
    margin-top: 5px;
    border: 1px solid lightgray;
}

@media screen and (max-width:600px) {
    .container {
        flex-direction: column;
    }
    .container .left-container {
        padding: 0;
        margin-bottom: .1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .container .middle-container {
        width: 100%;
        margin-bottom: .1rem;
    }

    .container .right-container {
        padding: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #bar-chart {
        width: 100%;
        height: 3.5rem;
        margin-bottom: .05rem;
        border: .01rem solid lightgray;
    }

    #line-chart {
        width: 100%;
        height: 3.5rem;
        margin-top: .05rem;
        margin-bottom: .05rem;
        border: .01rem solid lightgray;
    }

    #china-map {
        width: 100%;
        height: 3.5rem;
        margin-top: .05rem;
        margin-bottom: .05rem;
        border: .01rem solid lightgray;
    }

    #radar-chart {
        width: 100%;
        height: 3.5rem;
        margin-top: .05rem;
        margin-bottom: .05rem;
        border: .01rem solid lightgray;
    }

    #gauge-chart {
        width: 100%;
        height: 3.5rem;
        margin-top: .05rem;
        border: .01rem solid lightgray;
    }
}
</style>
