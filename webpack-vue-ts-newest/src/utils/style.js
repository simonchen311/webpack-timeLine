/* eslint-disable quotes */
/* eslint-disable comma-dangle */
export const borderFix = (d, r, c) => {
  let cell = d[r][c];
  if (!cell) {
    return [-1, 0, 0, -1];
  } else if (!d[r][c].bg || d[r][c].bg === "") {
    return [-1, 0, 0, -1];
  } else {
    return [-2, -1, 1, 0];
  }
};

export const checkStatus = (d, r, c, a) => {
  if (d == null || d[r] == null) {
    console.warn("It's incorrect data", r, c);
    return null;
  }
  let foucsStatus = d[r][c];
  return checkStatusByCell(foucsStatus, a);
};

export const checkStatusByCell = (cell, a) => {
  let foucsStatus = cell;
  let tf = { bl: 1, it: 1, ff: 1, cl: 1, un: 1 };

  if (a in tf || (a === "fs" && isInlineStringCell(cell))) {
    if (foucsStatus == null) {
      foucsStatus = "0";
    } else {
      // var  w = window.getSelection(), isInlineEdit=false;
      // if(w.type!="None"){
      //     var range = w.getRangeAt(0);
      //     let startContainer = range.startContainer;
      //     if (parseInt($("#luckysheet-input-box").css("top")) > 0 && startContainer.parentNode.tagName=="SPAN" && !range.collapsed) {
      //         let span = startContainer.parentNode;
      //         let styleList = convertCssToStyleList(span.style.cssText);
      //         foucsStatus = styleList[a];
      //         isInlineEdit = true;
      //     }
      // }

      // if(!isInlineEdit){
      //     if(isInlineStringCell(cell)){
      //         foucsStatus = cell.ct.s[0][a];
      //     }
      //     else{
      //         foucsStatus = foucsStatus[a];
      //     }
      // }

      foucsStatus = foucsStatus[a];

      if (foucsStatus == null) {
        foucsStatus = "0";
      }
    }
  } else if (a === "fc") {
    if (foucsStatus == null) {
      foucsStatus = "#000000";
    } else {
      foucsStatus = foucsStatus[a];

      if (foucsStatus == null) {
        foucsStatus = "#000000";
      }

      if (foucsStatus.indexOf("rgba") > -1) {
        foucsStatus = rgbTohex(foucsStatus);
      }
    }
  } else if (a === "bg") {
    if (foucsStatus == null) {
      foucsStatus = null;
    } else {
      foucsStatus = foucsStatus[a];

      if (foucsStatus == null) {
        foucsStatus = null;
      } else if (foucsStatus.toString().indexOf("rgba") > -1) {
        foucsStatus = rgbTohex(foucsStatus);
      }
    }
  } else if (a.substr(0, 2) === "bs") {
    if (foucsStatus == null) {
      foucsStatus = "none";
    } else {
      foucsStatus = foucsStatus[a];
      if (foucsStatus == null) {
        foucsStatus = "none";
      }
    }
  } else if (a.substr(0, 2) === "bc") {
    if (foucsStatus == null) {
      foucsStatus = "#000000";
    } else {
      foucsStatus = foucsStatus[a];
      if (foucsStatus == null) {
        foucsStatus = "#000000";
      }
    }
  } else if (a === "ht") {
    if (foucsStatus == null) {
      foucsStatus = "1";
    } else {
      foucsStatus = foucsStatus[a];
      if (foucsStatus == null) {
        foucsStatus = "1";
      }
    }

    if (["0", "1", "2"].indexOf(foucsStatus.toString()) === -1) {
      foucsStatus = "1";
    }
  } else if (a === "vt") {
    // 默认垂直居中
    if (foucsStatus == null) {
      foucsStatus = "0";
    } else {
      foucsStatus = foucsStatus[a];
      if (foucsStatus == null) {
        foucsStatus = "0";
      }
    }

    if (["0", "1", "2"].indexOf(foucsStatus.toString()) === -1) {
      foucsStatus = "0";
    }
  } else if (a === "ct") {
    if (foucsStatus == null) {
      foucsStatus = null;
    } else {
      foucsStatus = foucsStatus[a];
      if (foucsStatus == null) {
        foucsStatus = null;
      }
    }
  } else if (a === "fs") {
    const defaultFontSize = 10;
    if (foucsStatus == null) {
      foucsStatus = String(defaultFontSize);
    } else {
      foucsStatus = foucsStatus[a];
      if (foucsStatus == null) {
        foucsStatus = String(defaultFontSize);
      }
    }
  } else if (a === "tb") {
    if (foucsStatus == null) {
      foucsStatus = "0";
    } else {
      foucsStatus = foucsStatus[a];
      if (foucsStatus == null) {
        foucsStatus = "0";
      }
    }
  } else if (a === "tr") {
    if (foucsStatus == null) {
      foucsStatus = "0";
    } else {
      foucsStatus = foucsStatus[a];
      if (foucsStatus == null) {
        foucsStatus = "0";
      }
    }
  } else if (a === "rt") {
    if (foucsStatus == null) {
      foucsStatus = null;
    } else {
      foucsStatus = foucsStatus[a];
      if (foucsStatus == null) {
        foucsStatus = null;
      }
    }
  }

  return foucsStatus;
};

