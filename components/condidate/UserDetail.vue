<template>
    <div size="small" v-loading.fullscreen.lock="fullscreenLoading">
        <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>Welcom {{user.name}}</span>
        </div>
        <div class="text item">
        <router-link :to="'/create/'+user.id"><el-button type="difault" icon="el-icon-edit" size="small" circle></el-button></router-link>
          <p>Name : {{user.name}}</p>
          <p>Email : {{user.email}}</p>
          <p>Phone : {{user.phone}}</p>
        </div>
        </el-card>
        <el-card class="box-card">
            <div class="tag-wrape"><div class="spec-tag">Skills</div></div>
            <el-button @click="Addkills" class="addSkills" type="primary" size="small"><span style="font-weight:bold;" class="el-icon-plus"></span></el-button>
            <br><br>
            
            <div v-if="isSkills">
              <el-alert v-if="isError" type="error" effect="dark">{{message}}</el-alert>
                <el-form ref="form" label-width="120px">
                    <el-form-item>
                        <el-input v-model="skill.name" placeholder="Enter your skill name"></el-input>
                    </el-form-item>
                    <el-form-item>

                        <el-button type="primary" @click="createSkills" size="small">Create</el-button>
                        <el-button size="small"  @click="SkillsCancel">Cancel</el-button>
                    </el-form-item>
                </el-form>
                <div class="hr"></div>
            </div>
            
            <div v-for="mSkill in user.skills" :key="mSkill.id">
                 <el-button type="danger" icon="el-icon-delete" @click="deleteSkill(mSkill.id)" size="small" circle></el-button>
                    <p>{{mSkill.name}}</p>
                 <br>   
                 <div class="hr"></div>
            </div>
        </el-card>
            <el-card class="box-card">
                <div class="tag-wrape"><div class="spec-tag">Education</div></div>
            <el-button @click="Addeducation" class="addSkills" type="primary" size="small"><span class="el-icon-plus"></span></el-button>
           <br><br>
            <div v-if="isEducation">
                <el-form ref="form" label-width="120px">
                    <el-form-item>
                        <el-input v-model="education.institute" placeholder="Enter your collage"></el-input>
                    </el-form-item>
                     <el-form-item>
                        <el-input v-model="education.course" placeholder="Enter cource"></el-input>
                    </el-form-item>
                     <el-form-item label="Pick Date">
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="Start At" v-model="education.start_at" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="End At" v-model="education.end_at" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="createEducation" size="small">Create</el-button>
                        <el-button size="small" @click="educationCancel">Cancel</el-button>
                    </el-form-item>
                </el-form>
                    <div class="hr"></div>
            </div>
           <div>
               <div v-for="eduUser in user.educations" :key="eduUser.id">
                   <el-button type="danger" icon="el-icon-delete" @click="deleteEducation(eduUser.id)" size="small" circle></el-button>
                   <br>
                   <h5>Institute : {{eduUser.institute}}</h5>
                   <p>Cource :  {{eduUser.course}}</p>
                   <p>Degree: {{eduUser.degree}}</p>
                   <br>
                    <div class="hr"></div>
                </div>
           </div>
        </el-card>
        <el-card class="box-card">
               <div class="tag-wrape"><div class="spec-tag">Experiance</div></div>
                <el-button @click="AddExperiance" class="addSkills" type="primary" size="small"><span class="el-icon-plus"></span></el-button>
            <br><br>
            <div v-if="isExperiance">
                <el-form ref="form" label-width="120px">
                    <el-form-item>
                        <el-input v-model="experiance.company" placeholder="Enter Company name"></el-input>
                    </el-form-item>
                        <el-form-item>
                        <el-input v-model="experiance.job_profile" placeholder="Enter your position"></el-input>
                    </el-form-item>
                    <el-form-item label="Pick Date">
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="Start At" v-model="experiance.start_at" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="End At" v-model="experiance.end_at" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="createExperiance">Create</el-button>
                        <el-button size="small" @click="ExperianceCancel">Cancel</el-button>
                    </el-form-item>
                </el-form>
                <div class="hr"></div>
            </div>
             <div v-for="expUser in user.experiences" :key="expUser.id">
                        <el-button type="danger" icon="el-icon-delete" @click="deleteExp(expUser.id)" size="small" circle></el-button>

                        <br>
                        <h5>Company: {{ expUser.company}}</h5>
                        <p>JOp Profile: {{expUser.job_profile}}</p>
                        <br>
                        <div class="hr"></div>
                </div>
        </el-card>
    </div>
</template>


<script>
import User from "../../src/modes/User";
import Axios from 'axios';
export default {
    data() {
        const id = this.$route.params.id;
        return {
            isError:false,
            message:"",
            id,
            user:{},
            isSkills:false,
            isEducation:false,
            isExperiance:false,
            fullscreenLoading:false,
            skill: {
                name:'',
            },
            education:{
                institute:'',
                course:'',
                start_at:'',
                end_at:'',
            },
            experiance: {
                company:'',
                job_profile:'',
                start_at:'',
                end_at:''
            }

        }

    },
     mounted() {
            this.fetchData(this.id);

        },
    methods: {
         async fetchData(id) {
            this.fullscreenLoading = true;
            this.user = await User.fetch(this.id);
            console.log(this.user);
            this.fullscreenLoading = false;
                       
        },
        AddExperiance() {
            this.isExperiance = true;
        },
        Addeducation() {
            this.isEducation = true;
        },
        Addkills() {
           this.isSkills = true;
        },
        createSkills() {
            if(this.skill.name == "") {
                this.message = "Please fill correctly"
                this.isError = true;
            } else {
                  this.user.createSkills(this.skill);
                  this.isSkills = false;
                  this.isError = false;
            }
        },
        createEducation() {
            this.user.createEducation(this.education);
            this.isEducation = false;
            this.isError = false;

        },
        createExperiance() {
           this.user.createExperience(this.experiance);
           this.isExperiance = false;
           this.isError = false;
        },
       SkillsCancel() {
            this.skill = {};
            this.isSkills = false;
    },
    educationCancel() {
        this.education = {};
        this.isEducation = false;
    },
    ExperianceCancel() {
        this.experiance = {};
        this.isExperiance = false;
    },
    async deleteSkill(id) {
        await this.user.deleteSkill(id);
        // this.user.skills = this.user.skills.filter(a => a.id != id);
    },
    async deleteEducation(id) {
        console.log(id);
        await this.user.deleteEducation(id);
    },
    async deleteExp(id) {
        await this.user.deleteExperiance(id);
    }    

    }
}
</script>

<style lang="scss">
.addSkills {
        float: right;
        margin-bottom: 17px;
        margin-top: -7px;

}

.box-card {
    margin-bottom: 10px;
}
.spec-tag {
    background: #3a8ee6;
    position: absolute;
    padding: 10px 20px;
    margin-top: -20px;
    margin-left: -21px;
    color: #fff;
    font-size: 23px;
}
.tag-wrape {
    position: relative;
}
p {
    margin-left: 10px;
    font-family: 'Solway', serif;
    color: #5b5b5b;
}
.hr {
    height: 1px;
    margin: 9px;
    background: #bebebeb3;
}

.el-button--small.is-circle {
    padding: 9px;
    float: right;
    margin-left: 4px;
}
input[type="text"] {
    height: 40px;
}
h5 {
    margin-left: 10px;
    font-family: 'Solway', serif;
    font-weight: 400;
    font-size: 20px;
    }
</style>


