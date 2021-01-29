
<template>
  <div class="app-container">

    <div class="filter-container">
      <h2>Scheduled Deliveries</h2>
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
      <el-table ref="mainTbl" v-loading="bLoadingTbl" :data="list" border fit style="width: 100%;font-size:12px;">
        
        <el-table-column
          align="center"
          prop="index"
          label="No"
          width="40"
        />
        <el-table-column
          align="center"
          prop="number"
          label="Invoice"
        />
        <el-table-column
          align="center"
          prop="numberSO"
          label="Sales Order"
        />
        <el-table-column
          align="center"
          prop="dDate"
          label="Delivery Date"
          width="110"
        />
        <el-table-column
          align="center"
          prop="deliveryer"
          label="Transported Via"
        />
        <el-table-column
          align="center"
          prop="time"
          label="Time"
          width="100"
        />
        <el-table-column
          align="center"
          prop="cName"
          label="Customer"
        />
        <el-table-column
          align="center"
          prop="amount"
          label="Amount"
          width="130"
        />
        <el-table-column
          align="center"
          prop="isDelivered"
          label="Status"
          width="110"
        >
          <template slot-scope="scope">
            <h1 v-if="scope.row.isDelivered == 1" class="icon-success">
              <i class="el-icon-check el-icon--right" />
            </h1>
            <h1 v-if="scope.row.isDelivered == 0" class="icon-danger">
              <i class="el-icon-alarm-clock el-icon--right" />
            </h1>
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
  name: 'WBOrderArchiveScheduled',
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
      totalStat: {},
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
    async fnLoadDataFulfilled() {
      this.bLoadingTbl = true
      const query = { ...this.query }
      const { limit, page } = this.query
      query.start_date = this.value2[0]
      query.end_date = this.value2[1]
      const { orders, total, total_stat } = await wbOrderResource.archiveScheduled(query)
      orders.forEach((element, index) => {
        orders[index] = { ...element, ...element.total_info }
        orders[index]['index'] = (page - 1) * limit + index + 1
      })
      this.list = orders
      this.total = total
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
