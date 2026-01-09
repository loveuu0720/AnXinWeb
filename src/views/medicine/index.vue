<script setup lang='ts'>
import { Search, Delete, Plus, HelpFilled, RefreshRight } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
// 引入获取全部药品的接口
import { getAllMedical } from '../../api/get/index'
// 引入baseURL
import { baseURL } from '../../utils/request'
// 引入新增药品的接口
import { medicineAdd } from '../../api/add/index'
// 引入修改药品的接口
import { medicineChange } from '../../api/ChangeOrDelete/medicineChange'
// 引入删除药品的接口
import { medicineDelete } from '../../api/ChangeOrDelete/medicineChange'
import { ElMessage } from 'element-plus'
// 引入Excel导入药品
import { submitMedicine } from '../../api/get/index'
// 引入模糊搜索药品
import { searchDrop } from '../../api/Search/searchDrop'
// 第几页
const pageNo = ref(1)
// 多少条
const limit = ref(5)
// 总共的条数
const total = ref(0)
// 所有药品的信息
const drugList = ref([])
// 每条药品的具体信息
const drugDetailList = reactive({})
// 控制dialog的开关(修改)
const dialog = ref(false)
// 控制dialog的开关(新增)
const dialogAdd = ref(false)
// 图片的url地址
const imageUrl = ref()
// Excel文件名
let key = ref({
    fileName: ''
})
// 模糊搜索药品关键字
let dropName = ref('')
// token
const token = localStorage.getItem('user_token')
// 封装获取全部药品的函数
const getMedical = async () => {
    try {
        let res = await getAllMedical(pageNo.value, limit.value)
        if (res && res.data) {
            drugList.value = res.data.records || []
            total.value = parseInt(res.data.total || 0)
        }
    } catch (error) {
        console.error('Failed to fetch medical list:', error)
    }
}
// 页面挂载就获取
onMounted(() => {
    getMedical()
})
// 点击编辑按钮的回调
const editMed = (row: any) => {
    Object.assign(drugDetailList, row)
    dialog.value = !dialog.value
    imageUrl.value = `${baseURL}` + row.img
}
// 点击删除按钮的回调
const deleteUser = async (id) => {
    let res = await medicineDelete(id)
    if (res.data === "移除成功") {
        ElMessage.success("删除成功")
    } else {
        ElMessage.error("删除失败！")
    }
    // 重新获取数据
    getMedical()
}
// 点击编辑(取消)的回调
const cancel = () => {
    // 关闭dialog
    dialog.value = !dialog.value
}
// 点击编辑(确认)的回调
const sumitMed = async () => {
    let res = await medicineChange(drugDetailList)
    if (res.data === "修改成功") {
        ElMessage.success("修改成功")
    } else {
        ElMessage.error("修改失败！")
    }
    //   关闭dialog
    dialog.value = !dialog.value
    await getMedical()

}
// 点击新增按钮的回调(单独新增)
const addMedicine = async () => {
    dialogAdd.value = !dialogAdd.value
    // 清空数据
    Object.assign(drugDetailList, {
        drugname: '',
        id: '',
        img: '',
        price: ''
    })
    imageUrl.value = ''
}
// 点击新增的确定回调
const sumitAdd = async (e) => {
    // 关闭盒子
    dialogAdd.value = !dialogAdd.value

    await medicineAdd(drugDetailList)
    // 再次获取数据
    getMedical()
    ElMessage.success("添加成功")

}
// 点击取消的回调
const cancelAdd = () => {
    dialogAdd.value = !dialogAdd.value
}
// 上传成功的回调
const partmentHandSuccess = async (res) => {
    console.log(res)
    imageUrl.value = res.data
    drugDetailList.img = imageUrl.value
}
// 表单校验规则
const updateRules = {
    drugname: [
        { required: true, message: '请输入药品!', trigger: 'blur' },
    ],
    price: [
        { required: true, message: '请输入价格!', trigger: 'blur' },
        { type: 'number|string', message: '价格必须为数字!' },
    ]
}
// Excel文件导入药品的按钮回调
const handleUploadSuccess = async (res) => {
    key.value.fileName = res.data
    let result = await submitMedicine(key.value.fileName)
    if (result.data === "添加成功") {
        ElMessage.success("添加成功~")
    }
    // 刷新页面
    getMedical()
}
// 点击搜索按钮的回调
const searchUser  = async()=>{
   let res =  await searchDrop(dropName.value)
   drugList.value = res.data
   
}
// 点击重置按钮的回调
const reset = async()=>{
    getMedical()
    dropName.value = ''
}
</script>

