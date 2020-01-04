import Axios from "axios";
import Question from "./Question";

class Vacancy {
    static basePath = '/vacancies';
    constructor(attribute) {
        this.attribute = attribute;
    }

    static async fetchAllVacancies() {
        const { data } = await Axios.get(`${this.basePath}`);
        return data.map(vacancy => new Vacancy(vacancy));
    }

    static async fetchVacancy(id) {
        const { data } = await Axios.get(`${this.basePath}/${id}`);
        return new Vacancy(data);
    }
    static async createVacancy(attr) {
        const { data } = await Axios.post(`${this.basePath}`, attr);
        return new this(data);
    }

    static async updateVacancy(id, attr) {
        const { data } = await Axios.put(`${this.basePath}/${id}`, attr);
    }

    get questions() {
        return this.attribute.questions.map(question => new Question(question));
    }

    get id() {
        return this.attribute.id;
    }
    get title() {
        return this.attribute.title;
    }
    get vacancyDate() {
        return this.attribute.date_of_vacancy;
    }

    async deleteQues(id) {
        await Axios.delete(`/vacancies/${this.id}/questions/${id}`);
        this.attribute.questions = this.attribute.questions.filter(a => a.id != id);
        return this;
    }
    async fetchQuestion(id) {
        const { data } = await Axios.get(`/vacancies/${this.id}/questions/${id}`);
        return new Question(data);
    }
    async fetchFilterQues(id) {
        this.attribute.questions = this.attribute.questions.filter(a => a.id != id);
        return this;
    }

    async UpdateQuestio(id, attr) {
        const { data } = await Axios.put(`/vacancies/${this.id}/questions/${id}`, attr);
        cd
    }
}

export default Vacancy;