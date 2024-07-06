import { Document, FilterQuery, Model, ProjectionElementType, UpdateQuery } from "mongoose";

export type Projection<T> = { [P in keyof T]?: ProjectionElementType };

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(filterQuery: FilterQuery<T>, projection?: Projection<T>): Promise<T | null> {
    return this.entityModel.findOne(filterQuery, { __id: 0, __v: 0, ...projection });
  }

  async find(filterQuery: FilterQuery<T>, projection?: Projection<T>): Promise<T[] | null> {
    return this.entityModel.find(filterQuery, { __id: 0, __v: 0, ...projection });
  }

  async create(createEntityData: Partial<T>): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(filterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<T>): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(filterQuery, updateEntityData, { new: true });
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const delRes = await this.entityModel.deleteMany(filterQuery);
    return delRes.deletedCount > 0;
  }
}
