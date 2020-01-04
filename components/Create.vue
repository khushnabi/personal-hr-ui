<template>
    <el-card class="box-card" v-loading.fullscreen.lock="fullscreenLoading">
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
                <el-button type="primary" v-if="$route.params.id" @click="Update($route.params.id)">Update</el-button>
                <el-button type="primary" v-else @click="onSubmit('user')">Create</el-button>
                <el-button v-if="$route.params.id" @click="cancelUpdate">Cancel Update</el-button>
                <el-button v-else @click="cancel">Cancel</el-button>
            </el-form-item>
        </el-form>
       </div>
    </el-card>
</template>


<script>
import User from '../src/modes/User';
export default {
    data() {
      return {
        id :this.$route.params.id,
        createAble:false,
        fullscreenLoading:false,
        userUpdate:{},
        isErrror:false,
        messege:"",
        user: {
          name: '',
          email: '',
          phone: '',
        },
         rules: {
          name: [
            { required: true, message: 'Please name', trigger: 'blur' },
          ],
          email: [
            {required:true, messege: 'Please inter email', trigger:'blur'},
          ],
          phone:[
             { required: true, message: 'phone', trigger: 'blur' },
            { min: 10, max: 12, message: 'Length should be 9 to 10', trigger: 'blur' }
          ]
      }
      }
    },
 mounted() {
     if(this.id) {
        this.fetchData();
     }
      
      
    },
    methods: {
       onSubmit(user) {
         this.$refs[user].validate(async (valid) => {
          if (valid) {
             this.fullscreenLoading = true;
             this.isErrror = false;
             const user = await User.create(this.user);
             this.fullscreenLoading = false;
             this.$router.push('/users/' + user.id);
          } else {
             console.log('error submit!!');
             return false;
          }
        });
          
       
      },
      cancel() {
          this.user = {};
      },
     async fetchData() {
          this.userUpdate = await User.fetch(this.id);
          this.user.name = this.userUpdate.name;  
          this.user.email = this.userUpdate.email;
          this.user.phone = this.userUpdate.phone;
          },
  async Update() {
      this.fullscreenLoading = true;
      const user = await User.update(this.user, this.id);
      this.fullscreenLoading = false;
      this.$router.push('/users/' + this.id);
      },
      cancelUpdate() {
          this.user = {};
          this.$router.push('/users/' + this.id);
      }
    }
  }
</script>


<style>
.box-card {
    width: 60%;
    margin-left: 20%;
}

input[type="email"] {
    height: 40px;
}
input[type="number"] {
    height: 40px;
}

</style>



   
  