<template>
    <el-card>
        <div class="allBtn">
            <div class="left">
                <el-form :inline="true">
                    <el-form-item label="查询药品">
                        <el-input placeholder="请输入药品名称" v-model="dropName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="default" title="请添加搜索条件" @click="searchUser"
                            :icon="Search">搜索</el-button>
                        <el-button :icon="RefreshRight" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="right">
                <!-- 单独新增 -->
                <el-button type="primary" :icon="Plus" @click="addMedicine">新增药品</el-button>
                <!-- 通过Excel文件新增 -->
                <el-upload class="upload-demo" :action="`${baseURL}/common/upload/excel`" multiple
                    :headers="{ token: token }" :on-success="handleUploadSuccess">
                    <el-button type="success" :icon="Plus">Excel文件导入药品</el-button>
                </el-upload>
            </div>
        </div>
    </el-card>
    <el-card style="margin-top: 5px;">
        <h1 class="title">药品管理</h1>
        <el-table border style="margin: 10px 0px" :data="drugList">
            <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
            <el-table-column label="药品名称" prop="drugname" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="价格" prop="price" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="药品图片" align="center">
                <template #="{ row, $index }">
                    <img :src="row.img" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" :icon="Edit" @click="editMed(row)">编辑</el-button>
                    <el-popconfirm title="你确定要删除吗?" @confirm="deleteUser(row.id)">
                        <template #reference>
                            <el-button type="danger" :icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 10, 15]" :background="true"
            layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="getMedical()"
            @current-change="getMedical()" />
        <!-- 修改dialog -->
        <el-dialog v-model="dialog" title="修改药品" width="30%" center>
            <el-form :rules="updateRules" :model="drugDetailList" label-position="left" label-width="80px">
                <el-form-item label="药品名称" prop="name">
                    <el-input v-model="drugDetailList.drugname" placeholder="请输入药品名称" />
                </el-form-item>
                <el-form-item label="单价" prop="price">
                    <el-input v-model="drugDetailList.price" placeholder="请输入药品单价" />
                </el-form-item>
                <el-form-item label="药品图片">
                    <el-upload class="avatar-uploader" :action="`${baseURL}/common/upload/img`" :show-file-list="false"
                        :on-success="partmentHandSuccess" :headers="{ token: token }">
                        <img v-if="imageUrl" :src="`${drugDetailList.img}`" class="avatar" />
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="sumitMed">确认修改</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 新增的dialog -->
        <el-dialog v-model="dialogAdd" title="新增药品" width="30%" center>
            <el-form :rules="updateRules" :model="drugDetailList" label-position="left" label-width="80px">
                <el-form-item label="药品名称" prop="drugname">
                    <el-input v-model="drugDetailList.drugname" placeholder="请输入药品名称" />
                </el-form-item>
                <el-form-item label="单价" prop="price">
                    <el-input v-model="drugDetailList.price" placeholder="请输入药品单价" />
                </el-form-item>
                <el-form-item label="药品图片">
                    <!-- v-model：fileList展示默认图片 
                            action:上传图片的接口地址
                            list-type:展示图片的格式
                            on-preview:点击展示预览图片
                            on-remove：删除图片
                            before-upload：在文件上传之前的回调
                            -->
                    <el-upload list-type="picture-card" :action="`${baseURL}/common/upload/img`" :show-file-list="false"
                        :headers="{ token: token }" :on-success="partmentHandSuccess">
                        <img style="width: 100%;height: 100%;" v-if="imageUrl" :src="`${drugDetailList.img}`" />
                        <el-icon v-else class="el-upload-list__item-actions">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelAdd">取消</el-button>
                    <el-button type="primary" @click="sumitAdd">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>
<style scoped lang="scss">
.allBtn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    .left {
        margin-top: 20px;
    }

    .right {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .upload-demo {
        margin-left: 20px;
        margin-top: 10px;
    }
}

.title {
    text-align: center;
    margin: 5px 0px 0px 0px;
    font-size: 25px;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>