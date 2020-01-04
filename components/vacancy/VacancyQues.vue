<template>
    <div  v-loading.fullscreen.lock="fullscreenLoading">
       <el-card class="card-box">
          <div slot="header">
                <span>Question</span>
                <el-button @click="addQuestion" class="addSkills" type="primary" size="small"><span style="font-weight:bold;" class="el-icon-plus"></span></el-button>
            </div>
            <div>
              
              <br />
              <el-form v-if="isQuestion"  :model="question" :rules="rules" ref="question" label-width="120px">
                  <el-form-item label="Question" prop="title">
                      <el-input v-model="question.title"></el-input>
                  </el-form-item>
                  <el-form-item label="Answer" prop="answer">
                      <el-input v-model="question.answer"></el-input>
                  </el-form-item>
                  <el-form-item label="Type" prop="type">
                      <el-select v-model="question.type" placeholder="Question type">
                          <el-option label="objective" value="objective"></el-option>
                          <el-option label="subjective" value="subjective"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" v-if="isUpdate" @click="updateQues()">Update</el-button>
                      <el-button type="primary" v-else @click="createQuestion('question')">Create</el-button>
                      <el-button @click="cancel">Cancel</el-button>
                  </el-form-item>
                  <hr />
              </el-form>

              <div v-for="question in vacancy.questions" :key="question.id">
                  <el-button type="danger" icon="el-icon-delete" circle size="small" @click="deleteQues(question.id)"></el-button>
                  <el-button type="default" icon="el-icon-edit" circle size="small" @click="editQues(question.id)"></el-button>
                    <p>Question : {{question.title}}</p>
                    <p>Answer : {{question.answer}}</p>
                    <p>Type : {{question.type}}</p>
                    <hr />
              </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import Axios from 'axios';
import Vacancy from "../../src/modes/Vacancy";

export default {
    data() {
        return {
          fullscreenLoading:false,
          isQuestion: false,
          isUpdate :false,
          filterQuestion:[],
          vacancy:[],
          questions:[],
            id: this.$route.params.id,
            question: {
                title:'',
                type:'',
                answer:''
        },
        rules: {
          title: [
            { required: true, message: 'Please input title', trigger: 'blur' },
          ],
          type: [
            { required: true, message: 'Please select type', trigger: 'change' }
          ],
          answer: [
            { required: true, message: 'Please input answer', trigger: 'blur' }
          ]
        }
        }
    },
    mounted() {
        this.fetchVacancy();
    },

    methods: {
      addQuestion() {
          this.isQuestion = true;
      },
         createQuestion(formName) {
            this.$refs[formName].validate(async(valid) => {
            if (valid) {
                this.questions = await Axios.post(`/vacancies/${this.id}/questions`, this.question);
                this.question = {};
                this.fetchVacancy();
                this.isQuestion = false;
               
            } else {
                console.log('error submit!!');
                return false;
            }
            });
      },
     async deleteQues(id) {
        this.vacancy = await this.vacancy.deleteQues(id);
        //  const ques =  await Axios.delete(`/vacancies/${this.id}/questions/${id}`);
         
      },
      cancel() {
        this.question = {};
        this.isQuestion = false;
      },
     async editQues(id) {
          this.isUpdate = true;
          this.filterQuestion = await this.vacancy.fetchQuestion(id);
          this.question.title = this.filterQuestion.title;
          this.question.type = this.filterQuestion.type;
          this.question.answer = this.filterQuestion.answer;
          await this.vacancy.fetchFilterQues(id);
          this.isQuestion = true;
      },

       async fetchVacancy() {
        this.vacancy = await Vacancy.fetchVacancy(this.id);
        },

        async updateQues() {
          this.questions = await this.vacancy.UpdateQuestio(this.filterQuestion.id, this.question);
          this.isUpdate = false;
          this.isQuestion = false;
        }
    }
}

</script>

