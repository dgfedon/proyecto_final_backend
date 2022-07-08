import mongoose from 'mongoose';

export class MongoDB<T> {
  model;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }

  async getAll() {
    try {
      return this.model.find();
    } catch (error) {
      console.log(error);
    }
  }

  getById(id: string) {
    try {
      return this.model.findOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }

  create(data: Partial<T>) {
    try {
      return this.model.create(data);
    } catch (error) {
      console.log(error);
    }
  }

  update(id: string, data: Partial<T>) {
    try {
      return this.model.updateOne({ _id: id }, { $set: data });
    } catch (error) {
      console.log(error);
    }
  }

  delete(id: string) {
    try {
      return this.model.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }

  deleteAll() {
    try {
      return this.model.deleteMany();
    } catch (error) {
      console.log(error);
    }
  }
}
