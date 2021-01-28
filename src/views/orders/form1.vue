<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-position="top" :rules="orderRules" label-suffix=":">
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item :label="$t('order.form.customer')" prop="customer">
            <el-select v-model="currentRecord.customer_id" filterable prefix-icon="el-icon-user-solid" :placeholder="$t('common.selectLabel') + $t('order.form.customer')" @change="handleChangeCustomer">
              <el-option v-for="item in initialData.customers" :key="item.client_id" :label="item.clientname" :value="item.client_id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item>
            <el-button type="primary" style="margin-top:45px;" @click="onAddCustomer">
              <i class="el-icon-plus" />&nbsp;{{ $t('order.form.btnAddCustomer') }}
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :sm="4">
          <el-form-item :label="$t('order.form.date')">
            <span>{{ currentRecord.date }}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="4">
          <el-form-item :label="$t('order.form.number')">
            <span>{{ currentRecord.number }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="8">
          <el-form-item :label="$t('order.form.salesPerson')" prop="contactPerson">
            <el-select v-model="currentRecord.salesperson_id" filterable :placeholder="$t('common.selectLabel') + $t('order.form.salesPerson')">
              <el-option v-for="item in initialData.contactPersons" :key="item.contact_id" :label="item.firstname + ',' + item.lastname" :value="item.contact_id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="16">
          <el-form-item :label="$t('order.form.term')">
            <span>{{ termLabel }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="8" :xs="24">
          <el-form-item :label="$t('order.form.note')">
            <el-input v-model="currentRecord.note" type="textarea" rows="4" />
          </el-form-item>
        </el-col>
        <el-col :sm="8" :xs="24">
          <el-form-item :label="$t('order.form.fulfillNote')">
            <el-input v-model="currentRecord.fulfillmentnote" type="textarea" rows="4" />
          </el-form-item>
        </el-col>
        <el-col :sm="4" :xs="12">
          <el-form-item :label="$t('order.form.orderDiscount')">
            <el-select v-model="discount" filterable :placeholder="$t('common.selectLabel') + $t('order.form.customer')" @change="handleDiscountChange">
              <el-option v-for="item in initialData.discounts" :key="item.promoid" :label="item.name" :value="item.promoid" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="4" :xs="12">
          <el-form-item :label="$t('order.form.bTax')">
            <el-checkbox v-model="currentRecord.tax_allow" @change="handleTaxAllow">{{ '' }}</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="formRow" :rules="rowRules" :model="currentRow" label-position="top">
      <el-row :gutter="10">
        <el-col :sm="11" :xs="24">
          <label>{{ $t('order.form.selectedInventoryBalance.qty') }}</label>
          <label>{{ selectedBalance.qty }}</label>
          <label>{{ $t('order.form.selectedInventoryBalance.weight') }}</label>
          <label>{{ selectedBalance.weight }}</label>
          <el-row>
            <el-col :sm="12" :xs="24">
              <el-form-item :label="$t('order.form.strain')" prop="strain">
                <el-select v-model="currentRow.strain" filterable :placeholder="$t('common.selectLabel') + $t('order.form.strain')" @change="handleInventoryChange">
                  <el-option v-for="item in initialData.strains" :key="item.itemname_id" :label="item.strain" :value="item.itemname_id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item :label="$t('order.form.pType')" prop="p_type">
                <el-select v-model="currentRow.p_type" filterable :placeholder="$t('common.selectLabel') + $t('order.form.pType')" @change="handleInventoryChange">
                  <el-option v-for="item in initialData.pTypes" :key="item.producttype_id" :label="item.producttype" :value="item.producttype_id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.qty')" prop="qty">
                <el-input-number v-model="currentRow.qty" controls-position="right" :min="1" :inline-message="$t('order.form.row.qty')" @change="handleInventoryChange" />
              </el-form-item>
            </el-col>
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.unit')">
                <el-input v-model="currentRow.units" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.basePrice')" prop="unit_price">
                <el-input-number v-model="currentRow.unit_price" :min="0" controls-position="right" @change="handleUnitPriceChange" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.subTotal')">
                <el-input v-model="currentRow.st" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.cpu')">
                <el-input v-model="currentRow.cpu" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.discount')">
                <el-select v-model="currentRow.discount_id" filterable :placeholder="$t('common.selectLabel') + $t('order.form.customer')" @change="handleRowDiscountChange">
                  <el-option v-for="item in initialData.discounts" :key="item.promoid" :label="item.name" :value="item.promoid" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.discountResult')">
                <el-input v-model="currentRow.discount" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.eDiscount')">
                <el-input v-model="currentRow.e_discount" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.extended')">
                <el-input v-model="currentRow.extended" :readonly="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.tax')">
                <el-input-number v-model="currentRow.tax" controls-position="right" :disabled="currentRow.bTax" @change="handleUnitPriceChange" />
              </el-form-item>
            </el-col>
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.note')">
                <el-input v-model="currentRow.tax_note" />
              </el-form-item>
            </el-col>
            <el-col :sm="8" :xs="24">
              <el-form-item :label="$t('order.form.row.total')">
                <el-input v-model="currentRow.ap" :readonly="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-button type="primary" @click="handleAddRow">
            <i class="el-icon-plus" />&nbsp;{{ $t('order.form.row.btnAdd') }}
          </el-button>
        </el-col>
        <el-col :sm="13" :xs="24">
          <el-table :data="initialData.inventoryStatus" stripe border fit highlight-current-row height="470">
            <el-table-column align="center" sortable :label="$t('order.form.strain')" width="170" prop="strain" />
            <el-table-column align="center" sortable :label="$t('order.form.pType')" prop="p_type" />
            <el-table-column align="center" sortable :label="$t('order.form.qty')" width="50" prop="qty" />
            <el-table-column align="center" sortable :label="$t('order.form.weight')" width="100" prop="weight" />
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="insertedData" stripe border fit highlight-current-row style="margin-top:30px;">
      <el-table-column align="center" :label="$t('order.form.row.no')" width="50" prop="key" />
      <el-table-column align="center" :label="$t('order.form.row.description')" prop="description" />
      <el-table-column align="center" :label="$t('order.form.row.qty')" width="50" prop="qty" />
      <el-table-column align="center" :label="$t('order.form.row.unit')" width="100" prop="units" />
      <el-table-column align="center" :label="$t('order.form.row.basePrice')" width="100" prop="unit_price" />
      <el-table-column align="center" :label="$t('order.form.row.subTotal')" width="100" prop="st" />
      <el-table-column align="center" :label="$t('order.form.row.cpu')" width="100" prop="cpu" />
      <el-table-column align="center" :label="$t('order.form.row.discountResult')" width="100" prop="discount" />
      <el-table-column align="center" :label="$t('order.form.row.discountType')" width="100" prop="discountLabel" />
      <el-table-column align="center" :label="$t('order.form.row.eDiscount')" width="100" prop="e_discount" />
      <el-table-column align="center" :label="$t('order.form.row.extended')" width="100" prop="extended" />
      <el-table-column align="center" :label="$t('order.form.row.lineNote')" width="100" prop="tax_note" />
      <el-table-column align="center" :label="$t('order.form.row.total')" width="100" prop="ap" />
      <el-table-column align="center" label="Actions" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEditRow(scope.row.key)">
            {{ $t('customer.edit') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="100">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleRemoveRow(scope.row.key)">
            {{ $t('customer.edit') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="orderTotalTableData"
      border
      :show-header="false"
      style="width: 50%;margin-top:30px;"
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
    <el-button type="primary" style="margin-top:45px;" @click="onSubmit">
      {{ $t('order.form.btnSubmit') }}
    </el-button>
  </div>
</template>
<script>
import WBOrderResource from '@/api/wborder'
const wbOrderResource = new WBOrderResource()
export default {
  name: 'OrderForm',
  data() {
    const validateQty = (rule, value, callback) => {
      if (this.currentRow.qty > this.selectedBalance.qty) {
        callback(new Error('Please Enter Validate Qty'))
      }
      setTimeout(() => {
        if (this.currentRow.qty > 0) {
          this.$refs.formRow.validateField('qty')
        }
        callback()
      }, 1000)
    }
    const validateUnitPrice = (rule, value, callback) => {
      if (this.currentRow.unit_price <= 0) {
        callback(new Error('Please Enter Validate Price'))
      }
      setTimeout(() => {
        if (this.currentRow.unit_price > 0) {
          this.$refs.formRow.validateField('unit_price')
        }
        callback()
      }, 1000)
    }
    const validateStrain = (rule, value, callback) => {
      if (this.currentRow.strain === null) {
        callback(new Error('Please Enter Strain'))
      }
      setTimeout(() => {
        if (this.currentRow.strain !== null) {
          this.$refs.formRow.validateField('strain')
        }
        callback()
      }, 1000)
    }
    const validatePType = (rule, value, callback) => {
      if (this.currentRow.p_type === null) {
        callback(new Error('Please Select Product Type'))
      }
      setTimeout(() => {
        if (this.currentRow.p_type !== null) {
          this.$refs.formRow.validateField('p_type')
        }
        callback()
      }, 1000)
    }
    const validateCustomer = (rule, value, callback) => {
      if (this.currentRecord.customer_id === null) {
        callback(new Error('Please Select Customer'))
      }
      setTimeout(() => {
        if (this.currentRow.p_type !== null) {
          this.$refs.form.validateField('customer')
        }
        callback()
      }, 1000)
    }
    const validateContactPerson = (rule, value, callback) => {
      if (this.currentRecord.customer_id === null) {
        callback(new Error('Please Select SalesPerson'))
      }
      setTimeout(() => {
        if (this.currentRow.p_type !== null) {
          this.$refs.form.validateField('contactPerson')
        }
        callback()
      }, 1000)
    }
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      initialData: {
        customers: [{ id: '', name: '' }],
        contactPersons: [{ contact_id: '', firstname: '', lastname: '' }],
        inventoryStatus: [],
        discounts: [{ promoid: '', name: 'a', datecreated: '' }]
      },
      selectedBalance: {
        qty: 0,
        weight: 0,
        bp: 0,
        taxE: 0
      },
      inventoryStatus: [{ strain: '', p_type: '', qty: '', weight: '' }],
      currentRecord: {
        number: '',
        customer_id: null,
        date: '',
        note: '',
        fulfillmentnote: '',
        distuributor_id: 0,
        total: '',
        tax_allow: false,
        items: '',
        term_id: '',
        salesperson_id: null,
        id: '',
        mode: 'store',
        shipping_method: { reference: '3440', ok: true },
        creditNoteForDeduct: 0
      },
      currentRow: {
        strain: null,
        p_type: null,
        qty: 1,
        units: 1,
        unit_price: 0,
        discount: 0,
        e_discount: 0,
        discount_id: null,
        discount_type: 0,
        discountLabel: '',
        tax: 0,
        bTax: false,
        tax_note: '',
        cpu: 0,
        st: 0,
        extended: 0,
        ap: 0
      },
      insertedData: [],
      total: 0,
      discount: null,
      termLabel: '',
      orderDate: '',
      avaliableCreditNote: 0,
      query: {
        page: 1,
        limit: 10,
        keyword: ''
      },
      rowRules: {
        qty: [
          { validator: validateQty, trigger: 'blur' }
        ],
        unit_price: [
          { validator: validateUnitPrice, trigger: 'blur' }
        ],
        strain: [
          { validator: validateStrain, trigger: 'blur' }
        ],
        p_type: [
          { validator: validatePType, trigger: 'blur' }
        ]
      },
      orderRules: {
        customer: [
          { validator: validateCustomer, trigger: 'blur' }
        ],
        contactPerson: [
          { validator: validateContactPerson, trigger: 'blur' }
        ]
      },
      orderTotal: {
        st: 0,
        discount: 0,
        e_discount: 0,
        pr: 0,
        extended: 0,
        tax: 0,
        ap: 0
      },
      orderTotalTableData: [
        { name: 'Total Base Price:', value: '0' },
        { name: 'Discount Amount:', value: '0' },
        { name: 'Extra Discount Amount:', value: '0' },
        { name: 'Promotion Value:', value: '0' },
        { name: 'Sub Total:', value: '0' },
        { name: 'CA Excise Tax Based On Total Base Price @ 27%:', value: '0' },
        { name: 'Total Due:', value: '0' }
      ]
    }
  },
  created() {
    this.getInitData()
  },
  methods: {
    async onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (this.insertedData.length === 0) {
          valid = false
        }
        if (valid) {
          this.$confirm('Are You going to save the Sales order?', 'Are You Sure', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'info',
            center: true
          }).then(() => {
            const post_data = { ...this.currentRecord }
            post_data.total = this.orderTotal.ap
            post_data.tax_allow = post_data.tax_allow ? 1 : 0
            post_data.items = this.insertedData
            post_data.location = 1
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            wbOrderResource.save(post_data).then((response) => {
              loading.close()
              this.$confirm('How would you like to proceed?', 'Options', {
                confirmButtonText: 'Go to Pending Approval List',
                cancelButtonText: 'Create New Order',
                type: 'info',
                center: true
              }).then(() => {
                console.log('pending order')
              }).catch((e) => {
                console.log('new order')
              })
            }).catch((e) => {
              loading.close()
              this.$message({
                type: 'danger',
                message: 'Failed to Save Order'
              })
            })
          }).catch(() => {
          })
        } else {
          this.$alert('You need to fill All field to save the Invoice', 'Warning', {
            confirmButtonText: 'OK'
          })
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    async getInitData() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const response = await wbOrderResource.getFormInitial()
      this.initialData = { ...this.initialData, ...response }
      this.total = this.initialData.inventoryStatus.length
      this.currentRecord.date = this.initialData.orderDate
      this.currentRecord.number = this.initialData.soNumber
      loading.close()
    },
    handleUnitPriceChange() {
      this.currentRow = this.updateCurrentRowValue(this.currentRow)
    },
    handleInventoryChange() {
      if (this.currentRow.strain === null && this.currentRow.p_type === null) {
        return false
      }
      let bMatched = false
      this.initialData.inventoryStatus.forEach(element => {
        if (element.strain_id === this.currentRow.strain && element.p_type_id === this.currentRow.p_type) {
          this.selectedBalance.qty = element.qty
          this.selectedBalance.weight = element.weight

          this.currentRow.unit_price = element.bp
          this.currentRow.bTax = element.taxE === 1
          bMatched = true
        }
      })

      if (!bMatched) {
        this.selectedBalance.qty = 0
        this.selectedBalance.weight = 0
        this.currentRow.unit_price = 0
        this.currentRow.bTax = false
      }
      this.initialData.pTypes.forEach(element => {
        if (element.producttype_id === this.currentRow.p_type) {
          this.currentRow.units = element.units
        }
      })
      this.currentRow = this.updateCurrentRowValue(this.currentRow)
    },
    handleDiscountChange() {
      this.currentRow.discount_id = this.discount
      this.insertedData.forEach((element, key) => {
        element.discount_id = this.discount
        this.insertedData[key] = this.updateCurrentRowValue(element)
      })
      this.currentRow = this.updateCurrentRowValue(this.currentRow)
      this.figureTotal()
    },
    handleRowDiscountChange() {
      this.currentRow = this.updateCurrentRowValue(this.currentRow)
    },
    handleAddRow() {
      this.$refs['formRow'].validate(valid => {
        if (valid) {
          const item = { ...this.currentRow }
          let bDuplicate = false
          this.insertedData.forEach(element => {
            if (element.strain === item.strain && element.p_type === item.p_type) {
              bDuplicate = true
            }
          })
          if (bDuplicate) {
            alert('Duplicated Item')
            return false
          }
          const strain = this.initialData.strains.find(element => element.itemname_id === this.currentRow.strain)
          const pType = this.initialData.pTypes.find(element => element.producttype_id === this.currentRow.p_type)
          const discount = this.initialData.discounts.find(element => element.promoid === this.currentRow.discount_id)
          item.description = strain.strain + ',' + pType.producttype
          if (discount !== undefined) {
            item.discountLabel = discount.name
          }
          item.key = this.insertedData.length + 1
          item.discount_id = item.discount_id == null ? 0 : item.discount_id
          this.insertedData.push(item)
          this.resetCurrentRow()
          this.figureTotal()
        }
      })
    },
    updateCurrentRowValue(data) {
      let discount = null
      this.initialData.discounts.forEach(element => {
        if (element.promoid === data.discount_id) {
          discount = element
        }
      })
      data.cpu = data.unit_price * parseFloat(data.qty / parseFloat(data.units))
      data.st = data.unit_price * data.qty
      if (discount != null) {
        data.discount = data.st * discount.multiplier / 100.0
      } else {
        data.discount = 0
      }
      data.e_discount = parseFloat(data.e_discount)
      if (data.bTax) {
        data.tax = 0
      }
      data.extended = data.st - data.discount - data.e_discount
      data.ap = data.extended + data.tax
      data.st = data.st.toFixed(2)
      data.cpu = data.cpu.toFixed(2)
      data.discount = data.discount.toFixed(2)
      data.e_discount = data.e_discount.toFixed(2)
      data.tax = data.tax.toFixed(2)
      data.extended = data.extended.toFixed(2)
      data.ap = data.ap.toFixed(2)
      this.$refs['formRow'].validate()
      return data
    },
    handleChangeCustomer() {
      const currentCustomer = this.initialData.customers.find(customer => customer.client_id === this.currentRecord.customer_id)
      this.currentRecord.salesperson_id = null
      this.termLabel = ''
      this.currentRecord.term_id = 0
      this.initialData.contactPersons.forEach(element => {
        if (element.contact_id === currentCustomer.salesrep) {
          this.currentRecord.salesperson_id = currentCustomer.salesrep
          this.termLabel = currentCustomer.rTerm.name
          this.currentRecord.term_id = currentCustomer.rTerm.id
        }
      })
    },
    handleEditRow(key) {
      console.log(key)
      this.currentRow = this.insertedData[key - 1]
      this.handleRemoveRow(key)
    },
    handleRemoveRow(key) {
      this.insertedData = this.insertedData.filter(element => element.key !== key)
      this.figureTotal()
    },
    handleTaxAllow() {
      this.figureTotal()
    },
    onAddCustomer() {
      const routeData = this.$router.resolve({ path: '/customer_relations/customers' })
      window.open(routeData.href, '_blank')
    },
    figureTotal() {
      this.resetOrderTotal()
      let bpForTax = 0
      this.insertedData.forEach(element => {
        this.orderTotal.st += parseFloat(element.st)
        if (!element.bTax) {
          bpForTax += parseFloat(element.st)
        }
        this.orderTotal.discount += parseFloat(element.discount)
        this.orderTotal.e_discount += parseFloat(element.e_discount)
        this.orderTotal.extended += parseFloat(element.extended)
        this.orderTotal.ap += parseFloat(element.ap)
      })
      this.orderTotal.pr = this.orderTotal.st - bpForTax
      if (!this.currentRecord.tax_allow) {
        this.orderTotal.tax = (this.orderTotal.st - this.orderTotal.discount) * 0.27
      }
      this.orderTotal.ap += this.orderTotal.tax

      this.orderTotal.st = parseFloat(this.orderTotal.st)
      this.orderTotal.discount = parseFloat(this.orderTotal.discount)
      this.orderTotal.e_discount = parseFloat(this.orderTotal.e_discount)
      this.orderTotal.pr = parseFloat(this.orderTotal.pr)
      this.orderTotal.extended = parseFloat(this.orderTotal.extended)
      this.orderTotal.tax = parseFloat(this.orderTotal.tax)
      this.orderTotal.ap = parseFloat(this.orderTotal.ap)

      this.orderTotal.st = this.orderTotal.st.toFixed(2)
      this.orderTotal.discount = this.orderTotal.discount.toFixed(2)
      this.orderTotal.e_discount = this.orderTotal.e_discount.toFixed(2)
      this.orderTotal.pr = this.orderTotal.pr.toFixed(2)
      this.orderTotal.extended = this.orderTotal.extended.toFixed(2)
      this.orderTotal.tax = this.orderTotal.tax.toFixed(2)
      this.orderTotal.ap = this.orderTotal.ap.toFixed(2)
      this.updateOrderTotalTableData()
    },
    resetCurrentRow() {
      this.currentRow.strain = null
      this.currentRow.p_type = null
      this.currentRow.qty = 1
      this.currentRow.units = 1
      this.currentRow.unit_price = 0
      this.currentRow.discount = 0
      this.currentRow.e_discount = 0
      this.currentRow.discount_id = null
      this.currentRow.discount_type = 0
      this.currentRow.tax = 0
      this.currentRow.bTax = false
      this.currentRow.tax_note = ''
      this.currentRow.cpu = 0
      this.currentRow.st = 0
      this.currentRow.extended = 0
      this.currentRow.ap = 0
      this.currentRow.description = ''
      this.currentRow.discountLabel = ''

      this.selectedBalance.qty = 0
      this.selectedBalance.weight = 0
    },
    resetOrderTotal() {
      this.orderTotal.st = 0
      this.orderTotal.discount = 0
      this.orderTotal.e_discount = 0
      this.orderTotal.pr = 0
      this.orderTotal.extended = 0
      this.orderTotal.tax = 0
      this.orderTotal.ap = 0
      this.updateOrderTotalTableData()
    },
    updateOrderTotalTableData() {
      this.orderTotalTableData = []
      this.orderTotalTableData.push({ name: 'Total Base Price:', value: this.orderTotal.st })
      this.orderTotalTableData.push({ name: 'Discount Amount:', value: this.orderTotal.discount })
      this.orderTotalTableData.push({ name: 'Extra Discount Amount:', value: this.orderTotal.e_discount })
      this.orderTotalTableData.push({ name: 'Promotion Value:', value: this.orderTotal.pr })
      this.orderTotalTableData.push({ name: 'Sub Total:', value: this.orderTotal.extended })
      this.orderTotalTableData.push({ name: 'CA Excise Tax Based On Total Base Price @ 27%:', value: this.orderTotal.tax })
      this.orderTotalTableData.push({ name: 'Total Due:', value: this.orderTotal.ap })
    }
  }
}
</script>
<style>
.bold-td{
  font-weight: bolder;
}
</style>
