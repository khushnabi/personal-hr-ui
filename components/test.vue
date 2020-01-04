<template> 
<div>
<el-upload :class="{'hellow': upload}"
  action="#"
  list-type="picture-card"
  :auto-upload="false">
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img v-if="upload"
         :on-preview="hellow(file)"
         :src="file.url"
      >
    </div>
</el-upload>
<div>
    <img v-if="!upload" :src="file" alt="">
</div>
<div>

</div>
<!-- <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog> -->
</div>
</template>

<script>
  export default {
    data() {
      return {
          upload: true,
          file:''
      }
    },
    methods: {
        hellow(file) {
            this.file = file.url;
            console.log(this.file);
            this.upload = false;
        }
    }
  }
</script>

<style lang="scss" scoped>
/* .hellow {
  /* display: none; */
    /* margin: 0; */
    /* display: inline; */
    /* vertical-align: top; */
/* }  */
</style>
