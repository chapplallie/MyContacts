import {UserModel} from "../models/user.model";

export class Models {
    public userModel: UserModel | undefined;
    constructor() {

        this.setModels();
    }

    setModels() {
        this.userModel = new UserModel();
    }
}