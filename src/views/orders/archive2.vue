
<template>
  <div class="app-container">

    <div class="filter-container">
      <h2>Walnut to Deliver</h2>
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
      <el-table ref="mainTbl" v-loading="bLoadingFulfilledTbl" :data="listFulfilled" border fit style="width: 100%;font-size:12px;">
        <el-table-column align="center" type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.items"
              border
              style="width: 100%;font-size:12px;"
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
                width="45"
              />
              <el-table-column
                prop="units"
                label="Units"
                width="60"
              />
              <el-table-column
                prop="unit_price"
                label="Unit Price"
                width="80"
              />
              <el-table-column
                prop="cpu"
                label="CPU"
                width="55"
              />
              <el-table-column
                prop="discount"
                label="Discount"
                width="80"
              />
              <el-table-column
                prop="discount_label"
                label="Discount Type"
                width="110"
              />
              <el-table-column
                prop="e_discount"
                label="Extra Discount"
                width="120"
              />
              <el-table-column
                prop="base_price"
                label="Sub Total"
                width="100"
              />
              <el-table-column
                prop="extended"
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
                width="100"
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
          prop="clientname"
          label="Sales Rep"
        />
        <el-table-column
          align="center"
          prop="clientname"
          label="Customer"
        />
        <el-table-column
          align="center"
          prop="adjust_price"
          label="WB + Excise Total"
          width="100"
        />
        <el-table-column
          align="center"
          prop="date"
          label="Date"
          width="85"
        />
        <el-table-column
          align="center"
          prop="companyname"
          label="Distributor"
          width="130"
        />
        <el-table-column
          align="center"
          prop="mm_status"
          label="Manifest Status"
        />
        <el-table-column
          align="center"
          prop="m_m_str"
          label="Metrc Manifest"
          width="130"
        />
        <el-table-column
          align="center"
          prop="scheduled"
          label="Scheduled"
          width="83"
        />
        <el-table-column
          align="center"
          prop="coa"
          :render-header="renderCoaHeader"
          width="65"
        >
          <template slot-scope="scope">
            <h1 v-if="scope.row.coainbox" class="icon-success">
              <i class="el-icon-check el-icon--right" />
            </h1>
            <h1 v-if="!scope.row.coainbox" class="icon-danger">
              <i class="el-icon-close el-icon--right" />
            </h1>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="60"
          prop="metrc_ready"
          label="Metrc Ready"
        >
          <template slot-scope="scope">
            <h1 v-if="scope.row.metrc_ready" class="icon-success">
              <i class="el-icon-check el-icon--right" />
            </h1>
            <h1 v-if="!scope.row.metrc_ready" class="icon-danger">
              <i class="el-icon-close el-icon--right" />
            </h1>
          </template>
        </el-table-column>
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
      <h2>Rejected Orders</h2>
      <el-table ref="mainProblemTbl" v-loading="bLoadingRejected" :data="listRejected" border fit highlight-current-row style="width: 100%;font-size:12px;">
        <el-table-column align="center" type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.items"
              border
              style="width: 100%;font-size:12px;"
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
                width="45"
              />
              <el-table-column
                prop="units"
                label="Units"
                width="60"
              />
              <el-table-column
                prop="unit_price"
                label="Unit Price"
                width="80"
              />
              <el-table-column
                prop="cpu"
                label="CPU"
                width="55"
              />
              <el-table-column
                prop="discount"
                label="Discount"
                width="80"
              />
              <el-table-column
                prop="discount_label"
                label="Discount Type"
                width="110"
              />
              <el-table-column
                prop="e_discount"
                label="Extra Discount"
                width="120"
              />
              <el-table-column
                prop="base_price"
                label="Sub Total"
                width="100"
              />
              <el-table-column
                prop="extended"
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
                width="100"
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
          label="Sales Rep"
        />
        <el-table-column
          align="center"
          prop="adjust_price"
          label="WB + Excise Total"
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
          prop="rType"
          label="Date"
          width="150"
        />
        <el-table-column
          align="center"
          prop="companyname"
          label="Distributor"
          width="200"
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
    </div>
  </div>
</template>
<script>
import WBOrderResource from '@/api/wborder'
import { defaultRage } from '@/utils/datemanage'
import Pagination from '@/components/Pagination'
const wbOrderResource = new WBOrderResource()
export default {
  name: 'WBOrderArchive2',
  components: { Pagination },
  data() {
    return {
      listFulfilled: [],
      listRejected: [],
      bLoadingFulfilledTbl: false,
      bLoadingRejected: false,
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
      totalRejected: 0,
      query: {
        page: 1,
        limit: 10,
        keyword: ''
      },
      queryRejected: {
        page: 1,
        limit: 1000,
        keyword: ''
      }
    }
  },
  created() {
    this.fnLoadDataFulfilled()
    this.fnLoadDataRejected()
  },
  methods: {
    handleDateChange() {
      this.fnLoadDataFulfilled()
    },
    handleFilter() {
      this.query.page = 1
      this.fnLoadDataFulfilled()
    },
    renderCoaHeader(h, { column }) {
      return h('div', { 'class': 'phase-header' }, [
        h('span', { 'class': '' }, 'COA in '),
        h('i', { 'class': 'el-icon-folder-checked hightlight-i' }, '')
      ])
    },
    async fnLoadDataFulfilled() {
      this.bLoadingFulfilledTbl = true
      const query = { ...this.query }
      const { limit, page } = this.query
      query.start_date = this.value2[0]
      query.end_date = this.value2[1]
      const { orders, total } = await wbOrderResource.archive2F(query)
      orders.forEach((element, index) => {
        orders[index] = { ...element, ...element.total_info }
        orders[index]['index'] = (page - 1) * limit + index + 1
        element.items.forEach((item, key) => {
          item.index = key + 1
        })
      })
      this.listFulfilled = orders
      this.total = total
      this.bLoadingFulfilledTbl = false
    },
    async fnLoadDataRejected() {
      this.bLoadingRejected = true
      const query = { ...this.queryRejected }
      query.nd = 1
      const { limit, page } = this.queryRejected
      const { orders, total } = await wbOrderResource.archive2R(query)
      orders.forEach((element, index) => {
        orders[index]['index'] = (page - 1) * limit + index + 1
        orders[index]['key'] = index
        element.items.forEach((item, key) => {
          item.index = key + 1
        })
      })
      this.listRejected = orders
      this.totalRejected = total
      this.bLoadingRejected = false
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
