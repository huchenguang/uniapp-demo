import Mpi from './mpi'
let page = {
  data() {
    return {
      emptyType: -1, // 0正确,1空,2错误
      isNoMore: false, // 没有更多
      errMsg: '暂无数据',
      pageIndex: 1,
      pageSize: 15,
      isLoad: true, // 是否加载
      isPull: false, // 是否下拉刷新
      isReach: false, // 是否上拉加载
      isFrefresh: false, // 是否加载数据中
      isFirstLoad: true, //是否第一次加载
      isEnabledReachBottom: true, //是否启动上拉加载
      loadOptions: {}, //加载参数
      themeColor: '',
    };
  },
  computed: {
    //ios底部安全区域
    safeAreaBottom() {
      let info = Mpi.getSystemInfoSync();
      let safe = 20;
      if (
        info && ['devtools', 'ios'].includes(info.platform) &&
        info.statusBarHeight > safe
      ) {
        return info.statusBarHeight - safe;
      }
      return 0;
    },
  },
  methods: {
    //获取数据列表
    getDataList(res) {
      let list = [];
      if (typeof res == 'object') {
        let pi = res.PageIndex || 0;
        let pc = res.PageCount || 0;
        if (Object.prototype.toString.call(res) == '[object Array]') {
          //data是数组
          console.log("xxx",res)
          list = res;
        } else if (
          Object.prototype.toString.call(res.DataSet) == '[object Array]'
        ) {
          //DataSet是数组
          list = res.DataSet;
        }

        if (list.length > 0) {
          //正常列表数据
          this.pageIndex += 1;
          this.emptyType = 0;
          this.isNoMore = pi >= pc;
        } else {
          if (this.pageIndex <= 1) {
            //第1页时显示空
            this.emptyType = 1;
            this.isNoMore = false;
          } else {
            //不是第1页显示没有更多
            this.emptyType = 0;
            this.isNoMore = true;
          }
        }
      }
      return list;
    },
    onLoadPage (options) {
      this.onPageLoad (options);
    },
    onPageLoad (options) {
      //页面加载 页面使用该函数会覆盖此函数
      if (this.isPull) {
      }
    },
    onPullDownRefresh () {
      this.onPullDownRefreshPage()
    },
    onPullDownRefreshPage(){
      //下拉刷新
      //需要在 page.json 文件设置"enablePullDownRefresh": true
      this.isLoad = false;
      this.isPull = true;
      this.isReach = false;
      this.pageIndex = 1;
      this.isNoMore = false;
      this.isFrefresh = true;
      this.onLoadPage (this.loadOptions);
    },
    onReachBottom () {
      this.onReachBottomPage()
    },
    onReachBottomPage () {
      if (this.isEnabledReachBottom) {
        if (!this.isNoMore && !this.isFrefresh) {
          //底部上拉加载更多
          this.isLoad = false;
          this.isPull = false;
          this.isReach = true;
          this.isFrefresh = true;
          this.onLoadPage (this.loadOptions);
        }
      }
    },
    onShow () {
      this.onShowPage ();
    },
    onShowPage () {
      if (!this.isFirstLoad) {
        // let route = this.$util.getCurrentRoute ();
        // if (this.$util.doIsRefreshPage (route)) {
        //   this.onPullDownRefresh ();
        // }
      } else {
        this.isFirstLoad = false;
      }
    },
  },

  onLoad (options) {
    //请直接使用methods的onPageLoad函数
    this.loadOptions = options;
    this.isLoad = true;
    this.isPull = false;
    this.isReach = false;
    this.isFrefresh = true;
    this.onLoadPage (options);    
  },
}
export default page;