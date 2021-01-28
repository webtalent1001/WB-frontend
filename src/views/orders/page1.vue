<template>
  <div class="main-content">
    <el-row class="header">
      <el-col :span="16">
        <img class="wscnph" src="@/assets/wbcolorlogo.jpg" style="width:120px;height:120px" alt="404">
      </el-col>
      <el-col :span="8">
        <p class="bolderP headerP">{{ order.company_detail.companyname }}</p>
        <p class="lightP headerP">{{ order.company_detail.address1 }}</p>
        <p class="lightP headerP">
          {{ order.company_detail.city }}&nbsp;
          {{ order.company_detail.state }}&nbsp;
          {{ order.company_detail.zip }}&nbsp;
        </p>
        <p class="lightP headerP">Cultivation LIC: CCL19-00006000</p>
        <p class="lightP headerP">{{ order.company_detail.phone }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <p class="bolderrP">INVOICE DATE:{{ order.date }}</p>
        <p class="bolderrP">INVOICE #:{{ order.number }}</p>
        <p class="bolderrP">METRC MANIFEST:{{ order.m_m_str }}</p>
        <p class="lightP">TERMS: {{ order.customer.termLabel }}</p>
        <p class="lightP">REP:{{ order.salesperson.firstname + ' ' + order.salesperson.lastname }}</p>
        <p class="lightP">REP PHONE:{{ order.customer.telephone }}</p>
      </el-col>
      <el-col :span="8">
        <p class="bolderP">{{ order.cname }}</p>
        <p class="lightP">{{ order.customer.address1 }}</p>
        <p class="lightP">
          {{ order.customer.city }}
          {{ order.customer.state_label }}
          {{ order.customer.zip }}
        </p>
        <p class="lightP">Phone: {{ order.customer.companyphone }}</p>
        <p class="lightP">Email:{{ order.customer.companyemail }}</p>
        <p class="lightP">License:{{ order.customer.licensenumber }}</p>
      </el-col>
      <el-col :span="8">
        <p class="bolderP">Distributor/Transporter</p>
        <p class="bolderP">{{ order.distuributor.companyname }}</p>
        <p class="lightP">
          {{ order.distuributor.address1 }},
          {{ order.distuributor.address2 }}
        </p>
        <p class="lightP">
          {{ order.distuributor.city }},
          {{ order.distuributor.state_label }}
          {{ order.distuributor.zipcode }}
        </p>
        <p class="lightP">
          Phone: {{ order.distuributor.phone }}
        </p>
        <p class="lightP">
          Email: {{ order.distuributor.email }}
        </p>
        <span class="lightP">License: </span><span class="bolderP">{{ order.distuributor.license }}</span>
      </el-col>
    </el-row>
    <template>
      <el-table
        :data="order.items"
        style="width: 100%;"
      >
        <el-table-column
          prop="strain_label"
          label="Strain"
        />
        <el-table-column
          prop="p_type_label"
          label="Product Type"
        />
        <el-table-column
          prop="qty"
          label="Qty"
          width="50"
        />
        <el-table-column
          prop="units"
          label="Units"
          width="60"
        />
        <el-table-column
          prop="unit_price"
          label="Base Price"
          width="100"
        />
        <el-table-column
          prop="cpu"
          label="CPU"
          width="90"
        />
        <el-table-column
          prop="discount"
          label="Discount"
          width="100"
        />
        <el-table-column
          prop="dis_type"
          label="Discount Type"
          width="130"
        />
        <el-table-column
          prop="e_discount"
          label="Extra Discount"
          width="130"
        />
        <el-table-column
          prop="bp"
          label="Sub Total"
          width="100"
        />
        <el-table-column
          prop="extended"
          label="Extended"
          width="100"
        />
        <el-table-column
          prop="t_note"
          label="Line Note"
          width="150"
        />
        <el-table-column
          prop="ap"
          label="Adjust Total"
          width="130"
        />
      </el-table>
      <el-table
        :data="orderTotal"
        border
        :show-header="false"
        style="width: 40%;margin-top:30px;"
      >
        <el-table-column
          prop="name"
          class-name="bold-td"
        />
        <el-table-column
          prop="value"
          width="180"
        />
      </el-table>
    </template>
  </div>
</template>

<script>
import WBOrderResource from '@/api/wborder'
const wbOrderResource = new WBOrderResource()

export default {
  data() {
    return {
      order: { company_detail: '', customer: '', salesperson: '' },
      orderTotal: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.order = await wbOrderResource.getOrderDetail(this.$route.query.id)
      this.order.items.forEach((element, key) => {
        this.order.items[key].unit_price = '$' + this.order.items[key].unit_price
        this.order.items[key].cpu = '$' + this.order.items[key].cpu
        this.order.items[key].discount = '$' + this.order.items[key].discount
        this.order.items[key].e_discount = '$' + this.order.items[key].e_discount
        this.order.items[key].bp = '$' + this.order.items[key].bp
        this.order.items[key].extended = '$' + this.order.items[key].extended
        this.order.items[key].ap = '$' + this.order.items[key].ap
      })
      const total = this.order.total_info
      this.orderTotal.push({ name: 'Total Base Price:', value: '$' + total.base_price })
      this.orderTotal.push({ name: 'Discount Amount:', value: '$' + total.discount })
      this.orderTotal.push({ name: 'Total Extra Discount:', value: '$' + total.e_discount })
      this.orderTotal.push({ name: 'Promotion Value:', value: '$' + total.promotion })
      this.orderTotal.push({ name: 'Sub Total:', value: '$' + total.extended })
      this.orderTotal.push({ name: 'CA Excise Tax Based On Total Base Price @27%:', value: '$' + total.tax })
      this.orderTotal.push({ name: 'Total Due:', value: '$' + total.adjust_price })
    }
  }
}
</script>

<style lang="scss">
.bold-td{
  font-weight: bolder;
}
@mixin clearfix {
  &:before {
    display: table;
    content: '';
    clear: both;
  }

  &:after {
    display: table;
    content: '';
    clear: both;
  }
}
@media print {
  table{
    font-size:1vw;
  }
}
.headerP{
  margin: 8px;
}
.main-content{
  padding: 20px;
  margin: 0 auto;
  display: block;
  background: #fff;
}
.header{
  background:#e2e2e2;
  padding: 10px;
}
.bolderP{
  font-size:14px;
  font-weight: bolder;
}

.bolderrP{
  font-size:15px;
  font-weight: bolder;
}

.lightP{
  font-size:14px;
}
.content{
  margin: 20px 0 0;
  @include clearfix;
  font-size: 16px;
  color: #333;
  letter-spacing: 0.5px;
  line-height: 28px;
  margin-bottom: 30px;
}
</style>
