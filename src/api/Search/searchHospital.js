import request from '@/utils/request'

// 根据名字搜索医院
export const searchHospital = (name) => {
    return request({
        url: `/hospital/listByName/${name}`,
        method: 'get',
    })
}