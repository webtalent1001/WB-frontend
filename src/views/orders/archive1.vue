
<template>
  <div class="app-container">
    <div class="filter-container">
      <h2>FulFillment</h2>
      <el-row>
        <el-col :sm="12">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            format="MM/dd/yyyy"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            style="width:500px;"
            @change="handleDateChange"
          />
        </el-col>
        <el-col :sm="12" style="text-align:right">
          <el-input v-model="query.keyword" placeholder="Search" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-col>
      </el-row>
      <el-table ref="mainTbl" v-loading="fulfillmentLoading" :row-style="setRowStyle" :data="listFulfillment" border fit style="width: 100%">
        <el-table-column align="center" type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.items"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="index"
                label="No"
                width="50"
              />
              <el-table-column
                prop="description"
                label="Description"
              />
              <el-table-column
                prop="qty"
                label="Qty"
                width="50"
              />
              <el-table-column
                prop="units"
                label="Units"
                width="50"
              />
              <el-table-column
                prop="unit_price"
                label="Unit Price"
                width="50"
              />
              <el-table-column
                prop="cpu"
                label="CPU"
                width="100"
              />
              <el-table-column
                prop="discount"
                label="Discount"
                width="50"
              />
              <el-table-column
                prop="discount_label"
                label="Discount Type"
                width="120"
              />
              <el-table-column
                prop="e_discount"
                label="Extra Discount"
                width="50"
              />
              <el-table-column
                prop="sub_total"
                label="Sub Total"
                width="50"
              />
              <el-table-column
                prop="less_discount"
                label="Extended"
                width="50"
              />
              <el-table-column
                prop="tax_note"
                label="Line Note"
                width="150"
              />
              <el-table-column
                prop="adjust_price"
                label="Adjust Price"
                width="50"
              />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="index"
          label="No"
          width="50"
        />
        <el-table-column
          align="center"
          prop="number"
          label="Sales Order"
          width="100"
        />
        <el-table-column
          align="center"
          prop="clientname"
          label="Client"
        />
        <el-table-column
          align="center"
          prop="companyname"
          label="Distributor"
          width="200"
        />
        <el-table-column
          align="center"
          prop="adjust_price"
          label="Total Cost"
          width="100"
        />
        <el-table-column
          align="center"
          prop="date"
          label="Date"
          width="150"
        />
        <el-table-column
          align="center"
          prop="fTime"
          label="ETC"
          width="90"
        />
        <el-table-column
          align="center"
          prop="priorityLabel"
          label="Priority"
          width="100"
        />
        <el-table-column align="center" label="Actions" width="150">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button type="primary">
                Actions<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link target="_blank" :to="'page1?id=' + scope.row.id">
                    <i class="el-icon-document" />View
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item :command="scope.row.key + ',1'" icon="el-icon-download">CSV</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="fnLoadDataFulfillment" />
      <h2>Problematic Orders</h2>
      <el-row>
        <el-col :sm="12">
          <el-date-picker
            v-model="value1"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            format="MM/dd/yyyy"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            style="width:500px;"
            @change="handleProblemDateChange"
          />
        </el-col>
        <el-col :sm="12" style="text-align:right">
          <el-input v-model="query.keyword" placeholder="Search" style="width: 200px;" class="filter-item" @keyup.enter.native="handleProblemFilter" />
        </el-col>
      </el-row>
      <el-table ref="mainProblemTbl" v-loading="problemLoading" :data="listProblem" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.items"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="index"
                label="No"
                width="50"
              />
              <el-table-column
                prop="description"
                label="Description"
              />
              <el-table-column
                prop="qty"
                label="Qty"
                width="50"
              />
              <el-table-column
                prop="units"
                label="Units"
                width="80"
              />
              <el-table-column
                prop="unit_price"
                label="Unit Price"
                width="50"
              />
              <el-table-column
                prop="cpu"
                label="CPU"
                width="80"
              />
              <el-table-column
                prop="discount"
                label="Discount"
                width="100"
              />
              <el-table-column
                prop="discount_label"
                label="Discount Type"
                width="120"
              />
              <el-table-column
                prop="e_discount"
                label="Extra Discount"
                width="120"
              />
              <el-table-column
                prop="sub_total"
                label="Sub Total"
                width="120"
              />
              <el-table-column
                prop="less_discount"
                label="Extended"
                width="100"
              />
              <el-table-column
                prop="tax_note"
                label="Line Note"
                width="150"
              />
              <el-table-column
                prop="adjust_price"
                label="Adjust Price"
                width="150"
              />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="index"
          label="No"
          width="50"
        />
        <el-table-column
          align="center"
          prop="number"
          label="Sales Order"
          width="100"
        />
        <el-table-column
          align="center"
          prop="clientname"
          label="Client"
        />
        <el-table-column
          align="center"
          prop="companyname"
          label="Distributor"
          width="200"
        />
        <el-table-column
          align="center"
          prop="adjust_price"
          label="Total Cost"
          width="100"
        />
        <el-table-column
          align="center"
          prop="date"
          label="Date"
          width="150"
        />
        <el-table-column align="center" label="Actions" width="150">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button type="primary">
                Actions<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link target="_blank" :to="'page1?id=' + scope.row.id">
                    <i class="el-icon-document" />View
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item :command="scope.row.key + ',1'" icon="el-icon-download">CSV</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="totalProblem>0" :total="totalProblem" :page.sync="queryProblem.page" :limit.sync="queryProblem.limit" @pagination="fnLoadDataProblem" />
    </div>
  </div>
