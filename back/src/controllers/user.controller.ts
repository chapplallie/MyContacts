import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";

export default class UserController {
    public async auth(req: any, res: any, next: any) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send({ message: "Email et MDP requis" });
            return;
        }
        
        const user = await UserModel.findOne({ email: email });
        
        if (user) {
            if (await user.validPassword(password)) {
                //JWT ici
                const jwtKey: string = process.env.JWT_SECRET || "your-secret-key";
                const jwtExpire: string = process.env.JWT_EXPIRE || "24h";
                const userId = (user as any)._id.toString();
                const token = jwt.sign({ id: userId }, jwtKey, {
                    expiresIn: jwtExpire,
                } as jwt.SignOptions);
                
                // Response with user data
                const userToSend = {
                    id: userId,
                    email: user.email,
                    token: token,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                };
                
                res
                    .set("Content-Type", "application/json; charset=utf-8")
                    .status(200)
                    .send(userToSend);
            } else {
                res.status(401).send({ message: "MDP incorrect" });
            }
        } else {
            res.status(404).send({ message: "User inconnu" });
        }
    }
}