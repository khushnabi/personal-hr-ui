import Axios from "axios";
import Skill from "./Skill";
import Education from "./Education";
import Experiance from "./Experiance";

class User {
    static basePath = "/users";
    static async fetchAll() {
        const { data } = await Axios.get(`${this.basePath}`);
        console.log(data);

        return data.map(user => new User(user));
    }



    static async create(user) {
        const { data } = await Axios.post(`${User.basePath}`, user);
        return new this(data);
    }
    
    static async fetch(id) {
        const { data } = await Axios.get(`${this.basePath}/${id}`);
        console.log(data);
        return new User(data);
    }
    
    constructor(attributes) {
        this.attributes = attributes;
    }

    get id() {
        return this.attributes.id;
    }

    get name() {
        return this.attributes.name;
    }

    get email() {
        return this.attributes.email;
    }

    get phone() {
        return this.attributes.phone
    }
    get skills() {
        return this.attributes.skills.map(skill => new Skill(skill));
    }
    get educations() {
        return this.attributes.educations.map(education => new Education(education));
    }

    get experiences() {
        return this.attributes.experiences.map(experience => new Experiance(experience));
    }


async createEducation(education) {
    const { data } = await Axios.post(`${User.basePath}/${this.id}/educations`, education);
    return this.attributes.educations.push(new Education(data));
}

    async createSkills(skill) {
        const { data } = await Axios.post(`${User.basePath}/${this.id}/skills`, skill);
        return this.attributes.skills.push(new Skill(data));
     }

     async createExperience(experiance) {
        const { data } = await Axios.post(`${User.basePath}/${this.id}/experiences`, experiance);
        return this.attributes.experiences.push(new Experiance(data));
     }

     static async update(attr, id) {
        const { data} = await Axios.put(`${User.basePath}/${id}`, attr);

    }

    async deleteSkill(id) {
        await Axios.delete(`${User.basePath}/${this.id}/skills/${id}`);
        this.attributes.skills = this.attributes.skills.filter(a => a.id != id);
        return this;
     }

     async deleteEducation(id) {
         await Axios.delete(`${User.basePath}/${this.id}/educations/${id}`);
         this.attributes.educations = this.attributes.educations.filter(a => a.id != id);
         return this;
     }
     async deleteExperiance(id) {
         await Axios.delete(`${User.basePath}/${this.id}/experiences/${id}`);
         this.attributes.experiences = this.attributes.experiences.filter(a => a.id != id);
         return this;
     }

     static async delete(id, users) {
        await Axios.delete(`${User.basePath}/${id}`);
        this.attributes = users.filter(user => user.id != id);
        return this;





     }

}

export default User;

