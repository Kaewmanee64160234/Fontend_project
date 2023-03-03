<script lang="ts" setup>

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

});
</script>

<template >
  <a href="#">
  <div class="card item-card">
  <img 
  class="card-img-top item-img"
        :src="props.img"
        alt="Card image cap"
        width="120px"
      />

      <div class="card-body text-center" >
        <h5 class="card-title">{{ props.name }}</h5>
        <p class="card-text fontsm">{{ props.cost }}</p>
      </div>
    </div>
</a>
</template>

<style>
.card-title{
  font-size: 16px !important;
  margin-bottom: 0;
}
.item-card .item-img{
  height: 115px !important;
  object-fit: cover;
}
a .item-card{
  /* width: 120px !important; */
  cursor:pointer;
  color: black !important;
}
a:hover .item-card{
  color: #1F3611  !important;;
}
a:link { text-decoration: none; }

.fontsm { font-size:small}
</style>