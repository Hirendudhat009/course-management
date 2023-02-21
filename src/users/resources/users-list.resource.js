import moment from "moment";

export default class UsersListResource {
    constructor(users) {
        return users.map((data) => ({
            userId: data.id,
            email: data.email,
            name: data.name,
            status: data.status,
            role: data.role,
            joinedAt: moment(data.createdAt).valueOf() / 1000
        }))
    }
}