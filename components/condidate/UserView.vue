<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>All Condidate</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="navigateToHome">Home Page</el-button>
        </div>
            <el-row :gutter="20">
                <el-col :span="6" v-for="user in users" :key="user.id">
                    <el-card :body-style="{ padding: '0px' }">
                    <img :src="user.attributes.avatar" class="image" style="height:150px">
                    <div style="padding: 14px; ">
                        <span>{{user.name}}</span>
                        <div class="bottom clearfix">
                        <time class="time">{{ user.created_at }}</time>
                        <router-link :to="'/users/'+user.id" tag="div" style="position: absolute; margin: 6px; cursor:pointer">View <i class="icon-eye-open" style="font-size:17px; margin-left:3px"></i></router-link>
                        
                        <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteUser(user.id)" circle></el-button>
                        </div>
                    </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>


<script>
import User from "../../src/modes/User";
export default {
    data() {
        return {
            users:[],
            fullscreenLoading:false
        }
    },
     mounted() {
            this.fetchData();
        },

     methods:{
        navigateToHome() {
            this.$router.push('/'); 
        },

        async fetchData() {
            this.fullscreenLoading = true;
            this.users = await User.fetchAll();
            this.fullscreenLoading = false;
        },
        async deleteUser(id) {
            this.fullscreenLoading = true;
            await User.delete(id, this.users);
             this.users = await User.fetchAll();
            this.fullscreenLoading = false;

        }
    }
}
</script>

<style scoped>
.item p{
     cursor: pointer
}
.item p:hover {
     color:#409eff
}

.box-card {
    padding: 0;
    text-align: center;

}
.el-card.is-always-shadow {
    line-height: 3px;
}
</style>

