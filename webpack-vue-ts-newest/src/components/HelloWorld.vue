<template>
  <canvas ref="main" id="luckysheetTableContent" class="luckysheetTableContent" width="1331" height="1049"
    style="width: 1331px; height: 1049px; cursor: default;"></canvas>
</template>

<script>
import SheetData from "../utils/sheetCell";
import { borderFix, checkStatus, isInlineStringCT, sheetFontformat, getMeasureText, isRealNull, isInlineStringCell } from "../utils/style";
import { buildGridData } from "../utils/sheetData";
import { getCellTextInfo } from "../utils/text";
export default {
  name: "HelloWorld",
  data() {
    return {
      sheet: buildGridData(SheetData, SheetData.row, SheetData.column),
      scrollWidth: 0,
      scrollHeight: 0,
      drawWidth: 1346,
      drawHeight: 1064,
      offsetLeft: 46,
      offsetTop: 20,
      columnOffsetCell: 0,
      rowOffsetCell: 0,
      textBaseLine: "middle",
      columnHeaderHeight: 20,
      rowHeaderWidth: 46,
      cellOverflowMapCache: {},
      hiddenCol: new Set(),
      hiddenRow: new Set(),
      visibleDataRow: [
        21,
        42,
        63,
        84,
        105,
        126,
        147,
        168,
        189,
        210,
        231,
        252,
        273,
        294,
        315,
        336,
        357,
        389,
        410,
        431,
        452,
        473,
        494,
        515,
        536,
        616,
        637,
        658,
        739,
        776,
        776,
        776,
        796,
        816,
        836,
        856
      ],
      visibleDataCol: [
        132,
        206,
        360,
        489,
        626,
        749,
        888,
        1020,
        1149,
        1290,
        1435,
        1509,
        1583,
        1657,
        1731,
        1805,
        1879,
        1953
      ]
    };
  },
  mounted() {
    this.drawSheetMain();
    this.drowSheetColHead();
    this.drowSheetRowHead();
  },
  methods: {
    drowSheetColHead(scrollWidth = this.scrollWidth, drawWidth = this.drawWidth, offsetLeft = this.offsetLeft) {
      // scrollWidth 的默认值应该是根据页面的scroll设置的，这里默认0了

      const canvas = this.$refs.main;
      const context = canvas.getContext("2d");
      context.save();
      context.scale(1, 1);
      context.clearRect(offsetLeft, 0, drawWidth, this.columnHeaderHeight - 1);
      context.font = "10pt Arial"; // TODO
      context.textBaseLine = this.textBaseLine;
      context.fillStyle = "#000000";
      // TODO
      const datasetColSt = 0;
      const datasetColEd = 10; // 因为canvas的height只能够显示10列的数据

      context.save();
      context.beginPath();
      context.rect(
        offsetLeft - 1,
        0,
        drawWidth,
        this.columnHeaderHeight - 1
      );
      context.clip();

      let startC;
      let endC;
      const border05 = 0.5;
      let preEndC;
      for (let c = datasetColSt; c < datasetColEd; c++) {
        startC = c === 0 ? -scrollWidth : this.visibleDataCol[c - 1] - scrollWidth;
        endC = this.visibleDataCol[c] - scrollWidth;
        let title = "列标题";
        // TODO 没有列被隐藏目前

        context.fillStyle = "#ffffff";
        context.fillRect(
          startC + offsetLeft - 1,
          0,
          endC - startC,
          this.columnHeaderHeight - 1
        );
        context.fillStyle = "#000000";
        context.save(); // save scale before draw text
        context.scale(1, 1);

        // 绘制标题
        let textMetrics = getMeasureText(title, context);
        let horizonAlignPos = Math.round(
          startC + (endC - startC) / 2 + offsetLeft - textMetrics.width / 2
        );
        let verticalAlignPos = Math.round(this.columnHeaderHeight / 2) + 3;

        context.fillText(
          title,
          horizonAlignPos / 1,
          verticalAlignPos / 1
        );
        context.restore(); // restore scale after draw text

        // 列标题栏竖线 vertical
        // 右边边框
        context.beginPath();
        context.moveTo(endC + offsetLeft - 2 + border05, 0);
        context.lineTo(
          endC + offsetLeft - 2 + border05,
          this.columnHeaderHeight - 2
        );
        context.lineWidth = 1;
        context.strokeStyle = "#dfdfdf";
        context.closePath();
        context.stroke();

        if (preEndC != null) {
          // context.beginPath();
          // context.moveTo(preEndC + offsetLeft + border05, 0);
          // context.lineTo(
          //   preEndC + offsetLeft + border05,
          //   this.columnHeaderHeight - 2
          // );
          // context.closePath();
          // context.stroke();
        }

        // 下边边框
        context.beginPath();
        context.moveTo(
          startC + offsetLeft - 1,
          this.columnHeaderHeight - 2 + border05
        );
        context.lineTo(
          endC + offsetLeft - 1,
          this.columnHeaderHeight - 2 + border05
        );
        // luckysheetTableContent.lineWidth = 1;

        // luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        context.stroke();
        context.closePath();

        preEndC = endC;
      }

      // Must be restored twice, otherwise it will be enlarged under window.devicePixelRatio = 1.5
      context.restore();
      context.restore();
    },
    drowSheetRowHead(scrollHeight = this.scrollHeight, drawHeight = this.drawHeight, offsetTop = this.offsetTop) {
      const canvas = this.$refs.main;
      const context = canvas.getContext("2d");
      context.save();
      context.scale(1, 1);
      context.clearRect(0, offsetTop, this.rowHeaderWidth - 1, drawHeight);
      context.font = "10pt Arial"; // TODO
      context.textBaseLine = this.textBaseLine;
      context.fillStyle = "#000000";
      // TODO
      const datasetRowSt = 0;
      const datasetRowEd = this.visibleDataRow.length - 1;

      context.save();
      context.beginPath();
      context.rect(
        0,
        offsetTop - 1,
        this.rowHeaderWidth - 1,
        drawHeight - 2
      );
      context.clip();

      let startR;
      let endR;
      const border05 = 0.5;
      let preEndR;
      for (let r = datasetRowSt; r <= datasetRowEd; r++) {
        startR = r === 0 ? -scrollHeight - 1 : this.visibleDataRow[r - 1] - scrollHeight - 1;
        endR = this.visibleDataRow[r] - scrollHeight;
        // TODO 没有列被隐藏目前

        let firstOffset = datasetRowSt === r ? -2 : 0;
        let lastOffset = datasetRowEd === r ? -2 : 0;

        context.fillStyle = "#ffffff";
        context.fillRect(
          0,
          startR + offsetTop + firstOffset,
          this.rowHeaderWidth - 1,
          endR - startR + 1 + lastOffset - firstOffset
        );
        context.fillStyle = "#000000";
        context.save(); // save scale before draw text
        context.scale(1, 1);

        // 绘制标题
        let textMetrics = getMeasureText(r + 1, context);
        let horizonAlignPos = (this.rowHeaderWidth - textMetrics.width) / 2;
        let verticalAlignPos = startR + (endR - startR) / 2 + offsetTop + 4;

        context.fillText(
          r + 1,
          horizonAlignPos / 1,
          verticalAlignPos / 1
        );
        context.restore(); // restore scale after draw text

        // 列标题栏竖线 vertical
        // 右边边框
        context.beginPath();
        context.moveTo(this.rowHeaderWidth - 2 + border05, startR + offsetTop - 2);
        context.lineTo(this.rowHeaderWidth - 2 + border05, endR + offsetTop - 2);
        context.lineWidth = 1;
        context.strokeStyle = "#dfdfdf";
        context.stroke();
        context.closePath();

        if (preEndR != null) {
          // context.beginPath();
          // context.moveTo(preEndC + offsetLeft + border05, 0);
          // context.lineTo(
          //   preEndC + offsetLeft + border05,
          //   this.columnHeaderHeight - 2
          // );
          // context.closePath();
          // context.stroke();
        }

        // 下边边框
        context.beginPath();
        context.moveTo(-1, endR + offsetTop - 2 + border05);
        context.lineTo(this.rowHeaderWidth - 1, endR + offsetTop - 2 + border05);
        context.stroke();
        context.closePath();

        preEndR = endR;
      }
    },
    drawSheetMain() {
      const canvas = this.$refs.main;
      const context = canvas.getContext("2d");

      const datasetRowSt = 0;
      const datasetRowEd = this.visibleDataRow.length - 1;
      const datasetColSt = 0;
      const datasetColEd = 10; // 因为canvas的height只能够显示10列的数据

      const fillRowEd = this.visibleDataRow[datasetRowEd];
      const fillColEd = this.visibleDataCol[datasetColEd];

      context.save();
      context.scale(1, 1);
      context.clearRect(0, 0, this.drawWidth, this.drawHeight);
      context.fillStyle = "#ffffff";
      context.fillRect(this.offsetLeft - 1, this.offsetTop - 1, fillColEd - this.scrollWidth, fillRowEd - this.scrollHeight);
      context.font = "10pt Arial";
      context.fillStyle = "#000000";

      let cellupdate = [];
      let mergeCache = {};
      let borderOffset = {};
      let bodrder05 = 0.5; // Default 0.5

      for (let r = datasetRowSt; r <= datasetRowEd; r++) {
        let startR = r === 0 ? (-this.scrollHeight - 1) : this.visibleDataRow[r - 1] - this.scrollHeight - 1;
        let endR = this.visibleDataRow[r] - this.scrollHeight;

        // 如果是隐藏行，直接跳过这行的绘制，这里假设都不是隐藏行

        for (let c = datasetColSt; c <= datasetColEd; c++) {
          let startC = c === 0 ? (-this.scrollWidth) : this.visibleDataCol[c - 1] - this.scrollWidth;
          let endC = this.visibleDataCol[c] - this.scrollWidth;

          let firstcolumnlen = 73; // 默认行宽

          // 如果是隐藏列，直接跳过这列的绘制，这里假设都不是隐藏列

          // 单元格数据
          if (this.sheet[r] && this.sheet[r][c]) {
            let value = this.sheet[r][c];
            if (Object.prototype.toString(value).toLowerCase() === "[object object]" && "mc" in value) {
              // 就是这个格子的边界坐标位置
              borderOffset[r + "_" + c] = {
                startR,
                endR,
                startC,
                endC
              };

              if ("rs" in value["mc"]) {
                // 合并的主单元格
                let key = "r" + r + "c" + c;
                mergeCache[key] = cellupdate.length;
              } else {
                // 合并的非主单元格
                let key = "r" + value["mc"].r + "c" + value["mc"].c;
                let margeMain = cellupdate[mergeCache[key]];
                if (margeMain == null) {
                  mergeCache[key] = cellupdate.length;
                  // 加入主单元格对象：索引，位置和宽度
                  cellupdate.push({
                    r,
                    c,
                    startR,
                    endR,
                    startC,
                    endC,
                    firstcolumnlen
                  });
                } else {
                  // 当前列号等于合并主单元格的列号，即在同一列，就扩展主单元格的行高
                  if (margeMain.c === c) {
                    margeMain.endR += endR - startR - 1;
                  }

                  // 当前行号等于何合并主单元格的行号，即在同一行，就扩展主单元格的列宽
                  if (margeMain.r === r) {
                    margeMain.endC += endC - startC;
                    margeMain.firstcolumnlen += firstcolumnlen;
                  }
                }
                continue;
              };
            }
          }

          cellupdate.push({
            r,
            c,
            startR,
            startC,
            endR,
            endC,
            firstcolumnlen
          });
          borderOffset[r + "_" + c] = {
            startR,
            startC,
            endR,
            endC
          };
        }
      }

      // TODO:
      // 动态数组公式计算
      // 交替颜色件计算
      // 条件格式计算

      // 表格渲染区域 溢出单元格配置保存

      let mcArr = [];
      for (let cud = 0; cud < cellupdate.length; cud++) {
        let item = cellupdate[cud];
        let r = item.r;
        let c = item.c;
        let startR = item.startR;
        let startC = item.startC;
        let endR = item.endR;
        let endC = item.endC;

        if (!this.sheet[r]) {
          continue;
        }

        let cell = this.sheet[r][c];
        if (!cell) {
          this.nullCellRender(r, c, startR, startC, endR, endC, context, null, null, this.offsetLeft, this.offsetTop, null, null, this.datasetColSt, this.datasetColEd, this.scrollHeight, this.scrollWidth, bodrder05);
        } else {
          let value = null;
          if (typeof cell === "object" && "mc" in cell) {
            mcArr.push(item);
          } else {
            value = this.getRealCellValue(r, c);
          }
          console.log("\n", value);
          if (value == null || value.toString().length === 0) {
            this.nullCellRender(r, c, startR, startC, endR, endC, context, null, null, this.offsetLeft, this.offsetTop, null, null, this.datasetColSt, this.datasetColEd, this.scrollHeight, this.scrollWidth, bodrder05);
          } else {
            this.cellRender(r, c, startR, startC, endR, endC, value, context, null, null, this.offsetLeft, this.offsetTop, null, null, this.datasetColSt, this.datasetColEd, this.scrollHeight, this.scrollWidth, bodrder05);
          }
        }
      }
    },
    getRealCellValue(r, c) {
      let value = this.getCellValue(r, c, null, "m"); // 显示值
      if (value == null) {
        value = this.getCellValue(r, c); // 没有显示值就获取实际值
        if (value == null) {
          let ct = this.getCellValue(r, c, null, "ct"); // 单元格的值格式
          if (isInlineStringCT(ct)) {
            value = ct.s;
          }
        }
      }

      return value;
    },
    getCellValue(r, c, data, type) {
      if (type == null) {
        type = "v";
      }

      if (data == null) {
        data = this.sheet;
      }

      let dValue;

      if (r != null && c != null) {
        dValue = data[r][c];
      } else if (r != null) {
        dValue = data[r];
      } else if (c != null) {
        let newData = data[0].map((col, i) => {
          return data.map((row) => {
            return row[i];
          });
        });
        dValue = newData[c];
      } else {
        return data;
      }

      let retv = dValue;

      if (typeof dValue === "object") {
        retv = dValue[type];

        if (type === "f" && retv != null) {
          retv = ""; // retv = formula.functionHTMLGenerate(retv); TODO 公式显示
        } else if (type === "f") {
          retv = dValue["v"];
        } else if (dValue && dValue.ct && dValue.ct.t === "d") {
          retv = dValue.m;
        }
      }

      if (retv === undefined) {
        retv = null;
      }

      return retv;
    },
    nullCellRender(
      r,
      c,
      startR,
      startC,
      endR,
      endC,
      tableContext,
      afCompute,
      cfCompute,
      offsetLeft,
      offsetTop,
      dynamicArrayCompute,
      cellOverflowMap,
      datasetColSt,
      datasetColEd,
      scrollHeight,
      scrollWidth,
      border05,
      isMerge
    ) {
      const borderfix = borderFix(this.sheet, r, c);
      // 这里计算canvas需要绘制的矩形范围时,需要留下原本单元格边框的位置
      // 让 fillRect 绘制矩形的起始xy坐标增加1,绘制长宽减少1
      let cellsize = [
        startC + offsetLeft + borderfix[0] + 1,
        startR + offsetTop + borderfix[1] + 1,
        endC - startC + borderfix[2] - (isMerge ? 1 : 0) - 1,
        endR - startR + borderfix[3] - 1
      ];
      let fillStyle = checkStatus(this.sheet, r, c, "bg");
      if (this.sheet[r][c] && this.sheet[r][c].tc) {
        // 标题色
        fillStyle = this.sheet[r][c].tc;
      }

      tableContext.fillStyle = fillStyle ?? "#FFFFFF";
      tableContext.fillRect(...cellsize);

      let cellOverflowColInObj = this.cellOverflowColIn(cellOverflowMap, r, c, datasetColSt, datasetColEd);
      // 此单元格 为 溢出单元格渲染范围最后一列，绘制溢出单元格内容
      if (cellOverflowColInObj.colLast) {
        this.cellOverflowRender(cellOverflowColInObj.rowIndex, cellOverflowColInObj.colIndex, cellOverflowColInObj.stc, cellOverflowColInObj.edc, tableContext, scrollHeight, scrollWidth, offsetLeft, offsetTop, afCompute, cfCompute);
      }

      // 绘制右边框 和 下边框
      tableContext.lineWidth = 1;
      tableContext.strokeStyle = "#dfdfdf";
      tableContext.beginPath();
      if (!cellOverflowColInObj.colIn || cellOverflowColInObj.colLast) {
        tableContext.moveTo(endC + offsetLeft - 2 + border05, startR + offsetTop);
        tableContext.lineTo(endC + offsetLeft - 2 + border05, endR + offsetTop);
      }
      tableContext.moveTo(startC + offsetLeft - 1, endR + offsetTop - 2 + border05);
      tableContext.lineTo(endC + offsetLeft - 1, endR + offsetTop - 2 + border05);
      tableContext.stroke();
      tableContext.closePath();
    },
    cellRender(
      r,
      c,
      startR,
      startC,
      endR,
      endC,
      value,
      tableContext,
      afCompute,
      cfCompute,
      offsetLeft,
      offsetTop,
      dynamicArrayCompute,
      cellOverflowMap,
      datasetColSt,
      datasetColEd,
      scrollHeight,
      scrollWidth,
      border05,
      isMerge
    ) {
      const borderfix = borderFix(this.sheet, r, c);
      const cell = this.sheet[r][c];
      const cellWidth = endC - startC - 2;
      const cellHeight = endR - startR - 2;
      const spaceWidth = 2;
      const spaceHeight = 2; // 宽高方向间隙
      const posX = startC + offsetLeft;
      const posY = startR + offsetTop + 1;

      // 这里计算canvas需要绘制的矩形范围时,需要留下原本单元格边框的位置
      // 让 fillRect 绘制矩形的起始xy坐标增加1,绘制长宽减少1
      const cellsize = [
        startC + offsetLeft + borderfix[0] + 1,
        startR + offsetTop + borderfix[1] + 1,
        endC - startC + borderfix[2] - (isMerge ? 1 : 0) - 1,
        endR - startR + borderfix[3] - 1
      ];
      const fillStyle = checkStatus(this.sheet, r, c, "bg");
      tableContext.fillStyle = fillStyle ?? "#FFFFFF";
      tableContext.fillRect(...cellsize);

      let isOverflowCellRightBorderRender = true; // 溢出单元格右边框是否需要绘制
      let cellOverflowColInObj = this.cellOverflowColIn(cellOverflowMap, r, c, datasetColSt, datasetColEd);
      if (cell.tb === "1" && cellOverflowColInObj.colIn) {
        // 此单元格 为 溢出单元格渲染范围最后一列，绘制溢出单元格内容
        if (cellOverflowColInObj.colLast) {
          this.cellOverflowRender(cellOverflowColInObj.rowIndex, cellOverflowColInObj.colIndex, cellOverflowColInObj.stc, cellOverflowColInObj.edc, tableContext, scrollHeight, scrollWidth, offsetLeft, offsetTop, afCompute, cfCompute);
        } else {
          isOverflowCellRightBorderRender = false;
        }
      } else {
        const textInfo = getCellTextInfo(cell, tableContext, {
          cellWidth,
          cellHeight,
          spaceWidth,
          spaceHeight,
          r,
          c
        });
        // 单元格文本颜色
        tableContext.fillStyle = checkStatus(this.sheet, r, c, "fc");
        this.cellTextRender(textInfo, tableContext, { posX, posY });
        tableContext.restore();
      }

      // 绘制右边框 和 下边框
      tableContext.lineWidth = 1;
      tableContext.strokeStyle = "#dfdfdf";
      tableContext.beginPath();
      if (isOverflowCellRightBorderRender) {
        tableContext.moveTo(endC + offsetLeft - 2 + border05, startR + offsetTop);
        tableContext.lineTo(endC + offsetLeft - 2 + border05, endR + offsetTop);
      }
      tableContext.moveTo(startC + offsetLeft - 1, endR + offsetTop - 2 + border05);
      tableContext.lineTo(endC + offsetLeft - 1, endR + offsetTop - 2 + border05);
      tableContext.stroke();
      tableContext.closePath();
    },
    cellOverflowRender(r, c, stc, edc, tableContext, scrollHeight, scrollWidth, offsetLeft, offsetTop, afCompute, cfCompute) {
      // 移除单元格的起止行列坐标
      const startR = (r === 0) ? (-scrollHeight - 1) : (this.visibleDataRow[r - 1] - scrollHeight - 1);
      const endR = this.visibleDataRow[r] - scrollHeight;
      const startC = (stc === 0) ? (-scrollWidth) : (this.visibleDataCol[stc - 1] - scrollWidth);
      const endC = this.visibledatacolumn[edc] - scrollWidth;

      const cell = this.sheet[r][c];
      const cellWidth = endC - startC - 2;
      const cellHeight = endR - startR - 2;
      const spaceWidth = 2;
      const spaceHeight = 2;
      const posX = startC + offsetLeft;
      const posY = startR + offsetTop + 1;
      const fontset = sheetFontformat(cell);
      const zoomRatio = 1;

      tableContext.font = fontset;
      tableContext.save();
      tableContext.beginPath();
      tableContext.rect(posX, posY, cellWidth, cellHeight);
      tableContext.clip();
      tableContext.scale(zoomRatio, zoomRatio);

      const textInfo = getCellTextInfo(cell, tableContext, {
        cellWidth,
        cellHeight,
        spaceWidth,
        spaceHeight,
        r,
        c
      });
      tableContext.fillStyle = checkStatus(this.sheet, r, c, "fc");
      this.cellTextRender(textInfo, tableContext, { posX, posY });
      tableContext.restore();
    },
    cellTextRender(textInfo, ctx, option) {
      if (!textInfo || !textInfo.values) {
        return;
      }

      const values = textInfo.values;
      const posX = option.posX;
      const posY = option.posY;
      const zoomRatio = 1;

      for (let i = 0; i < values.length; i++) {
        let word = values[i];
        if (word.inline === true && word.style != null) {
          ctx.font = word.style.fontset;
          ctx.fillStyle = word.style.fc;
        } else {
          ctx.font = word.style;
        }

        // 暂时未排查到word.content第一次会是object，先做下判断来渲染，后续找到问题再复原
        let txt = typeof word.content === "object" ? word.content.m : word.content;
        ctx.fillText(
          txt,
          (posX + word.left) / zoomRatio,
          (posY + word.top) / zoomRatio
        );

        if (word.cancelLine != null) {
          let c = word.cancelLine;
          ctx.beginPath();
          ctx.moveTo(
            Math.floor((posX + c.startX) / zoomRatio) + 0.5,
            Math.floor((posY + c.startY) / zoomRatio) + 0.5
          );
          ctx.lineTo(
            Math.floor((posX + c.endX) / zoomRatio) + 0.5,
            Math.floor((posY + c.endY) / zoomRatio) + 0.5
          );
          ctx.lineWidth = Math.floor(c.fs / 9);
          ctx.strokeStyle = ctx.fillStyle;
          ctx.stroke();
          ctx.closePath();
        }

        if (word.underLine != null) {
          let underLines = word.underLine;
          for (let a = 0; a < underLines.length; a++) {
            let item = underLines[a];
            ctx.beginPath();
            ctx.moveTo(
              Math.floor((posX + item.startX) / zoomRatio) + 0.5,
              Math.floor((posY + item.startY) / zoomRatio)
            );
            ctx.lineTo(
              Math.floor((posX + item.endX) / zoomRatio) + 0.5,
              Math.floor((posY + item.endY) / zoomRatio) + 0.5
            );
            ctx.lineWidth = Math.floor(item.fs / 9);
            ctx.strokeStyle = ctx.fillStyle;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    },
    cellOverflowColIn(map, r, c, colStart, colEnd) {
      let colIn = false; // 此单元格 是否在 某个溢出单元格的渲染范围
      let colLast = false; // 此单元格 是否是 某个溢出单元格的渲染范围的最后一列
      let rowIndex; // 溢出单元格 行下标
      let colIndex; // 溢出单元格 列下标
      let stc;
      let edc;

      for (let rkey in map) {
        for (let ckey in map[rkey]) {
          rowIndex = rkey;
          colIndex = ckey;
          // rowIndex = key.substr(0, key.indexOf('_'));
          // colIndex = key.substr(key.indexOf('_') + 1);
          let mapItem = map[rkey][ckey];
          stc = mapItem.stc;
          edc = mapItem.edc;

          if (rowIndex === r) {
            if (c >= stc && c <= edc) {
              colIn = true;

              if (c === edc || c === colEnd) {
                colLast = true;
                break;
              }
            }
          }
        }

        if (colLast) {
          break;
        }
      }

      return {
        colIn: colIn,
        colLast: colLast,
        rowIndex: rowIndex,
        colIndex: colIndex,
        stc: stc,
        edc: edc
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
