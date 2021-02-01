<template>
  <div class="app-container">
    <!--Top Bar-->
    <div class="filter-container">
      <el-button class="filter-item" @click="handleAdd()" style="margin-left: 10px;" type="primary" icon="el-icon-plus">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <!--Table-->
    <el-table :data="list" v-loading="loading" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.key + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Email">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Role Name">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Add New User" :visible.sync="bDialogFormVisible">
        <div v-loading="bCreating" class="form-container">
          <el-form ref="form" :rules="rules" :model="currentRecord" label-position="left" label-width="180px">
            <el-form-item label="Name" prop="name">
              <el-input v-model="currentRecord.name" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="currentRecord.email" />
            </el-form-item>
            <el-form-item label="password" prop="password">
              <el-input v-model="currentRecord.password" show-password />
            </el-form-item>
            <el-form-item label="Role Name" prop="roleID">
              <el-select v-model="currentRecord.roleID" class="filter-item" placeholder="Select Role">
                <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="bDialogFormVisible = false">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary" @click="createRecord()">
            {{ $t('table.confirm') }}
          </el-button>
        </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { getList, getRoles, addUser, updateUser, deleteUser } from '@/api/user'
import Pagination from '@/components/Pagination'
const msgFieldRquired = 'This field is required.';
export default {
  name: 'UserList',
  data() {
    return {
      list: null,
      query: {
        page: 1,
        limit: 10,
        keyword: '',
        role: ''
      },
      loading: false,
      bDialogFormVisible: false,
      bCreating: false,
      mode: '',
      currentRecord: {},
      roles: [],
      rules: {
        name: [{ required: true, message: msgFieldRquired, trigger: 'blur' }],
        email: [
            { required: true, message: msgFieldRquired, trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
          ],
        roleID: [{ required: true, message: msgFieldRquired, trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getList()
    this.getRoles()
  },
  methods: {
    handleAdd(){
      this.bDialogFormVisible = true
      this.currentRecord = {}
      this.mode = 'new'
    },
    handleEdit(scope) {
      this.currentRecord = Object.assign({},this.list[scope.row.key])
      //this.currentRecord.password = ''
      this.bDialogFormVisible = true
      this.mode = 'edit'
    },
    createRecord()
    {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.bCreating = true;
          const postData = this.currentRecord
          if(this.mode == 'new')
          {
            if(this.currentRecord.password == '')
            {
              return false
            }
            addUser(postData)
            this.$message({
                  message: 'One User has been added.',
                  type: 'success',
                  duration: 5 * 1000,
              });
          }
          if(this.mode == 'edit')
          {
            updateUser(postData.id, postData)
            this.$message({
                message: 'One User has been updated.',
                type: 'success',
                duration: 5 * 1000,
            });
          }
          this.getList()
          this.bCreating = false;
          this.currentRecord = {}
          this.bDialogFormVisible = false
        }
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('You are about to delete this User', 'Options', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning',
          center: true
      }).then(() => {
          deleteUser(this.list[row.key].id)
          this.$message({
              message: 'One User has been deleted.',
              type: 'success',
              duration: 5 * 1000,
          });
          this.getList()
      }).catch((e) => {
          console.log(e)
      })
    },
    async getList() {
      const { limit, page } = this.query
      this.loading = true
      const { data, total } = await getList()
      data.forEach((element, key) => {
        element.key = key
      })
      this.list = data
      this.loading = false
    },
    async getRoles() {
      this.loading = true
      const param = {limit: 100,page: 1}
      const { data, total } = await getRoles(param)
      this.roles = data
      this.loading = false
    }
  }
}
</script>
