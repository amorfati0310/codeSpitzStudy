const TableUrl = `http://localhost:3000/table`;

//
// 데이터를 공급하는 애
// 렌더하는애
// table그리는 애

// 어떻게 연결이 되어야 할까
// 1.

const Info = class {
  constructor(data) {
    const { title, header, items } = data;
    if (typeof title !== "string" || !title) throw "invalid title";
    if (!Array.isArray(header) || !header.length) throw "invalid header";
    if (!Array.isArray(items) || !items.length) throw "invalid items";
    this._private = { title, header, items };
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
    let json;
    if (typeof this._data === "string") {
      const response = await fetch(this._data);
      json = await response.json();
    } else json = this._data;
    return new Info(json);
  }
};

const Renderer = class {
  async render(data) {
    if (!(data instanceof Data)) throw "invalid data type";
    const info = await data.getData();
    this._render(info);
  }
  _render() {
    throw "_render must overrided";
  }
};

const TableRenderer = class extends Renderer {
  constructor(parent) {
    if (typeof parent !== "string" || !parent) throw "invalid parent";
    super();
    this._parent = parent;
  }
  _render(info) {
    const parent = document.querySelector(this._parent);
    if (!parent) throw "invalid parent";
    parent.innerHTML = "";
    console.dir(info);
    const { title, header, items } = info;
    const [table, caption, thead] = "table,caption,thead".split(",").map(v => document.createElement(v));
    caption.innerHTML = title;
    console.log(header);
    console.log(items);
    // [
    //   caption,
    //   header.reduce(
    //   (_, v)=>(thead.appendChild(document.createElement("th")).innerHTML = v, thead)),
    //   ...items.map(item=> item.reduce(
    //     (tr,v)=>(tr.appendChild(document.createElement('td')).innerHTML=v,tr),
    //     document.createElement("tr")
    // ))
    // ].forEach(el => table.appendChild(el));
    // parent.appendChild(table);
  }
};

const data = new JsonData(TableUrl);

const tableRenderer = new TableRenderer("#table");
tableRenderer.render(data);
