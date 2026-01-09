<script setup lang='ts'>
import { ref, onMounted } from 'vue'
// 引入接口数据
import { echartsInfo } from '../../api/get/index'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
// 数据
const info1 = ref(0)
const info2 = ref(0)
const info3 = ref(0)
const info4 = ref(0)
// runTime数据
const runNum1 = ref(0)
const runNum2 = ref(0)
const runNum3 = ref(0)
const runNum4 = ref(0)
// 获取charts组件实例
let charts = ref()
let charts1 = ref()
let charts2 = ref()
let charts3 = ref()
let charts4 = ref()
// 获取数据的请求
const getInfo = async () => {
    try {
        let res = await echartsInfo()
        if (res && res.data && Array.isArray(res.data)) {
            runNum1.value = res.data[0] || 0
            runNum2.value = res.data[1] || 0
            runNum3.value = res.data[2] || 0
            runNum4.value = res.data[3] || 0
        }
    } catch (error) {
        console.error('Failed to fetch echarts info:', error)
    }
}
onMounted(async() => {
    // 获取数据(患者)
    await getInfo()
    let timer = setInterval(() => {
        info1.value += 21
        if (info1.value >= runNum1.value) {
            clearInterval(timer)
        }
    }, 10)

    // 获取数据(器械)
    let timer1 = setInterval(()=>{
        info2.value+=31  
        if(info2.value >= runNum2.value){
            clearInterval(timer1)
        }
    },10)
    // 获取数据(收入)
    let timer2 = setInterval(() => {
        info3.value += 991
        if (info3.value >= runNum3.value) {
            clearInterval(timer2)
        }
    }, 1)
    // 获取数据(药品)
    let timer3 = setInterval(() => {
        info4.value += 41
        if (info4.value >= runNum4.value) {
            clearInterval(timer3)
        }
    }, 10)
    // echarts图表
    let mycharts = echarts.init(charts.value)
    let mycharts1 = echarts.init(charts1.value)
    let mycharts2 = echarts.init(charts2.value)
    let mycharts3 = echarts.init(charts3.value)
    let mycharts4 = echarts.init(charts4.value)
    // 设置配置项
    mycharts.setOption({
        // x与y轴
        xAxis: {
            type: 'category',
            boundaryGap: false,
            // 分割线
            splitLine: {
                show: true
            },


        },
        yAxis: {
            // 分割线
            splitLine: {
                show: true
            },

        },
        grid: {
            top: 14,
            left: 40,
            right: 25,
            bottom: 20
        },
        // 系列
        series: [
            {
                type: 'line',
                data: [0, 480, 740, 1500, 868, 467, 702, 245, 274, 540, 1220, 745, 0],
                // 区域填充样式
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 2,
                        colorStops: [{
                            offset: 0, color: '#d2f1ea' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#d2f1ea' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }

            }
        ]
    })
    // 设置配置项
    mycharts1.setOption({
        // x与y轴
        xAxis: {
            type: 'category',
            boundaryGap: false,
            // 分割线
            splitLine: {
                show: true
            },


        },
        yAxis: {
            // 分割线
            splitLine: {
                show: true
            },

        },
        grid: {
            top: 14,
            left: 40,
            right: 25,
            bottom: 20
        },
        // 系列
        series: [
            {
                type: 'line',
                data: [0, 580, 340, 500, 768, 467, 702, 945, 274, 540, 120, 745, 0],
                // 区域填充样式
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 2,
                        colorStops: [{
                            offset: 0, color: '#f9ebe7' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#f8c9b9' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }

            }
        ]
    })
    // 设置配置项
    mycharts2.setOption({
        // x与y轴
        xAxis: {
            type: 'category',
            boundaryGap: false,
            // 分割线
            splitLine: {
                show: true
            },


        },
        yAxis: {
            // 分割线
            splitLine: {
                show: true
            },

        },
        grid: {
            top: 14,
            left: 40,
            right: 25,
            bottom: 20
        },
        // 系列
        series: [
            {
                type: 'line',
                data: [0, 1200, 640, 200, 630, 1500, 794, 945, 889, 936, 620, 745, 0],
                // 区域填充样式
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 2,
                        colorStops: [{
                            offset: 0, color: '#a0daf4' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#d6eef8' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }

            }
        ]
    })
    // 设置柱状图配置项
    mycharts3.setOption({
        xAxis: [
            {
                type: 'category',
                data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    textStyle: {
                        color: '#000',  //更改坐标轴文字颜色
                        fontSize: 16     //更改坐标轴文字大小
                    }
                },
                splitLine: {
                    show: true
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#000',  //更改坐标轴文字颜色
                        fontSize: 14     //更改坐标轴文字大小
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#979797',
                        type: [5, 10],
                    },
                },


            },

            // 折线部分
            {
                type: 'value',
                name: '',
                axisLabel: {
                    textStyle: {
                        color: '#F5F5F5',  //更改坐标轴文字颜色
                        fontSize: 12     //更改坐标轴文字大小
                    },
                    formatter: '{value} %'
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        series: [
            {
                name: '计划',
                type: 'bar',
                itemStyle: {
                    opacity: 1, // 这个是 透明度
                    color: new echarts.graphic.LinearGradient(
                        0,
                        1,
                        0,
                        0,
                        [
                            {
                                offset: 0,
                                color: 'rgb(219, 179, 110)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgb(219, 179, 110)' // 100% 处的颜色
                            }
                        ],
                        false
                    )
                },
                // 实现数字展示在柱状图
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 12,
                    color: '#dbb36e',
                    offset: [0, -5],
                    formatter: '{c}' //添加单位
                },
                data: [180, 170, 110, 370, 37, 260, 420, 420]
            },
            {
                name: '实际',
                type: 'bar',
                itemStyle: {
                    // lenged文本
                    opacity: 1, // 这个是 透明度
                    color: new echarts.graphic.LinearGradient(
                        0,
                        1,
                        0,
                        0,
                        [
                            {
                                offset: 0,
                                color: '#489fb3' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#489fb3' // 100% 处的颜色
                            }
                        ],
                        false
                    )
                },
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 12,
                    color: '#4ba5ba',
                    offset: [0, -5],
                    formatter: '{c}' //添加单位
                },
                data: [490, 380, 200, 480, 480, 310, 370, 250]
            },
        ],
        legend: {
            data: ['计划', '实际'],
            align: 'right',
            right: 10
        },
    })
    // 设置折线图配置项
    mycharts4.setOption({
        grid: {
            left: '10%',
            right: '10%',
            top: '20%',
            bottom: '13%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                },
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        xAxis: [
            {
                boundaryGap: false,
                type: 'category',
                axisLabel: {
                    color: '#000',
                    margin: 14,
                    textStyle: {
                        fontSize: 14
                    },
                    interval: 0,
                    rotate: 10,

                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#397cbc'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#195384'
                    }
                },
                data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '万元',
                nameTextStyle: {
                    color: '#489fb3',

                },
                min: 0,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#82A9EF',
                        fontSize: 14
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#27b4c2'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#11366e'
                    }
                }
            }
        ],
        series: [
            {
                name: '医药药品',
                type: 'line',
                stack: '总量',
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: '#808080',
                        lineStyle: {
                            color: '#808080',
                            width: 1
                        },
                        areaStyle: {
                            //color: '#94C9EC'
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: '#c2f0e5'
                                },
                                {
                                    offset: 1,
                                    color: '#c2f0e5'
                                }
                            ])
                        }
                    }
                },
                markPoint: {
                    itemStyle: {
                        normal: {
                            color: 'red'
                        }
                    }
                },
                data: [100, 120, 101, 140, 90, 200, 100]
            },
            {
                name: '医疗器械',
                type: 'line',
                stack: '总量',
                symbol: 'circle',
                symbolSize: 8,

                itemStyle: {
                    normal: {
                        color: '#01e600',
                        lineStyle: {
                            color: '#01e600',
                            width: 1
                        },
                        areaStyle: {
                            // color: '#94C9EC',
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: '#ffc64c'
                                },
                                {
                                    offset: 1,
                                    color: '#ffc64c'
                                }
                            ])
                        }
                    }
                },
                data: [200, 122, 110, 200, 200, 200, 80]
            }
        ],
        legend: {
            data: ['医药药品', '医疗器械'],
            align: 'right',
            right: 10
        },
    });
    
})


