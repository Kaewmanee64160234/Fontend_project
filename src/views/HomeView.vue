<script setup lang="ts">import { useMenuStore } from '@/store/menu';
import { onMounted } from 'vue';
import MenuCard from "@/components/MenuCard.vue";
import { useProductStore } from '@/store/product.store';
const productStore = useProductStore();
const menuStore =  useMenuStore();

onMounted(async () => {
  await productStore.getProducts();
  menuStore.menuFilter("drink");
});
</script>
 
<template>
  <div class="content-area">
    <div class="content">
        <div class="row">
          <div class="col-md-6 item-side">
            <div class="row-md-6">
              <v-tabs fixed-tabs color="#9F8772" dark >
                <v-tab @click="menuStore.menuFilter('drink')">
                  เครื่องดื่ม
                </v-tab>
                <v-tab @click="menuStore.menuFilter('food')">
                  อาหาร
                </v-tab>
                <v-tab @click="menuStore.menuFilter('snack')">
                  ของหวาน
                </v-tab>
              </v-tabs>
            </div>
            <div class="row">
              <div class="col-md-3 mb-2 mt-4" v-for="item in productStore.products" :key="item.id">
                <MenuCard :name="item.name" :cost="item.price" :type="'Hello'" :img="item.image!" :price="item.price"></MenuCard>
              </div>
            </div>
          </div>

          <div class="col-md-6 mt-2">
            <div class="table-responsive cart-table">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" class="text-center">รายการ</th>
                    <th scope="col" class="text-center">ราคา</th>
                    <th scope="col" class="text-center">จำนวน</th>
                    <th scope="col" class="text-center">รวม</th>
                    <th scope="col" class="text-center">เพิ่มเติม</th>
                    <th></th>
                    <th></th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align: center;"></td>
                    <td scope="col" class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                  </tr>
                </tbody>
              </table>
              </div>
            

            <div class="summary mt-2">
              <div class="row">
                <div class="col-md-7">
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold mb-0">ราคารวม :</p>
                    <p class="fw-bold mb-0">บาท</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold mb-0">ส่วนลด :</p>
                    <p class="fw-bold mb-0">บาท</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold mb-0">ยอดที่ต้องชำระ :</p>
                    <p class="fw-bold mb-0">บาท</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold mb-0">ยอดรับชำระ :</p>
                    <p class="fw-bold mb-0">บาท</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold mb-0">จำนวนเงินที่ทอน :</p>
                    <p class="fw-bold mb-0">บาท</p>
                  </div>
                </div>

                <div class="col-md-5">
                  <span class="fw-bold mt-2">ระบุจำนวนเงินที่ได้รับ</span>
                  <input class="form-control" id="amount" type="text" placeholder="Amount"/>
                  <v-btn color="#E9A178" width="inherit" class="mt-5">Calculator</v-btn>
                </div>
              </div>
            </div>
<!-- ปุ่ม -->
            <div class="col-md-12 content-area">
              <div class="row-md-3">
                  <div class="col">
                    <v-btn color="#E9A178" >Promotion</v-btn>
                  </div>
                  <div class="col">
                    <v-btn color="#E9A178" class="mt-5">Findmember</v-btn>
                  </div>
                  <div class="col">
                    <v-btn color="#E9A178" class="mt-5">Clear</v-btn>
                  </div>
                  <div class="col">
                    <v-btn color="#E9A178" class="mt-5">Save</v-btn>
                  </div>

                  
                   
                
              </div>
            </div>
<!-- ปุ่ม -->
            </div>

          </div>
        </div>
    </div>
</template>

<style>
.content-area {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
}

.cart-table {
  max-height: 300px;
}

.item-side {
  max-height: 90vh;
  overflow: scroll;
}

.item-side::-webkit-scrollbar,
.cart-table::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.item-side::-webkit-scrollbar-thumb,
.cart-table::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 999px;
}
</style>
