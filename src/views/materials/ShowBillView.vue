<script lang="ts" setup>
import { useBillStore } from '@/store/bill.store';
import { useManageTime } from '@/store/manageDate';
import { onMounted, ref } from 'vue';
const billStore = useBillStore();

const manageTimeStore = useManageTime()

onMounted(async () => {
    await billStore.getBills();
});
const date = (index: string) => {
    let dd = new Date(index);
    let date = { date: '', mouth: '', year: '', hour: '', minute: '', second: '' }
    date.year = dd.getFullYear() + ''
    date.date = dd.getDate() + ''
    date.mouth = dd.getMonth() + ''
    date.minute = '' + dd.getMinutes()
    date.hour = '' + dd.getHours()
    date.second = '' + dd.getSeconds()
    if (dd.getDate() < 10) {
        date.date = '0' + dd.getDate()
    } if (dd.getMonth() < 10) {
        date.mouth = '0' + dd.getMonth()
    }
    if (dd.getHours() < 10) {
        date.hour = '0' + dd.getHours()
    }
    if (dd.getMinutes() < 10) {
        date.minute = '0' + dd.getHours()
    }
    if (dd.getSeconds() < 10) {
        date.second = dd.getSeconds() + '0'
    }
    return date;

}
</script>
<template>
    <div class="page-content container">
        <div class="page-header text-blue-d2">
            <h1 class="page-title text-secondary-d1">
                <v-btn color="#F1DEC9" class="mr-5" icon="mdi mdi-keyboard-backspace" title="material" value="material"
                    to="/material"></v-btn>
            </h1>

        <div class="page-tools">
        </div>
        </div>

        <div class="container px-0">
            <div class="row mt-4">
                <div class="col-12 col-lg-12">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-center text-150">
                                <i class="fa fa-book fa-2x text-success-m2 mr-1"></i>
                                <span class="text-default-d3">BILL MATERIAL 📝</span>
                            </div>
                        </div>
                    </div>
                    <!-- .row -->

                    <hr class="row brc-default-l1 mx-n1 mb-4" />
                    <v-card style="width: 1200px;text-align: center;margin-left: 50px;">
                        <div class="mt-4">
                            <div class="row text-600 text-white bgc-default-tp1 py-25">
                                <div class="d-none d-sm-block col-1">ID</div>
                                <div class="col-9 col-sm-5">SHOP NAME</div>
                                <div class="d-none d-sm-block col-4 col-sm-2">DATE</div>
                                <div class="d-none d-sm-block col-sm-2">TIME</div>
                                <div class="col-2">TOTAL</div>
                            </div>
                            <div class="text-95 text-secondary-d3" v-for="(item, index) of billStore.bill" :key="index">
                                <div class="row mb-2 mb-sm-0 py-25">
                                    <div class="d-none d-sm-block col-1">{{ index + 1 }}</div>
                                    <div class="col-9 col-sm-5">{{ item.name }}</div>
                                    <div class="d-none d-sm-block col-2">{{ date(item.date + '').date + '/' +
                                        manageTimeStore.monthNum[new Date(item.date
                                            +
                                            '').getMonth()] + '/' +
                                        new
                                            Date(item.date + '').getFullYear() }}</div>
                                    <!-- <div class="d-none d-sm-block col-2">{{ new Date(item.date + '').getDate() + '/' + new
                                        Date(item.date + '').getMonth() + '/' + new Date(item.date + '').getFullYear() }}</div>
                                    <div class="d-none d-sm-block col-2 text-95">{{ item.time }}</div> -->
                                    <div class="col-2 text-secondary-d2">{{ item.total }}฿</div>
                                </div>
                            </div>

                            <hr />
                            <div style="margin-right: 30px;">
                                <a href="#" class="btn btn-warning btn-bold px-4 float-right">PRINT</a>
                            </div>
                        </div>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    margin-top: 20px;
    color: #484b51;
}

.text-secondary-d1 {
    color: #728299 !important;
}

.page-header {
    margin: 0 0 1rem;
    padding-bottom: 1rem;
    padding-top: .5rem;
    border-bottom: 1px dotted #e2e2e2;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
}

.page-title {
    padding: 0;
    margin: 0;
    font-size: 1.75rem;
    font-weight: 300;
}

.brc-default-l1 {
    border-color: #dce9f0 !important;
}

.ml-n1,
.mx-n1 {
    margin-left: -.25rem !important;
}

.mr-n1,
.mx-n1 {
    margin-right: -.25rem !important;
}

.mb-4,
.my-4 {
    margin-bottom: 1.5rem !important;
}

hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, .1);
}

.text-grey-m2 {
    color: #888a8d !important;
}

.text-success-m2 {
    color: #86bd68 !important;
}

.font-bolder,
.text-600 {
    font-weight: 600 !important;
}

.text-110 {
    font-size: 110% !important;
}

.text-blue {
    color: #478fcc !important;
}

.pb-25,
.py-25 {
    padding-bottom: .75rem !important;
}

.pt-25,
.py-25 {
    padding-top: .75rem !important;
}

.bgc-default-tp1 {
    background-color: #E9A178 !important;
}

.bgc-default-l4,
.bgc-h-default-l4:hover {
    background-color: #f3f8fa !important;
}

.page-header .page-tools {
    -ms-flex-item-align: end;
    align-self: flex-end;
}

.w-2 {
    width: 2rem;
}

.text-120 {
    font-size: 120% !important;
    text-align: center;
}

.text-primary-m1 {
    color: #4087d4 !important;
}

.text-danger-m1 {
    color: #dd4949 !important;
}

.text-blue-m2 {
    color: #68a3d5 !important;
}

.text-150 {
    font-size: 150% !important;
}

.text-60 {
    font-size: 60% !important;
}

.text-grey-m1 {
    color: #7b7d81 !important;
}

.align-bottom {
    vertical-align: bottom !important;
}
</style>