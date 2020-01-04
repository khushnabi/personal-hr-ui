import _ from "lodash";

class Experiance {
    constructor(attributes) {
        this.attributes = attributes;
    }

  get company() {
        return this.attributes.company.name;
    }

   get job_profile() {
        return this.attributes.job_profile;
    }
    get id() {
        return this.attributes.id;
    }
}


export default Experiance;
