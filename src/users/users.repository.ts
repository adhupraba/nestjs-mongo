import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDoc } from "./schemas/user.schema";
import { Model } from "mongoose";
import { EntityRepository } from "src/database/entity.repository";

@Injectable()
export class UsersRepository extends EntityRepository<UserDoc> {
  constructor(@InjectModel(User.name) userModel: Model<UserDoc>) {
    super(userModel);
  }
}
