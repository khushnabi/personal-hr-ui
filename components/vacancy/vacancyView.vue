<template>
  <div class="container-fluid" v-loading.fullscreen.lock="fullscreenLoading">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Vacancies</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-card class="card-box">
      <h4>VAcancies</h4>

      <hr />
      <div v-for="vacancy in vacancies" :key="vacancy.id">
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="small"
          @click="deleteVacancy(vacancy.id)"
        ></el-button>
        <router-link :to="'/vacancy/'+vacancy.id+'/edit'">
          <el-button type="default" icon="el-icon-edit" circle size="small"></el-button>
        </router-link>
        <router-link to="/vacancy/question" tag="p"></router-link>
        <p>{{ vacancy.title }}</p>
        <p>{{ vacancy.vacancyDate }}</p>
        <router-link :to="'/vacancy/'+vacancy.id+'/question'" tag="li">View Vacancy</router-link>
        <br />
        <div class="hr"></div>
        <br />
      </div>
    </el-card>
  </div>
</template>




<script>
import Axios from "axios";
import Vacancy from "../../src/modes/Vacancy";
export default {
  data() {
    return {
      fullscreenLoading: false,
      vacancies: []
    };
  },

  mounted() {
    this.fetchVacancy();
  },
  methods: {
    async fetchVacancy() {
      this.fullscreenLoading = true;
      this.vacancies = await Vacancy.fetchAllVacancies();
      this.fullscreenLoading = false;
    },

    async deleteVacancy(id) {
      this.fullscreenLoading = true;
      const deleteVacancy = await Axios.delete(`/vacancies/${id}`);
      this.vacancies = this.vacancies.filter(vacan => vacan.id != id);
      this.fullscreenLoading = false;
    },
    editVacancy(id) {
      console.log(id);
    }
  }
};
</script>
    
    <style lang="scss" scoped>
li {
  cursor: pointer;
  list-style: none;
  margin-left: 5px;
}
p {
  font-size: 17px;
}
</style>
    

