
<template>
  <div class="app-container">

    <div class="filter-container">
      <h2>Walnut Delivered</h2>
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
      <el-table ref="mainTbl" v-loading="bLoadingTbl" :summary-method="getSummaries" show-summary :data="list" border fit style="width: 100%;font-size:12px;">
        <el-table-column align="center" type="expand">
          <template slot-scope="props">
            <h3>Verified Payments</h3>
            <el-table
              :data="props.row.logs.allowed"
              border
              style="width:900px;font-size:12px;"
            >
              <el-table-column
                prop="index"
                label="No"
                width="50"
              />
              <el-table-column
                prop="type"
                label="Type"
              />
              <el-table-column
                prop="qty"
                label="Amount"
                width="125"
              />
              <el-table-column
                prop="deliveryerName"
                label="Collected By"
                width="120"
              />
              <el-table-column
                label="Signature"
                width="150"
              >
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="signFileUrl + '/' + scope.row.sign_filename"
                    :preview-src-list="[signFileUrl + '/' + scope.row.sign_filename]"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="hDate"
                label="Date"
                width="150"
              />
            </el-table>
            <h3>Awaiting Payments</h3>
            <el-table
              :data="props.row.logs.unallowed"
              border
              style="width:900px;font-size:12px;"
            >
              <el-table-column
                prop="index"
                label="No"
                width="50"
              />
              <el-table-column
                prop="type"
                label="Type"
              />
              <el-table-column
                prop="qty"
                label="Amount"
                width="125"
              />
              <el-table-column
                prop="deliveryerName"
                label="Collected By"
                width="120"
              />
              <el-table-column
                label="Signature"
                width="150"
              >
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="signFileUrl + '/' + scope.row.sign_filename"
                    :preview-src-list="[signFileUrl + '/' + scope.row.sign_filename]"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="hDate"
                label="Date"
                width="150"
              />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="index"
          label="No"
          width="40"
        />
        <el-table-column
          align="center"
          prop="number"
          label="Sales Order"
          width="90"
        />
        <el-table-column
          align="center"
          prop="number2"
          label="Invoice"
          width="95"
        />
        <el-table-column
          align="center"
          prop="salesRep"
          label="Sales Rep"
          width="110"
        />
        <el-table-column
          align="center"
          prop="clientname"
          label="Customer"
        />
        <el-table-column
          align="center"
          prop="total"
          label="Total Price"
          width="100"
        />
        <el-table-column
          align="center"
          prop="rSubTotal"
          label="R Sub Total"
          width="95"
        />
        <el-table-column
          align="center"
          prop="rTax"
          label="R Tax"
          width="130"
        />
        <el-table-column
          align="center"
          prop="date"
          label="Creation Date"
          width="110"
        />
        <el-table-column
          align="center"
          prop="delivery_time"
          label="Delivered Date"
          width="90"
        />
        <el-table-column align="center" label="Actions" width="130">
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
      <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="fnLoadDataFulfilled" />
    </div>
  </div>
</template>
<script>
import WBOrderResource from '@/api/wborder'
import { defaultRage } from '@/utils/datemanage'
import Pagination from '@/components/Pagination'
const wbOrderResource = new WBOrderResource()
export default {
  name: 'WBOrderArchive4',
  components: { Pagination },
  data() {
    return {
      list: [],
      bLoadingTbl: false,
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
      },
      queryRejected: {
        page: 1,
        limit: 1000,
        keyword: ''
      },
      totalSum: {},
      signFileUrl: ''
    }
  },
  created() {
    this.fnLoadDataFulfilled()
  },
  methods: {
    handleDateChange() {
      this.fnLoadDataFulfilled()
    },
    handleFilter() {
      this.query.page = 1
      this.fnLoadDataFulfilled()
    },
    getSummaries(param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        switch (index) {
          case 2:
            sums[index] = 'Sub Total:'
            break
          case 3:
            sums[index] = '$' + this.totalSum.total_sum
            break
          case 4:
            sums[index] = 'Discount:'
            break
          case 5:
            sums[index] = '$' + this.totalSum.discount_sum
            break
          case 6:
            sums[index] = 'Tax:'
            break
          case 7:
            sums[index] = '$' + this.totalSum.tax_sum
            break
          default:
            sums[index] = ''
        }
        return
      })

      return sums
    },
    async fnLoadDataFulfilled() {
      this.bLoadingTbl = true
      const query = { ...this.query }
      const { limit, page } = this.query
      query.start_date = this.value2[0]
      query.end_date = this.value2[1]
      const { orders, total, signFileUrl, total_sum, discount_sum, tax_sum } = await wbOrderResource.archive4(query)
      orders.forEach((element, index) => {
        orders[index] = { ...element, ...element.total_info }
        orders[index]['index'] = (page - 1) * limit + index + 1
        element.logs.allowed.forEach((item, key) => {
          item.index = key + 1
        })
        element.logs.unallowed.forEach((item, key) => {
          item.index = key + 1
        })
      })
      this.list = orders
      this.total = total
      this.totalSum.total_sum = total_sum
      this.totalSum.discount_sum = discount_sum
      this.totalSum.tax_sum = tax_sum
      this.signFileUrl = signFileUrl
      this.bLoadingTbl = false
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
  .icon-success{
    color:#67C23A;
  }
  .icon-danger{
    color:#F56C6C;
  }
  .hightlight-i{
    font-weight: bolder;
    font-size: 140%;
  }
</style>
