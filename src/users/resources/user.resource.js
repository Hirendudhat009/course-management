import moment from "moment";

export default class UserDetailsResource {
    constructor(data) {
        this.userId = data.id;
        this.email = data.email;
        this.name = data.name;
        this.status = data.status;
        this.role = data.role;
        this.joinedAt = moment(data.createdAt).valueOf() / 1000;
    }
}