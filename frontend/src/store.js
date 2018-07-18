import * as axios from "axios";

export default class Store {
  constructor() {
    this.instance = axios.create({
      baseURL: "api"
    });
  }
  get(promise) {
    return promise.then(res => res.data).catch(err => {
      console.error(err);
    });
  }
  getValidators() {
    return Promise.all([
      this.get(this.instance.get("validators")),
      this.get(this.instance.get("geo"))
    ]).then(data => {
      const validators = data[0];
      const geo = data[1];

      const merged = validators.list.map(validator => {
        const location = geo.list.filter(g => g.domain === validator.domain);
        if (location.length > 0) {
          return Object.assign(validator, location[0]);
        }
        return validator;
      });

      return {
        lastUpdated: validators.lastUpdated,
        list: merged
      };
    });
  }
}