export const isInlineStringCell = (cell) => {
  let isIs =
    cell &&
    cell.ct != null &&
    cell.ct.t === "inlineStr" &&
    cell.ct.s != null &&
    cell.ct.s.length > 0;
  return isIs;
};

export const isInlineStringCT = (ct) => {
  let isIs =
    ct != null && ct.t === "inlineStr" && ct.s != null && ct.s.length > 0;
  return isIs;
};

const fontArray = [
  "Times New Roman",
  "Arial",
  "Tahoma",
  "Verdana",
  "微软雅黑",
  "宋体",
  "黑体",
  "楷体",
  "仿宋",
  "新宋体",
  "华文新魏",
  "华文行楷",
  "华文隶书",
];
const defaultFont =
  'normal normal normal 10pt Times New Roman "Times New Roman", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC",  "WenQuanYi Micro Hei", sans-serif';
// const fontJson = {
//   "times new roman": 0,
//   arial: 1,
//   tahoma: 2,
//   verdana: 3,
//   微软雅黑: 4,
//   "microsoft yahei": 4,
//   宋体: 5,
//   simsun: 5,
//   黑体: 6,
//   simhei: 6,
//   楷体: 7,
//   kaiti: 7,
//   仿宋: 8,
//   fangsong: 8,
//   新宋体: 9,
//   nsimsun: 9,
//   华文新魏: 10,
//   stxinwei: 10,
//   华文行楷: 11,
//   stxingkai: 11,
//   华文隶书: 12,
//   stliti: 12,
// };
export const sheetFontformat = (format) => {
  if (typeof format === "object") {
    let font = "";

    // font-style
    if (format.it === "0" || format.it == null) {
      font += "normal ";
    } else {
      font += "italic ";
    }

    // font-variant
    font += "normal ";

    // font-weight
    if (format.bl === "0" || format.bl == null) {
      font += "normal ";
    } else {
      font += "bold ";
    }

    // font-size/line-height
    if (!format.fs) {
      font += 10 + "pt ";
    } else {
      font += Math.ceil(format.fs) + "pt ";
    }

    font +=
      fontArray[0] +
      ', "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif';

    return font;
  } else {
    return defaultFont;
  }
};

