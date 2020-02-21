class Question {
    constructor(attributes) {
        this.attributes = attributes;
    }

    get title() {
        return this.attributes.title;
    }

    get type() {
        return this.attributes.type;
    }

    get id() {
        return this.attributes.id;
    }
    get answer() {
        return this.attributes.answer;
    }
}

export default Question;
