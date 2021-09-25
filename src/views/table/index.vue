<template>
  <div class="Table">
    <div class="head-btn">
      <div class="refresh">
        <el-button icon="el-icon-refresh" @click="refresh">刷新 </el-button>
      </div>
      <div class="refresh">
        <el-button icon="el-icon-download" @click="exportExcel">导出
        </el-button>
      </div>
    </div>
    <!-- table -->
    <el-table id="outTable" ref="multipleTable" :data="tableData" tooltip-effect="dark" stripe class="tablestyle"
      style="width: 100%">
      <el-table-column prop="index" label="序号" width="70" />
      <el-table-column prop="name" label="学生姓名" />
      <el-table-column prop="id" label="学生学号" />
      <el-table-column prop="score" label="最高分数" />
      <el-table-column prop="counter" label="剩余次数" />
    </el-table>
    <div class="PagesCurb">
      <el-pagination class="pages" :currentPage="currentPage" :page-size="10" layout="total, prev, pager, next"
        :total="total" @current-change="handleCurrentPage" />
    </div>
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
        tableData: [],
        total: 0,
        currentPage:0,
        exporturl: "teacher/excel_export",
      };
    },
    created() {
      this.refresh();
    },
    methods: {
      // 刷新数据
      async refresh() {
        let that = this;
        that.tableData = [];
        that.total = 0;
        let url = "teacher/queAllInfo?page=" + 1;
        await that.request(url, {}, "GET", {}).then((res) => {
          that.total = res.data.count;
          for (let i = 0; i < res.data.data.length; i++) {
            // for (let i = 0; i < 10; i++) {
            let obj = {};
            obj.index = i + 1;
            obj.id = res.data.data[i].id;
            obj.name = res.data.data[i].name;
            obj.score = res.data.data[i].score;
            obj.counter = res.data.data[i].counter;
            that.tableData.push(obj);
          }
          this.$message({
            message: "数据已更新",
            type: "success",
          })
        }).catch((res) => {
          this.$message({
            message: "数据请求失败",
            type: "error",
          })
        });
        that.currentPage=1;
      },
      // 导出
      exportExcel() {
        let that = this;
        that
          .request(that.exporturl, {}, 'GET', {}, 'blob')
          .then((res) => {
            that.$message({
              message: "请求成功！请稍候.......",
              type: 'success'
            })
            if (!res) return
            let blob = new Blob([res.data], {
              type: 'application/vnd.ms-excel;charset=utf-8'
            })
            let url = window.URL.createObjectURL(blob)
            let aLink = document.createElement('a')
            aLink.style.display = 'none'
            aLink.href = url
            aLink.setAttribute('download', '学生答题情况.xls')
            document.body.appendChild(aLink)
            aLink.click()
            document.body.removeChild(aLink)
            window.URL.revokeObjectURL(url)
          })
          .catch((res) => {
            that.$message({
              message: res.response.data.message,
              type: 'error'
            })
          })
      },
      async handleCurrentPage(val) {
        let that = this;
        that.tableData = [];
        that.total = 0;
        let url = "teacher/queAllInfo?page=" + val;
        await that.request(url, {}, "GET", {}).then((res) => {
          that.total = res.data.count;
          for (let i = 0; i < res.data.data.length; i++) {
            let obj = {};
            obj.index = i + 1;
            obj.id = res.data.data[i].id;
            obj.name = res.data.data[i].name;
            obj.score = res.data.data[i].score;
            obj.counter = res.data.data[i].counter;
            that.tableData.push(obj);
          }
          this.$message({
            message: "数据已更新",
            type: "success",
          })
        }).catch((res) => {
          this.$message({
            message: "数据请求失败",
            type: "error",
          })
        });
        that.currentPage=val;
      }
    },
  };
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

        &:last-child {
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

          &:first-child {
            border-left: 1px solid #dddddd;
          }

          .cell {
            color: #333;
          }
        }
      }
    }

    .PagesCurb {
      margin-top: 20px;

      .pages {
        // border: 1px solid red;
        text-align: center;
      }
    }
  }
</style>