</script>

<template>
    <div class="bigCard">
        <el-card class="card">
            <div class="content">
                <div class="left">
                    <img src="@/assets/person.png" alt="">
                </div>
                <div class="right">
                    <p class="title">新的患者:</p>
                    <p class="nums">{{ info1 }}</p>
                </div>
            </div>
        </el-card>
        <el-card class="card">
            <div class="content">
                <div class="left" style="background-color: #03a9f3;">
                    <img src="@/assets/gouuche.png" alt="">
                </div>
                <div class="right">
                    <p class="title">购买器械:</p>
                    <p class="nums">{{ info2 }}</p>
                </div>
            </div>
        </el-card>
        <el-card class="card">
            <div class="content">
                <div class="left" style="background-color: #00c292;">
                    <img src="@/assets/qianbao.png" alt="">
                </div>
                <div class="right">
                    <p class="title">医院收入:</p>
                    <p class="nums">￥{{ info3 }}</p>
                </div>
            </div>
        </el-card>
        <el-card class="card">
            <div class="content">
                <div class="left" style="background-color: #4c5667;">
                    <img src="@/assets/zhen.png" alt="">
                </div>
                <div class="right">
                    <p class="title">药品损耗:</p>
                    <p class="nums">{{ info4 }}</p>
                </div>
            </div>
        </el-card>
    </div>
    <div class="bigCard2">
        <!-- 医生 -->
        <el-card class="card">
            <div class="title">
                <div class="left">
                    医生
                </div>
                <div class="right">
                    同比增幅15.22%
                </div>
            </div>
            <div class="leftContent">
                <div class="box">
                    <p>总体</p>
                    <p class="percent">82.7%</p>
                </div>
                <div class="box">
                    <p>每月的</p>
                    <p class="percent">6.89%</p>
                </div>
                <div class="box">
                    <p>天</p>
                    <p class="percent">0.22%</p>
                </div>
            </div>
            <!-- 图表 -->
            <div class="charts" ref="charts"></div>
        </el-card>
        <!-- 陪诊师 -->
        <el-card class="card">
            <div class="title">
                <div class="left">
                    陪诊师
                </div>
                <div class="right">
                    同比增幅11.92%
                </div>
            </div>
            <div class="leftContent">
                <div class="box">
                    <p>总体</p>
                    <p class="percent">96.2%</p>
                </div>
                <div class="box">
                    <p>每月的</p>
                    <p class="percent">8.01%</p>
                </div>
                <div class="box">
                    <p>天</p>
                    <p class="percent">0.26%</p>
                </div>
            </div>
            <!-- 图表 -->
            <div class="charts" ref="charts1"></div>
        </el-card>
        <!-- 患者 -->
        <el-card class="card">
            <div class="title">
                <div class="left">
                    患者
                </div>
                <div class="right">
                    同比增幅12.75%
                </div>
            </div>
            <div class="leftContent">
                <div class="box">
                    <p>总体</p>
                    <p class="percent">98.3%</p>
                </div>
                <div class="box">
                    <p>每月的</p>
                    <p class="percent">8.19%</p>
                </div>
                <div class="box">
                    <p>天</p>
                    <p class="percent">0.27%</p>
                </div>
            </div>
            <!-- 图表 -->
            <div class="charts" ref="charts2"></div>
        </el-card>
    </div>
    <div class="bigCard3">
        <!-- 左边的卡片 -->
        <el-card class="card">
            <div class="title">
                <p>新的病人</p>
            </div>
            <div class="charts" ref="charts3"></div>
        </el-card>
        <!-- 右边的卡片 -->
        <el-card class="card">
            <div class="title">
                <p>医院支出</p>
            </div>
            <div class="charts" ref="charts4"></div>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.bigCard {
    display: flex;
    justify-content: space-between;

    .card {
        width: 380px;
        height: 110px;

        .content {
            display: flex;
            justify-content: space-between;
            position: relative;

            .left {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background: #01c0c8;

                img {
                    position: relative;
                    left: 19px;
                    top: 20px;
                }
            }

            .right {
                margin-top: -16px;
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;

                .title {
                    font-size: 14px;

                }

                .nums {
                    margin-top: -5px;
                    font-size: 35px;
                    font-weight: 800;
                    padding-right: 30px;
                }
            }
        }
    }

    .card:hover {
        cursor: pointer;
        box-shadow: 1px 1px 5px 2px #d1d1ce;
        border-radius: 10px;
        background-color: #77eff3;

    }
}

.bigCard2 {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .card {
        width: 512px;
        height: 300px;

        .title {
            display: flex;
            justify-content: space-between;

            .left {
                font-size: 20px;
                color: #5e5c5c;
                font-weight: 600;
            }

            .right {
                font-size: 14px;
                color: #01c0c8;
            }
        }

        .leftContent {
            margin-top: 10px;
            display: flex;
            width: 230px;
            height: 76px;
            justify-content: space-evenly;

            .box {
                margin-left: 15px;

                .percent {
                    font-weight: 600;
                }
            }
        }

        .charts {
            width: 500px;
            height: 150px;
        }
    }
}

.bigCard3 {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .card {
        .title {
            p {
                font-size: 20px;
                font-weight: 600;
            }
        }

        width: 771px;
        height: 500px;

        .charts {
            width: 730px;
            height: 400px;
        }
    }
}

.title1 {
    margin-right: -40px;
}
</style>