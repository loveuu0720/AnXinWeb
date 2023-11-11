<script setup lang='ts'>
import { ref, shallowRef } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted } from "vue";
import { Search } from '@element-plus/icons-vue'
import axios from 'axios'
// 引入获取全部医院的信息接口
import { getAllHosptal } from '../../api/map/index'

/**
 * 变量
 */
// 存放AMap的实例
let currentAMap = ''
// map实例
let map = shallowRef()
// 输入的地址
const address = ref('')
// 经纬度
let location = ref()
// 存放接口获取的医院全部信息
let HosptalArr = ref()

/**
 * 函数
 */
// 地图
const getMap = () => {
    AMapLoader.load({
        key: "e16ba1e84eccc96c29f9022932e25c96", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
            'AMap.ToolBar'
            , 'AMap.Scale'
            , 'AMap.HawkEye'
            , 'AMap.MapType'
            , 'AMap.Geolocation'
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
        .then((AMap) => {
            currentAMap = AMap
            map.value = new AMap.Map("container", {
                // 设置地图容器id
                viewMode: "3D", // 是否为3D地图模式
                pitch: 30,  // 3d的地图倾斜角度
                zoom: 17, // 初始化地图级别
                center: [106.238794, 29.999274], // 初始化地图中心点位置
            });
            // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            map.value.addControl(new AMap.ToolBar());
            // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
            map.value.addControl(new AMap.Scale());
            // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
            map.value.addControl(new AMap.HawkEye({ isOpen: true }));
            // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
            map.value.addControl(new AMap.MapType());
            // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
            map.value.addControl(new AMap.Geolocation());
        })
        .catch((err) => {
            console.log(err);
        });
}
// 点击获取当前经纬度的回调
const getLaAndLo = () => {
    axios({
        url: 'https://restapi.amap.com/v3/geocode/geo',
        method: 'get',
        params: {
            key: '5dd455c428ed2152a91bf6db307697eb',
            address: address.value
        }
    }).then((res) => {
        location.value = res.data.geocodes[0].location
        let position = location.value.split(',')
        // 清除地图上的所有覆盖物
        map.value.clearMap()
        // 调整地图的缩放级别以及位置
        map.value.setZoomAndCenter(14, position)
        // 获取全部医院信息
        getAllHosptal().then((res) => {
            HosptalArr.value = res.data
            // 循环遍历所有的医院信息
            HosptalArr.value.forEach(el => {
                let laAndLong = (el.latitudeAndLongitude).split(',').map(item => Number(item));

                // 创建marker   
                const marker = new currentAMap.Marker({
                    position: laAndLong,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    title: el.name
                })
                // 将marker添加到地图
                map.value.add(marker)
                // 医院的内容
                let content = `
                <div>
                    <div><strong>医院名称:</strong>${el.name}</div>
                    <div><strong>医院地址:</strong>${el.address}</div>
                </div>
                `
                // 给每一个marker注册点击事件   
                marker.on('click', function (e) {
                    // 创建 infoWindow 实例	    
                    let infoWindow = new currentAMap.InfoWindow({
                        content, //传入 dom 对象，或者 html 字符串
                        offset: new currentAMap.Pixel(0, -30)
                    });
                    infoWindow.open(map.value, e.target.getPosition());
                })
            });

        })



    })

}
// 页面挂载钩子函数
onMounted(() => {
    getMap()
})
</script>

<template>
    <!-- 输入地址拿到经纬度 -->
    <el-card class="card">
        <el-form label-width="50px" inline>
            <el-form-item label="地址" style="font-weight: 700;">
                <el-input v-model="address" placeholder="请输入地址" :prefix-icon="Search" clearable
                    style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getLaAndLo" :disabled="!address">获取该位置的经纬度</el-button>
            </el-form-item>
        </el-form>

        <!-- 地图 -->
        <div id="container"></div>
    </el-card>
</template>

<style scoped lang="scss">
.card {
    width: 82vw;
    height: 83vh;

    #container {
        width: 82vw;
        height: 75vh;
    }
}
</style>