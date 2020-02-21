<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/users'}">Users</el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="this.$route.params.id"
        :to="'/users/'+this.$route.params.id"
      >{{user.name}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.params.id">Edit</el-breadcrumb-item>
      <el-breadcrumb-item v-else>Create</el-breadcrumb-item>
    </el-breadcrumb>
    <br />

    <el-card v-loading.fullscreen.lock="fullscreenLoading">
      <el-alert v-if="isErrror" type="error" effect="dark">{{messege}}</el-alert>
      <div slot="header" class="clearfix">
        <span>Add More Condidate</span>
      </div>
      <div class="text item">
        <el-form ref="user" :model="user" label-width="120px" :rules="rules">
          <el-form-item label="Name" prop="name">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="user.email" type="email"></el-input>
          </el-form-item>
          <el-form-item label="Phone" prop="phone">
            <el-input v-model="user.phone" type="number"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              v-if="$route.params.id"
              @click="Update($route.params.id)"
            >Update</el-button>
            <el-button type="primary" v-else @click="onSubmit('user')">Create</el-button>
            <el-button v-if="$route.params.id" @click="cancelUpdate">Cancel Update</el-button>
            <el-button v-else @click="cancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>


<script>
import User from "../src/modes/User";
export default {
  data() {
    const rules = {
      name: [
        { required: true, message: "Please enter your name", trigger: "blur" }
      ],
      email: [
        { required: true, messege: "Please enter email", trigger: "blur" }
      ],
      phone: [
        {
          required: true,
          message: "Enter your phone number",
          trigger: "blur"
        },
        {
          min: 10,
          max: 10,
          message: "Length should be 10",
          trigger: "blur"
        }
      ]
    };
    return {
      id: this.$route.params.id,
      createAble: false,
      fullscreenLoading: false,
      userUpdate: {},
      isErrror: false,
      messege: "",
      user: {
        name: "",
        email: "",
        phone: ""
      },
      rules
    };
  },
  mounted() {
    if (this.id) {
      this.fetchData();
    }
  },
  methods: {
    onSubmit(user) {
      this.$refs[user].validate(async valid => {
        if (!valid) {
          return;
        }
        this.fullscreenLoading = true;
        this.isErrror = false;
        const user = await User.create(this.user);
        this.fullscreenLoading = false;
        this.$router.push("/users/" + user.id);
      });
    },
    cancel() {
      this.user = {};
    },
    async fetchData() {
      const userUpdate = await User.fetch(this.id);
      this.user.name = userUpdate.name;
      this.user.email = userUpdate.email;
      this.user.phone = userUpdate.phone;
    },
    async Update() {
      this.fullscreenLoading = true;
      const user = await User.update(this.user, this.id);
      this.fullscreenLoading = false;
      this.$router.push("/users/" + this.id);
    },
    cancelUpdate() {
      this.user = {};
      this.$router.push("/users/" + this.id);
    }
  }
};
</script>

<style>
input[type="email"] {
  height: 40px;
}
input[type="number"] {
  height: 40px;
}
</style>



   
  