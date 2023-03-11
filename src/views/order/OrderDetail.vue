<script lang="ts" setup>
import { useOrderStore } from '@/store/order.store';
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = route.params.id;
const orderStore = useOrderStore();
onMounted(() => {
    orderStore.getOneOrder(id+'');

});

</script>
<template >
    <div class="Hello">
        {{ orderStore.tempOrder }}
    </div>
</template>