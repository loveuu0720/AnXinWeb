import request from '@/utils/request'

// 根据名字搜索药品
export const searchDrop = (name) => {
    return request({
        url: `/drug/name/${name}`,
        method: 'get',
    })
}