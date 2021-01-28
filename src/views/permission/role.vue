<template>
  <div class="app-container">
    <!--Top Bar-->
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleAddRole">
        New Role
      </el-button>
    </div>

    <!--Table-->
    <el-table v-loading="loading" :data="list" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Role Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Description">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--Form Dialog-->
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form ref="form" :model="role" :rules="roleRules" label-position="left">
        <el-form-item label-width="120px" label="Name" prop="name">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label-width="120px" label="Description">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>

        <el-form-item label-width="120px" label="Permissions">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="permissions"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            class="permission-tree"
            :default-checked-keys="role.permissions"
            @check-change="handlePermissionsCheckChange"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRoles, getPermissions } from '@/api/role'
import Pagination from '@/components/Pagination'
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}
export default {
  name: 'UserList',
  data() {
    const validateName = (rule, value, callback) => {
      if (this.role.name === null) {
        callback(new Error('Please Enter Name'))
      }
      setTimeout(() => {
        if (this.role !== null) {
          this.$refs.form.validateField('name')
        }
        callback()
      }, 1000)
    }
    return {
      roleRules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ]
      },
      list: null,
      permissions: [],
      role: {
        id: 0,
        name: 'asdsa',
        description: '',
        permissions: []
      },
      query: {
        page: 1,
        limit: 10,
        keyword: ''
      },
      loading: false,
      dialogVisible: false,
      dialogType: 'Edit',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handlePermissionsCheckChange(data, checked, indeterminate) {
      console.log(data.id)
      if (checked === indeterminate) {
        this.role.permissions = this.role.permissions.filter(element => element !== data.id)
      } else {
        this.role.permissions.push(data.id)
      }
    },
    handleAddRole() {
      this.role.id = 0
      this.role.name = ''
      this.role.description = ''
      this.role.permissions = []
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      const checkedPermissions = []
      const role = this.list[scope.row.key]
      this.role = { ...role }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleDelete({ $index, row }) {
      // this.$confirm('Confirm to remove the role?', 'Warning', {
      //   confirmButtonText: 'Confirm',
      //   cancelButtonText: 'Cancel',
      //   type: 'warning'
      // })
      //   .then(async() => {
      //     await deleteRole(row.key)
      //     this.rolesList.splice($index, 1)
      //     this.$message({
      //       type: 'success',
      //       message: 'Delete succed!'
      //     })
      //   })
      //   .catch(err => { console.error(err) })
    },
    async confirmRole() {
      this.$refs['form'].validate((valid) => {
        console.log(valid)
      })
      console.log(this.role)
    },
    async getList() {
      const param = this.serializeObj(this.query)
      this.loading = true
      const { data, total } = await getRoles(param)
      data.forEach((element, key) => {
        element.key = key
      })
      this.list = data
      this.permissions = await getPermissions()
      this.loading = false
    },
    serializeObj(obj) {
      var str = []
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
      }
      return str.join('&')
    }
  }
}
</script>
