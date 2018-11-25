const TableUrl = `http://localhost:3000/table`;

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
    const [table, caption, thead, tbody] = "table,caption,thead,tbody".split(",").map(v => document.createElement(v));
    caption.innerHTML = title;
  const thr = document.createElement('tr')
  thead.appendChild(thr);
  [
    caption,
    header.reduce((ac,c)=>{
    const th = document.createElement('th')
    th.innerHTML = c;
    thr.appendChild(th)
      return thr;
    }, thr),
    items.reduce((tbody, tbodyRowData)=>{
      const tbr = document.createElement('tr')
      const tbodyRow = tbodyRowData.reduce((ac,c)=>{
      const td = document.createElement('td')
      td.innerHTML = c;
      tbr.appendChild(td)
      return tbr
    }, tbr)
    tbody.appendChild(tbodyRow)
    return tbody
  }, tbody)
  ].forEach(el=>table.appendChild(el))
    parent.appendChild(table);
  }
};

const data = new JsonData(TableUrl);

const tableRenderer = new TableRenderer("#table");
tableRenderer.render(data);

//과제 1
//지금까지 전개한 객체협력모델에서는 여전히 문제가 남아있다.
// Info는 Data와 Renderer 사이에 교환을 위한 프로토콜인데 Renderer의 자식인 TableRenderer도 Info에 의존적인 상태다. 이를 개선하라