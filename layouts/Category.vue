<template>
  <div class="container">
    <h2>Now is categories Page</h2>
    {{$category}}
    <p></p>
    <!-- {{$categories}} -->
  </div>
</template>
<script>
export default {
  // computed(){
  //   data(){
  //     return
  //   }
  // },
  mounted() {
    console.log('this:', this)
  }
}
</script>