</template>
<script>
import WBOrderResource from '@/api/wborder'
import { defaultRage } from '@/utils/datemanage'
import Pagination from '@/components/Pagination'
const wbOrderResource = new WBOrderResource()
export default {
  name: 'WBOrderArchive1',
  components: { Pagination },
  data() {
    return {
      listFulfillment: [],
      listProblem: [],
      fulfillmentLoading: false,
      problemLoading: false,
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Last month',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Last 3 months',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: defaultRage(),
      value1: defaultRage(),
      total: 0,
      totalProblem: 0,
      query: {
        page: 1,
        limit: 10,
        keyword: ''
      },
      queryProblem: {
        page: 1,
        limit: 10,
        keyword: ''
      }
    }
  },
  created() {
    this.fnLoadDataFulfillment()
    this.fnLoadDataProblem()
  },
  methods: {
    getMainTblSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index < 4) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          let prefix = ''
          switch (index) {
            case 5:
              prefix = 'TBP:'
              break
            case 6:
              prefix = 'Discount:'
              break
            case 7:
              prefix = 'Extra Discount:'
              break
            case 8:
              prefix = 'Sub:'
              break
            case 9:
              prefix = 'PR-Value:'
              break
            case 10:
              prefix = 'ETax:'
              break
            case 11:
              prefix = 'Total Due:'
              break
            case 12:
              prefix = 'Total Debt:'
              break
          }
          sums[index] = prefix + '$' + values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0).toFixed(2)
        } else {
          sums[index] = ''
        }
      })

      return sums
    },
    handleDateChange() {
      this.fnLoadDataFulfillment()
    },
    handleProblemDateChange() {
      this.fnLoadDataProblem()
    },
    handleFilter() {
      this.query.page = 1
      this.fnLoadDataFulfillment()
    },
    handleProblemFilter() {
      this.queryProblem.page = 1
      this.fnLoadDataProblem()
    },
    setRowStyle({ row, rowIndex }) {
      if (row.priority.bk_color != null) {
        return { 'background-color': row.priority.bk_color, 'color': row.priority.font_color }
      }
    },
    async fnLoadDataFulfillment() {
      this.fulfillmentLoading = true
      const query = { ...this.query }
      const { limit, page } = this.query
      query.start_date = this.value2[0]
      query.end_date = this.value2[1]
      query.status = 1
      const { orders, total } = await wbOrderResource.archive1(query)
      orders.forEach((element, index) => {
        orders[index] = { ...element, ...element.total_info }
        orders[index]['index'] = (page - 1) * limit + index + 1
        orders[index]['key'] = index
      })
      this.listFulfillment = orders
      this.total = total
      this.fulfillmentLoading = false
    },
    async fnLoadDataProblem() {
      this.problemLoading = true
      const query = { ...this.queryProblem }
      const { limit, page } = this.queryProblem
      query.start_date = this.value1[0]
      query.end_date = this.value1[1]
      query.status = 2
      const { orders, total } = await wbOrderResource.archive1(query)
      orders.forEach((element, index) => {
        orders[index] = { ...element, ...element.total_info }
        orders[index]['index'] = (page - 1) * limit + index + 1
        orders[index]['key'] = index
      })
      this.listProblem = orders
      this.totalProblem = total
      this.problemLoading = false
    }
  }
}
</script>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