// 获取有值单元格文本大小
const measureTextCache = {};
export const getMeasureText = (value, ctx, fontset) => {
  let mtc = measureTextCache[value + "_" + ctx.font];
  if (fontset != null) {
    mtc = measureTextCache[value + "_" + fontset];
  }

  if (mtc != null) {
    return mtc;
  } else {
    if (fontset != null) {
      ctx.font = fontset;
    }

    let measureText = ctx.measureText(value);
    let cache = {};
    // var regu = "^[ ]+$";
    // var re = new RegExp(regu);
    // if(measureText.actualBoundingBoxRight==null || re.test(value)){
    //     cache.width = measureText.width;
    // }
    // else{
    //     //measureText.actualBoundingBoxLeft +
    //     cache.width = measureText.actualBoundingBoxRight;
    // }

    cache.width = measureText.width;

    if (fontset != null) {
      ctx.font = fontset;
    }

    cache.actualBoundingBoxDescent = measureText.actualBoundingBoxDescent;
    cache.actualBoundingBoxAscent = measureText.actualBoundingBoxAscent;
    if (
      cache.actualBoundingBoxDescent == null ||
      cache.actualBoundingBoxAscent == null ||
      isNaN(cache.actualBoundingBoxDescent) ||
      isNaN(cache.actualBoundingBoxAscent)
    ) {
      let commonWord = "M";
      if (hasChinaword(value)) {
        commonWord = "田";
      }
      let oneLineTextHeight = getTextSize(commonWord, ctx.font)[1] * 0.8;
      if (ctx.textBaseline === "top") {
        cache.actualBoundingBoxDescent = oneLineTextHeight;
        cache.actualBoundingBoxAscent = 0;
      } else if (ctx.textBaseline === "middle") {
        cache.actualBoundingBoxDescent = oneLineTextHeight / 2;
        cache.actualBoundingBoxAscent = oneLineTextHeight / 2;
      } else {
        cache.actualBoundingBoxDescent = 0;
        cache.actualBoundingBoxAscent = oneLineTextHeight;
      }
    }

    if (ctx.textBaseline === "alphabetic") {
      let descText = "gjpqy";
      let matchText = "abcdABCD";
      let descTextMeasure = measureTextCache[descText + "_" + ctx.font];
      if (fontset != null) {
        descTextMeasure = measureTextCache[descText + "_" + fontset];
      }

      let matchTextMeasure = measureTextCache[matchText + "_" + ctx.font];
      if (fontset != null) {
        matchTextMeasure = measureTextCache[matchText + "_" + fontset];
      }

      if (descTextMeasure == null) {
        descTextMeasure = ctx.measureText(descText);
      }

      if (matchTextMeasure == null) {
        matchTextMeasure = ctx.measureText(matchText);
      }

      if (
        cache.actualBoundingBoxDescent <=
        matchTextMeasure.actualBoundingBoxDescent
      ) {
        cache.actualBoundingBoxDescent =
          descTextMeasure.actualBoundingBoxDescent;
        if (cache.actualBoundingBoxDescent == null) {
          cache.actualBoundingBoxDescent = 0;
        }
      }
    }

    cache.width *= 1;
    cache.actualBoundingBoxDescent *= 1;
    cache.actualBoundingBoxAscent *= 1;
    measureTextCache[value + "_" + 1 + "_" + ctx.font] = cache;
    return cache;
  }
};

export const isRealNum = (val) => {
  if (val == null || val.toString().replace(/\s/g, "") === "") {
    return false;
  }

  if (typeof val === "boolean") {
    return false;
  }

  if (!isNaN(val)) {
    return true;
  } else {
    return false;
  }
};

export const isRealNull = (val) => {
  if (val == null || val.toString().replace(/\s/g, "") === "") {
    return true;
  } else {
    return false;
  }
};

const rgbTohex = (color) => {
  let rgb;

  if (color.indexOf("rgba") > -1) {
    rgb = color.replace("rgba(", "").replace(")", "").split(",");
  } else {
    rgb = color.replace("rgb(", "").replace(")", "").split(",");
  }

  let r = parseInt(rgb[0]);
  let g = parseInt(rgb[1]);
  let b = parseInt(rgb[2]);

  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  return hex;
};

// 是否有中文
const hasChinaword = (s) => {
  let patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;

  if (!patrn.exec(s)) {
    return false;
  } else {
    return true;
  }
};

const getTextHeightCache = {};
export const getTextSize = (text, font) => {
  let f = font || "10pt " + fontArray[0];
  if (f in getTextHeightCache) {
    return getTextHeightCache[f];
  }

  const spanDom = document.createElement("span");
  spanDom.id = "sheetTextSizeTest";
  spanDom.style.float = "left";
  spanDom.style.whiteSpace = "nowrap";
  spanDom.style.margin = 0;
  spanDom.style.padding = 0;
  spanDom.style.visibility = "hidden";
  spanDom.style.fontSize = "10pt";
  spanDom.style.fontFamily = fontArray[0];
  spanDom.textContent = text;
  document.body.append(spanDom);

  const innerWidth = (dom) => {
    let styles = window.getComputedStyle(dom);
    let padding =
      parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    return dom.clientWidth - padding;
  };

  const innerHeight = (dom) => {
    let style = window.getComputedStyle(dom);
    let paddingTop = parseFloat(style.paddingTop);
    let paddingBottom = parseFloat(style.paddingBottom);
    let borderTop = parseFloat(style.borderTopWidth);
    let borderBottom = parseFloat(style.borderBottomWidth);
    return (
      dom.clientHeight + paddingTop + paddingBottom + borderTop + borderBottom
    );
  };

  const w = innerWidth(spanDom);
  const h = innerHeight(spanDom);

  getTextHeightCache[f] = [w, h];

  return [w, h];
};
