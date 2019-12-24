<template>
	<view class="dt-page">
		<button class="login" open-type="getUserInfo" @getuserinfo="tapGetUserInfo">登录</button>
		<button class="login" open-type="getPhoneNumber" @getuserinfo="tapGetPhoneNumber">获取手机号</button>
		<button class="login" @tap="showDlg">显示对话框</button>
    <AlertDialog :visible="dialogVisible" @onTapOutSide="onTapOutSide">
      <text style="background-color:#fff" >hahahhaha</text>
    </AlertDialog>
	</view>
</template>

<script>
  import AlertDialog from '../comps/alert_dialog'
	export default {
    components:{
      AlertDialog
    },
		data() {
			return {
        title: '我的',
        authSetting:{},
        authUserInfo:{},
        dialogVisible:false
			}
		},
		methods: {
      showDlg(){
        this.dialogVisible = true
      },
      onTapOutSide(){
        this.dialogVisible = false
      },
      async tapGetUserInfo(e){
        console.log('tapGetUserInfo',e)
        this.authUserInfo = e.detail
        let authSetting = await this.$api.wxGetSetting()
        console.log('authSetting',authSetting)
        //获取授权了
        if(authSetting&&authSetting['scope.userInfo']){
          //去登录
          let respLogin = await this.$api.wxLogin()
          console.log('respLogin',respLogin)
          // 此处重新从接口获取用户信息，原因是：执行了wx.login之后，用户信息使用了新的
          // session_key进行加密，故需要重新从接口获取重新加密的用户数据
          let userInfo = await this.$api.wxGetUserInfo()
          console.log('userInfoxx',userInfo)
          let res = await this.$api.loginByJSCode({
            iv:userInfo.iv,
            extry_data:userInfo.encryptedData,
            jscode:respLogin.code,
          })
          console.log("resxxx",res)
        }
      },
      async tapGetPhoneNumber(e){
        console.log('tapGetPhoneNumber',e)
        let respMobile = await this.$api.getUserPhoneByJSCode({
          iv: e.detail.iv,
          extry_data: e.detail.encryptedData,
          jscode: loginCodeRes.code
        })
        console.log("respMobile",respMobile)
      }
		}
	}
</script>

<style>
	.login{
    margin-top: 20upx;
  }
</style>
