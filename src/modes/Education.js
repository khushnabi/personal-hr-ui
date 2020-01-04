import _ from "lodash";
class Education {
    constructor(attributes) {
        this.attributes = attributes;
        console.log(attributes);
    }

   
 
    get institute() {
        return  _.get(this.attributes, 'institute.name');
    }

    get course() {
        return _.get(this.attributes, 'course.name');
    }

    get degree() {
        return  _.get(this.attributes, 'degree.name');
    }
    get id() {
        return this.attributes.id;
    }
}


export default Education;
