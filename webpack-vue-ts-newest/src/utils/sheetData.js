/* eslint-disable comma-dangle */
/* eslint-disable camelcase */
import { isRealNull, isRealNum } from "./style";
const dataGridGrowth = (data, addr, addc, iscallback) => {
  if (addr <= 0 && addc <= 0) {
    return data;
  }

  if (addr <= 0) {
    addr = 0;
  }

  if (addc <= 0) {
    addc = 0;
  }

  let dataClen = 0;
  if (data.length === 0) {
    data = [];
    dataClen = 0;
  } else {
    dataClen = data[0].length;
  }

  let coladd = []; // 需要额外增加的空列
  for (let c = 0; c < addc; c++) {
    coladd.push(null);
  }

  let rowadd = []; // 完整的一个空行
  for (let r = 0; r < dataClen + addc; r++) {
    rowadd.push(null);
  }

  for (let r = 0; r < data.length; r++) {
    data[r] = [].concat(data[r].concat(coladd)); // 在现有数据每行的末尾增加额外列
  }

  for (let r = 0; r < addr; r++) {
    data.push([].concat(rowadd)); // 在现有数据增加额外行
  }

  //   if (!!iscallback) {
  //     server.saveParam("all", Store.currentSheetIndex, data.length, { k: "row" });
  //     server.saveParam("all", Store.currentSheetIndex, data[0].length, {
  //       k: "column",
  //     });
  //   }

  return data;
};

const setCellValue = (r, c, d, v) => {
  //   if (d == null) {
  //     d = Store.flowdata;
  //   }
  // 若采用深拷贝，初始化时的单元格属性丢失
  // let cell = $.extend(true, {}, d[r][c]);
  let cell = d[r][c];

  let vupdate; // 原始值

  if (typeof v === "object") {
    if (cell == null) {
      cell = v; // 没有原数据直接填充
    } else {
      if (v.f != null) {
        cell.f = v.f; // 替换新的公式
      } else if (cell.hasOwnProperty("f")) {
        delete cell.f; // 删除原公式
      }

      if (v.spl != null) {
        cell.spl = v.spl;
      }

      if (v.ct != null) {
        cell.ct = v.ct; // 替换单元格格式
      }
    }

    if (typeof v.v === "object") {
      vupdate = v.v.v;
    } else {
      vupdate = v.v;
    }
  } else {
    vupdate = v;
  }

  if (isRealNull(vupdate)) {
    if (typeof cell === "object") {
      delete cell.m;
      delete cell.v;
    } else {
      cell = null;
    }

    d[r][c] = cell;

    return;
  }

  // 1.为null
  // 2.数据透视表的数据，flowdata的每个数据可能为字符串，结果就是cell == v == 一个字符串或者数字数据
  if (
    isRealNull(cell) ||
    ((typeof cell === "string" || typeof cell === "number") && cell === v)
  ) {
    cell = {};
  }

  let vupdateStr = vupdate.toString();

  if (vupdateStr.substr(0, 1) === "'") {
    cell.m = vupdateStr.substr(1);
    cell.ct = { fa: "@", t: "s" };
    cell.v = vupdateStr.substr(1);
    cell.qp = 1;
  } else if (cell.qp === 1) {
    cell.m = vupdateStr;
    cell.ct = { fa: "@", t: "s" };
    cell.v = vupdateStr;
  } else if (vupdateStr.toUpperCase() === "TRUE") {
    cell.m = "TRUE";
    cell.ct = { fa: "General", t: "b" };
    cell.v = true;
  } else if (vupdateStr.toUpperCase() === "FALSE") {
    cell.m = "FALSE";
    cell.ct = { fa: "General", t: "b" };
    cell.v = false;
  } else if (
    vupdateStr.substr(-1) === "%" &&
    isRealNum(vupdateStr.substring(0, vupdateStr.length - 1))
  ) {
    cell.ct = { fa: "0%", t: "n" };
    cell.v = vupdateStr.substring(0, vupdateStr.length - 1) / 100;
    cell.m = vupdate;
  } else if (valueIsError(vupdate)) {
    cell.m = vupdateStr;
    // cell.ct = { "fa": "General", "t": "e" };
    if (cell.ct != null) {
      cell.ct.t = "e";
    } else {
      cell.ct = { fa: "General", t: "e" };
    }
    cell.v = vupdate;
  } else {
    if (
      cell.f != null &&
      isRealNum(vupdate) &&
      !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
        vupdate
      )
    ) {
      cell.v = parseFloat(vupdate);
      if (cell.ct == null) {
        cell.ct = { fa: "General", t: "n" };
      }

      if (cell.v === Infinity || cell.v === -Infinity) {
        cell.m = cell.v.toString();
      } else {
        if (cell.v.toString().indexOf("e") > -1) {
          let len;
          if (cell.v.toString().split(".").length === 1) {
            len = 0;
          } else {
            len = cell.v.toString().split(".")[1].split("e")[0].length;
          }
          if (len > 5) {
            len = 5;
          }

          cell.m = cell.v.toExponential(len).toString();
        } else {
          let v_p = Math.round(cell.v * 1000000000) / 1000000000;
          if (cell.ct == null) {
            let mask = genarate(v_p);
            cell.m = mask[0].toString();
          } else {
            let mask = update(cell.ct.fa, v_p);
            cell.m = mask.toString();
          }

          // cell.m = mask[0].toString();
        }
      }
    } else if (cell.ct != null && cell.ct.fa === "@") {
      cell.m = vupdateStr;
      cell.v = vupdate;
    } else if (
      cell.ct != null &&
      cell.ct.fa != null &&
      cell.ct.fa !== "General"
    ) {
      if (isRealNum(vupdate)) {
        vupdate = parseFloat(vupdate);
      }

      let mask = update(cell.ct.fa, vupdate);

      if (mask === vupdate) {
        // 若原来单元格格式 应用不了 要更新的值，则获取更新值的 格式
        mask = genarate(vupdate);

        cell.m = mask[0].toString();
        cell.ct = mask[1];
        cell.v = mask[2];
      } else {
        cell.m = mask.toString();
        cell.v = vupdate;
      }
    } else {
      if (
        isRealNum(vupdate) &&
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          vupdate
        )
      ) {
        if (typeof vupdate === "string") {
          let flag = vupdate
            .split("")
            .every((ele) => ele === "0" || ele === ".");
          if (flag) {
            vupdate = parseFloat(vupdate);
          }
        }
        cell.v =
          vupdate; /* 备注：如果使用parseFloat，1.1111111111111111会转换为1.1111111111111112 ? */
        cell.ct = { fa: "General", t: "n" };
        if (cell.v === Infinity || cell.v === -Infinity) {
          cell.m = cell.v.toString();
        } else {
          let mask = genarate(cell.v);

          cell.m = mask[0].toString();
        }
      } else {
        let mask = genarate(vupdate);

        cell.m = mask[0].toString();
        cell.ct = mask[1];
        cell.v = mask[2];
      }
    }
  }

  //   if (!server.allowUpdate && !luckysheetConfigsetting.pointEdit) {
  //     if (
  //       cell.ct != null &&
  //       /^(w|W)((0?)|(0\.0+))$/.test(cell.ct.fa) == false &&
  //       cell.ct.t == "n" &&
  //       cell.v != null &&
  //       parseInt(cell.v).toString().length > 4
  //     ) {
  //       let autoFormatw = luckysheetConfigsetting.autoFormatw
  //         .toString()
  //         .toUpperCase();
  //       let accuracy = luckysheetConfigsetting.accuracy;

  //       let sfmt = setAccuracy(autoFormatw, accuracy);

  //       if (sfmt != "General") {
  //         cell.ct.fa = sfmt;
  //         cell.m = update(sfmt, cell.v);
  //       }
  //     }
  //   }

  d[r][c] = cell;
};

