
<template>
  <div class="app-container">
    <div class="filter-container">
      <h2>Pending Approval to Fulfill</h2>
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
      <el-table
        ref="mainTbl"
        v-loading="loading"
        show-summary
        :data="list"
        :summary-method="getMainTblSummaries"
        border
        fit
        highlight-current-row
        style="width: 100%"
        @expand-change="handleExpandRow"
      >
        <el-table-column align="center" type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.items"
              border
              style="width: 100%"
            >
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
                width="70"
              />
              <el-table-column
                prop="unit_price"
                label="Unit price"
                width="100"
              />
              <el-table-column
                prop="cpu"
                label="CPU"
                width="50"
              />
              <el-table-column
                prop="discount"
                label="Discount"
                width="100"
              />
              <el-table-column
                prop="discount_label"
                label="Discount Type"
                width="130"
              />
              <el-table-column
                prop="e_discount"
                label="Extra Discount"
                width="130"
              />
              <el-table-column
                prop="sub_total"
                label="Sub"
                width="100"
              />
              <el-table-column
                prop="less_discount"
                label="Extended"
                width="100"
              />
              <el-table-column
                prop="tax_note"
                label="Line Note"
                width="100"
              />
              <el-table-column
                prop="adjust_price"
                label="Adjust Price"
                width="130"
              />
            </el-table>
            <h3>Invoice Tracker</h3>
            <el-table
              :data="props.row.myInvoices"
              border
              show-summary
              sum-text="Total"
              empty-text="No Active Invoice outstanding"
              style="width: 100%;background:#D3D3D3;color:red;text-align:center"
            >
              <el-table-column
                prop="number"
                label="Number"
              />
              <el-table-column
                prop="date"
                label="Date"
              />
              <el-table-column
                prop="subTotal"
                label="Sub Total"
              />
              <el-table-column
                prop="tax"
                label="Total Excise Tax"
              />
              <el-table-column
                prop="total"
                label="Total Due"
              />
              <el-table-column
                prop="pTotal"
                label="Total Collected"
              />
              <el-table-column
                prop="pTax"
                label="Total Collected Tax"
              />
              <el-table-column
                prop="rTotal"
                label="Remaining Sub Total"
              />
              <el-table-column
                prop="rTax"
                label="Remaining Tax"
              />
              <el-table-column
                prop="rTotal"
                label="View"
              />
              <el-table-column
                prop="rTax"
                label="Download"
              />
              />
            </el-table>
            <h3>Pending Orders</h3>
            <el-table
              :data="props.row.pendingOrders"
              border
              show-summary
              sum-text="Total"
              style="width: 100%;background:#E42217;text-align:center"
            >
              <el-table-column
                prop="number"
                label="Number"
              />
              <el-table-column
                prop="date"
                label="Date"
              />
              <el-table-column
                align="center"
                prop="base_price"
                label="TBP"
              />
              <el-table-column
                align="center"
                prop="discount"
                label="Discount"
              />
              <el-table-column
                align="center"
                prop="e_discount"
                label="Extra Discount"
              />
              <el-table-column
                align="center"
                prop="extended"
                label="Sub"
              />
              <el-table-column
                align="center"
                prop="prValue"
                label="PR-Value"
              />
              <el-table-column
                align="center"
                prop="tax"
                label="ETax"
              />
              <el-table-column
                align="center"
                prop="adjust_price"
                label="Total Due"
              />
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
        />
        <el-table-column
          align="center"
          prop="clientname"
          label="Client"
        />
        <el-table-column
          align="center"
          prop="distributor.companyname"
          label="Distributor"
          width="200"
        />
        <el-table-column
          align="center"
          prop="base_price"
          label="TBP"
          width="100"
        />
        <el-table-column
          align="center"
          prop="discount"
          label="Discount"
          width="90"
        />
        <el-table-column
          align="center"
          prop="e_discount"
          label="Extra Discount"
          width="75"
        />
        <el-table-column
          align="center"
          prop="extended"
          label="Sub"
          width="100"
        />
        <el-table-column
          align="center"
          prop="prValue"
          label="PR-Value"
          width="70"
        />
        <el-table-column
          align="center"
          prop="tax"
          label="ETax"
          width="70"
        />
        <el-table-column
          align="center"
          prop="adjust_price"
          label="Total Due"
          width="100"
        />
        <el-table-column
          align="center"
          prop="fTime"
          label="ETC"
          width="100"
        />
        <el-table-column
          align="center"
          prop="date"
          label="Date"
          width="100"
        />
        <el-table-column align="center" label="Actions" width="150">
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="handleRowAction">
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
      <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="fnLoadData" />
    </div>
  </div>
</template>
<script>
import WBOrderResource from '@/api/wborder'
import { defaultRage } from '@/utils/datemanage'
import Pagination from '@/components/Pagination'
const wbOrderResource = new WBOrderResource()
export default {
  name: 'WBOrderArchive0',
  components: { Pagination },
  data() {
    return {
      list: [],
      loading: false,
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
      total: 0,
      query: {
        page: 1,
        limit: 10,
        keyword: ''
      }
    }
  },
  created() {
    this.fnLoadData()
  },
  methods: {
    async handleExpandRow(row, expanded) {
      let bExpanded = false
      expanded.forEach(element => {
        if (element.id === row.id) {
          bExpanded = true
        }
      })
      if (bExpanded && !row.bLoaded) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const res = await wbOrderResource.getPendingDetail(row.id)
        this.list[row.key] = { ...this.list[row.key], ...res.customerFinacialInfo }
        res.pendingOrders.forEach((element, key) => {
          res.pendingOrders[key] = { ...res.pendingOrders[key], ...res.pendingOrders[key].total_info }
        })
        this.list[row.key].pendingOrders = res.pendingOrders
        this.list[row.key].bLoaded = true
        loading.close()
      }
    },
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
      this.fnLoadData()
    },
    handleFilter() {
      this.query.page = 1
      this.fnLoadData()
    },
    handleRowAction(param) {
      console.log(param)
    },
    async fnLoadData() {
      this.loading = true
      const query = { ...this.query }
      const { limit, page } = this.query
      query.start_date = this.value2[0]
      query.end_date = this.value2[1]
      const { orders, total } = await wbOrderResource.archive0(query)
      this.list = orders
      this.total = total
      this.list.forEach((element, index) => {
        this.list[index] = { ...element, ...element.total_info }
        this.list[index]['index'] = (page - 1) * limit + index + 1
        this.list[index]['key'] = index
      })
      this.loading = false
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
