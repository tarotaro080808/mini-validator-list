import * as axios from "axios";

export default class Store {
  constructor() {
    this.instance = axios.create({
      baseURL: "api"
    });
  }
  get(promise, callback) {
    return promise
      .then(res => {
        callback(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }
  getValidators(callback) {
    return this.get(this.instance.get("validators"), callback);
  }
}