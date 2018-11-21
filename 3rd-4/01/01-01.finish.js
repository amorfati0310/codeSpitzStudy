const TableUrl = `http://localhost:3000/table`;

//
// 데이터를 공급하는 애
// 렌더하는애
// table그리는 애

// 어떻게 연결이 되어야 할까
// 1.

const Data = class {
  async getData() {
    throw "getData must override";
  }
};

const JsonData = class extends Data {
  constructor(data) {
    super();
    this._data = data;
  }
  async getData() {
    if (typeof this._data === "string") {
      const response = await fetch(this._data);
      return await response.json();
    } else return this._data;
  }
};

const data = new JsonData(TableUrl);

const renderer = new Renderer();
renderer.render(data);
const Renderer = class {
  constructor() {}
  async render(data) {
    if (!(data instanceof Data)) throw "invalid data type";
    const json = await data.getData();
    console.log(json);
  }
};
