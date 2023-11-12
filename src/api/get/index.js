import request from '@/utils/request'


// 获取药瓶列表
export const getAllMedical = (pageNo,limit) => {
    return request({
        url: '/drug/page',
        method: 'get',
        params:{
            page: pageNo,
            pageSize:limit
        }
    })
}

// 获取医院列表
export const getAllHospital = (pageNo,limit) => {
    return request({
        url: '/hospital/page',
        method: 'get',
        params:{
            page:pageNo,
            pageSize:limit
        }
    })
}

// 通过Excel批量导入医院
export const submitHospital = (key)=>{
    return request({
        url:'/hospital/excel',
        method:'get',
        params:{
            fileName: key.fileName
        }
    })
}

// 点击对应医院跳转到旗下科室
export const getHspPart = (name,pageNo,limit)=>{
    return request({
        url:'/department/page',
        method:'get',
        params:{
            hspitalname:name,
            page:pageNo,
            pagesize: limit
        }
    })
}

// 通过Excel批量导入科室
export const submitPartment = (key)=>{
    return request({
        url:'/department/excel',
        method:'post',
        params:{
            fileName:key.fileName
        }
    })
}

// 获取echarts图表动态数据(医院收开)
export const echartsInfo = ()=>{
    return request({
        url:'/employee/data',
        method:'get'
    })
}

// 下载药品图片
export const downLoadPic = (name)=>{
    return request({
        url:'/common/download/img',
        method:'get',
        params:{
            name:name
        }
    })
}

// Excel批量导入药品
export const submitMedicine = (key)=>{
    return request({
        url:'/drug/excle',
        method:'GET',
        params:{
            filename:key
        }
    })
}

// 修改预约订单
export const changeDoctor = (data) => {
    return request({
        url: '/order/modify',
        method: 'post',
        data:data
    })
}


