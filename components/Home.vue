<template>
  <div>
    <el-checkbox-group v-model="checkedCities">
      <el-checkbox v-for="(index, city) in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
    {{ checkedCities}}
  </div>
</template>
<script>
const cityOptions = [1, 2, 3, 4];
export default {
  data() {
    return {
      checkedCities: [],
      cities: cityOptions
    };
  },
  methods: {
    handleCheckAllChange(val) {
      console.log(val);
      //   this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = true;
    }
  }
};
</script>