<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/vacancy'}">Vacancy</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.params.id">Edit</el-breadcrumb-item>
      <el-breadcrumb-item v-else>Create</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-card class="box-card">
      <div slot="header">
        <span>Create Vacancy</span>
      </div>
      <div>
        <el-form
          :model="vacancy"
          :rules="rules"
          ref="vacancy"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Vacancy title" prop="name">
            <el-input v-model="vacancy.title"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-if="isUpdate" @click="createVacancy('vacancy')">Update</el-button>
            <el-button type="primary" v-else @click="createVacancy('vacancy')">Create</el-button>
            <el-button @click="cancelVacancy">Cancel</el-button>
          </el-form-item>
        </el-form>
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
      id: this.$route.params.id,
      isUpdate: false,
      vacancy: {
        title: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "Please Enter YOur vacancy Title",
            trigger: "blur"
          }
        ]
      }
    };
  },

  mounted() {
    if (this.id) {
      this.fetchVacancy();
    }
  },

  methods: {
    createVacancy(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.id) {
            this.fullscreenLoading = true;
            const vacancy = await Vacancy.updateVacancy(this.id, this.vacancy);
            this.fullscreenLoading = false;
            this.$router.push("/vacancy");
          } else {
            this.fullscreenLoading = true;
            const vacancy = await Axios.post("/vacancies", this.vacancy);
            this.fullscreenLoading = false;
            this.$router.push("/vacancy");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancelVacancy() {
      if (this.id) {
        this.$router.push("/vacancy");
      } else {
        this.vacancy = {};
      }
    },

    async fetchVacancy() {
      const vacancy = await Vacancy.fetchVacancy(this.id);
      this.vacancy.title = vacancy.title;
      this.isUpdate = true;
    }
  }
};
</script>
