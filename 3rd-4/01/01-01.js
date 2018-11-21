const validateSelector = selector => {
  if (typeof selector !== "string" || !selector) throw "invalid selector";
};

const Table = (_ => {
  const Private = Symbol();
  return class {
    constructor(parent) {
      validateSelector(parent);
      this[Private] = { parent };
    }
    // load(url) {
    //   fetch(url)
    //     .then(response => response.json())
    //     .then(json => this.render());
    // }
    async load(url) {
      const response = await fetch(url),
        json = await response.json();
      console.log(json);
      this.render();
    }
    render() {
      // 부모 데이터 체크
      // table생성
      // title을 caption으로
      // header를 thead로
      // items 를 tr로
      // 부모에 table삽입
    }
  };
})();

const table = new Table("#data");
// fetch(" http://localhost:3000/table")
//   .then(response => response.json())
//   .then(json => {
//     console.log(json);
//   });
table.load("http://localhost:3000/table");

const loader = new loader("http://localhost:3000/table");
loader.load(json => {
  const render = new Render();
  render.setData(json);
  render.render();
});

const Data = class {
  async getData() {
    const data = await this._getData();
    return new Info(data);
  }
  async _getData() {
    throw "_getData must overrided";
  }
};

const Info = class {
  constructor(data) {
    const { title, header, items } = data;
    if (typeof title !== "string" || !title) throw "invalid title";
    if (typeof !Array.isArray(header) || !header.length) throw "invalid title";
    if (typeof !Array.isArray(items) || !items.length) throw "invalid items";
    this._private = { title, header, tiems };
  }
  get title() {
    return this._private.title;
  }
  get header() {
    return this._private.header;
  }
  get items() {
    return this._private.items;
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
// 문제 인식 json날 것을 받아들이니까 형태가 드러난다 범용성 !

const Renderer = class {
  constructor() {}
  async render(data) {
    if (!(data instanceof Data)) throw "invalid data type";
    const info = await data.getData();
    cosnole.log(info);
  }
  _render() {
    throw "_render must overrided";
  }
};

const TableRenderer = class extends Renderer {
  constructor(parent) {
    validateSelector();
  }
  _render() {}
};

// 순수한 JS Domain Model
// Native객체 DomainModel과 Native객체를 분리시킨다 !!!