const buildGridData = (file, defaultRowNum = 84, defaultColumnNum = 60) => {
  // 如果已经存在二维数据data,那么直接返回data；如果只有celldata，那么就转化成二维数组data，再返回
  let row = file.row == null ? defaultRowNum : file.row;
  let column = file.column == null ? defaultColumnNum : file.column;
  let data =
    file.data && file.data.length > 0
      ? file.data
      : dataGridGrowth([], row, column);
  let celldata = file.celldata;
  if (file.data && file.data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        setCellValue(i, j, data, data[i][j]);
      }
    }
  } else {
    if (celldata && celldata.length > 0) {
      for (let i = 0; i < celldata.length; i++) {
        let item = celldata[i];
        let r = item.r;
        let c = item.c;
        let v = item.v;

        if (r >= data.length) {
          data = dataGridGrowth(data, r - data.length + 1, 0);
        }
        if (c >= data[0].length) {
          data = dataGridGrowth(data, 0, c - data[0].length + 1);
        }
        setCellValue(r, c, data, v); // 设置data的值
      }
    }
  }

  // 亿万格式+精确度 恢复全局初始化
  // luckysheetConfigsetting.autoFormatw = false;
  // luckysheetConfigsetting.accuracy = undefined;
  return data;
};

// 是否是错误类型
const error = {
  v: "#VALUE!", // 错误的参数或运算符
  n: "#NAME?", // 公式名称错误
  na: "#N/A", // 函数或公式中没有可用数值
  r: "#REF!", // 删除了由其他公式引用的单元格
  d: "#DIV/0!", // 除数是0或空单元格
  nm: "#NUM!", // 当公式或函数中某个数字有问题时
  nl: "#NULL!", // 交叉运算符（空格）使用不正确
  sp: "#SPILL!", // 数组范围有其它值
};
function valueIsError(value) {
  let isError = false;

  // eslint-disable-next-line no-unused-vars
  for (let x in error) {
    if (value === error[x]) {
      isError = true;
      break;
    }
  }

  return isError;
}

const genarate = (v) => {
  return [v];
};

const update = (v) => {
  return v;
};

export { buildGridData };
