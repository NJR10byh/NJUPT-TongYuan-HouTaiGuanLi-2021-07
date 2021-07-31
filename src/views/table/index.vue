<template>
  <div class="Table">
    <div class="head-btn">
      <div class="refresh">
        <el-button
          icon="el-icon-refresh"
          @click="refresh"
        >刷新
        </el-button>
      </div>
      <div class="refresh">
        <el-button
          icon="el-icon-download"
          @click="exportExcel"
        >导出
        </el-button>
      </div>
    </div>
    <!-- table -->
    <el-table
      id="outTable"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      stripe
      class="tablestyle"
      style="width: 100%"
    >
      <el-table-column prop="index" label="序号" width="70" />
      <el-table-column prop="number" label="学号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="higest" label="最高成绩" />
      <el-table-column prop="times" label="完成次数" />
      <el-table-column prop="lasttime" label="最后一次提交时间" />
    </el-table>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */
/* eslint-disable key-spacing */

export default {
  data() {
    return {
      // 表格数据
      tableData: [
        {
          index: 1,
          number: "0000000001",
          name: "王晶",
          higest: "100",
          times: 1,
          lasttime:"2021-07-31"
        },
        {
          index: 2,
          number: "B18030219",
          name: "许致远",
          higest: "98",
          times: 3,
          lasttime:"2021-08-01"
        },
        {
          index: 3,
          number: "B18030316",
          name: "包宇豪",
          higest: "96",
          times: 2,
          lasttime:"2021-07-30"
        },
      ],
      exporturl: ''
    }
  },
  created() {},
  methods: {
    // 刷新数据
    refresh() {
      this.$message({
        message: "暂未开放！",
        type: "warning",
      });
    },
    // 导出
    exportExcel() {
      this.$message({
        message: "暂未开放！",
        type: "warning",
      });
      /* 前端导出 */
      // var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      // var wb = XLSX.utils.table_to_book(
      //   document.querySelector("#outTable"),
      //   xlsxParam
      // ); //outTable为列表id
      // // console.log(wb.Sheets.Sheet1);
      // var wbout = XLSX.write(wb, {
      //   bookType: "xlsx",
      //   bookSST: true,
      //   type: "array",
      // });
      // try {
      //   FileSaver.saveAs(
      //     new Blob([wbout], { type: "application/octet-stream;charset=utf-8" }),
      //     "data.xlsx"
      //   );
      // } catch (e) {
      //   if (typeof console !== "undefined") console.log(e, wbout);
      // }
      // return wbout;
      /* 后段导出 */
      // const that = this
      // console.log(that.exporturl)
      // that
      //   .request(that.exporturl, {}, 'GET', {}, 'blob')
      //   .then((res) => {
      //     console.log(res)
      //     if (!res) return
      //     const blob = new Blob([res.data], {
      //       type: 'application/vnd.ms-excel;charset=utf-8'
      //     })
      //     const url = window.URL.createObjectURL(blob)
      //     const aLink = document.createElement('a')
      //     aLink.style.display = 'none'
      //     aLink.href = url
      //     aLink.setAttribute('download', 'data.xlsx')
      //     document.body.appendChild(aLink)
      //     aLink.click()
      //     document.body.removeChild(aLink)
      //     window.URL.revokeObjectURL(url)
      //   })
      //   .catch((res) => {
      //     that.$message({
      //       message: res.response.data.message,
      //       type: 'error'
      //     })
      //   })
    }
  }
}
</script>
<style lang="scss">
.Table {
  padding: 10px;
  display: flex;
  flex-direction: column;
  .head-btn {
    display: flex;
    flex-direction: row;
    margin: 0 0 10px 0;
    .refresh {
        .el-button {
          padding: 0 10px;
          height: 30px;
          border-radius: 5px;
          font-size: 14px;
          width: 75px;
          border: 1px solid #409eff;
          color: #409eff;
        }
        &:last-child{
          margin-left: 10px;
        }
      }
  }

  .tablestyle {
    // border: 1px solid red;
    &::before {
      display: none;
    }
    .el-table__header {
      th {
        text-align: center;
        background-color: #fafafa;
        border: 1px solid #e9ecf2;
        .cell {
          font-size: 15px;
        }
      }
    }
    .el-checkbox__inner {
      width: 16px;
      height: 16px;
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 4px;
    }
    .el-checkbox__inner::after {
      left: 5px;
    }
    .el-table__body {
      td {
        text-align: center;
        border-right: 1px solid #dddddd;
        .cell {
          color: #333;
        }
      }
    }
  }
}
</style>
