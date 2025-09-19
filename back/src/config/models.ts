import { ContactModel } from "../models/contact.model";
import {UserModel} from "../models/user.model";

export class Models {
    public userModel: UserModel | undefined;
    public contactModel: ContactModel | undefined;
    constructor() {

        this.setModels();
    }

    setModels() {
        this.userModel = new UserModel();
        this.contactModel = new ContactModel();
    }
}