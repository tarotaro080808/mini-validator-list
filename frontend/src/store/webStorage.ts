type AppData = {
  themeType: string;
};

const KEYS = {
  APP: "APP"
};

const SCHEMA = {
  APP: {
    themeType: ""
  }
};

class LocalStorageRepository {
  constructor(private key: string) {}

  get = () => {
    let data: AppData;
    try {
      data = JSON.parse(localStorage.getItem(KEYS.APP));
    } catch {}
    if (!data) {
      data = { ...SCHEMA[this.key] };
    }
    return data;
  };

  set = (props: any) => {
    const _data = this.get();
    const newData = {
      ..._data,
      ...props
    };
    localStorage.setItem(this.key, JSON.stringify(newData));
  };
}

class LocalStorage {
  private _with = (repositoryType: string) => {
    return new LocalStorageRepository(repositoryType);
  };

  getAppData = () => this._with(KEYS.APP).get();

  setAppData = (props: { [key: string]: any }) =>
    this._with(KEYS.APP).set(props);
}

const webStorage = new LocalStorage();

export { webStorage };
