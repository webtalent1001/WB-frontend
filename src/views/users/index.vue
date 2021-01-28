<template>
  <div class="app-container">
    <!--Top Bar-->
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <!--Table-->
    <el-table :data="list" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
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

  </div>
</template>
<script>
import { getList } from '@/api/user'
import Pagination from '@/components/Pagination'
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
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleEdit(scope) {
      // this.dialogType = 'edit'
      // this.dialogVisible = true
      // this.checkStrictly = true
      // this.role = deepClone(scope.row)
      // this.$nextTick(() => {
      //   const routes = this.generateRoutes(this.role.routes)
      //   this.$refs.tree.setCheckedNodes(this.generateArr(routes))
      //   // set checked state of a node not affects its father and child nodes
      //   this.checkStrictly = false
      // })
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
    async getList() {
      const { limit, page } = this.query
      this.loading = true
      const { data, total } = await getList()
      this.list = data
      this.loading = false
    }
  }
}
</script>
