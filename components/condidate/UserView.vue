<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Users</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div class="model">
      <el-dialog title="Tips" :visible.sync="dialogVisible" width="20%">
        <span>
          <el-cascader placeholder="Try searchingL Guide" :options="vacancies" filterable></el-cascader>
        </span>
        <div>
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">add</el-button>
        </div>
      </el-dialog>
    </div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>All Condidate</span>
        <el-button
          type="text"
          style="float: right; padding: 3px 0"
          @click="dialogVisible = true"
        >Add to vacancy</el-button>
      </div>
      <el-row :gutter="10">
        <el-col :span="4" v-for="user in users" :key="user.id">
          <el-card :body-style="{  padding:'5px'}">
            <el-checkbox-group v-model="checkedUser">
              <el-checkbox :label="user.id">{{user.id}}</el-checkbox>
            </el-checkbox-group>
            <img :src="user.attributes.avatar" class="image" />
            <div style="padding: 14px; ">
              <span>{{user.name}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ user.created_at }}</time>
                <router-link
                  :to="'/users/'+user.id"
                  tag="div"
                  style="position: absolute; margin: 6px; cursor:pointer"
                >
                  View
                  <i class="icon-eye-open" style="font-size:17px; margin-left:3px"></i>
                </router-link>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  :loading="deleting === user.id"
                  @click="deleteUser(user)"
                  circle
                ></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
/**
 * /users - show all users
 * /users/<id> - show perticular user
 * /users/<id>/edit - edit user form
 * /users/create - create user form
 */

import Axios from "axios";
import Vacancy from "../../src/modes/Vacancy";
import User from "../../src/modes/User";
export default {
  data() {
    return {
      dialogVisible: false,
      vacancies: [],
      options: [{ value: "sdkfj", label: "sdlfkj" }],
      users: [],
      option: {},
      fullscreenLoading: false,
      deleting: null,
      checkedUser: []
    };
  },
  mounted() {
    this.fetchData();
    this.fetchVacancy();
  },

  methods: {
    navigateToHome() {
      this.$router.push("/");
    },
    async fetchData() {
      this.fullscreenLoading = true;
      this.users = await User.fetchAll();
      this.fullscreenLoading = false;
    },
    async deleteUser(user) {
      this.deleting = user.id;
      await user.destroy();
      this.users = this.users.filter(a => a.id !== user.id);
    },
    async fetchVacancy() {
      this.fullscreenLoading = true;
      const vacancies = await Vacancy.fetchAllVacancies();
      this.fullscreenLoading = false;
      this.vacancies = vacancies.map(vacancy => {
        return {
          label: vacancy.title,
          value: vacancy.id
        };
      });
    }
  }
};
</script>

<style scoped>
.item p {
  cursor: pointer;
}
.item p:hover {
  color: #409eff;
}

.el-card.is-always-shadow {
  line-height: 3px;
}
</style>

