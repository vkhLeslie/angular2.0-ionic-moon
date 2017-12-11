## 技术栈：

angular2.0 + ionic2.0 + rxjs  + sass + ES6/7 + webpack + typescript + tslint


>angular2.0-ionic-moon

>ionic2 moon app

>node的版本要求大于6

>npm install -g cordova ionic

## Build Setup

# 安装依赖：
npm install或cnpm install
# 如果npm安装依赖报错，改cnpm(淘宝镜像)安装

# 启动项目：
ionic serve

# 常见错误
1.Typescript Error
Class 'Subject<T>' incorrectly extends base class 'Observable<T>'. Types of property 'lift' are incompatible. Type '<R>(operator: Operator<T, R>) => Observable<T>' is not assignable to type '<R>(operator: Operator<T, R>) => Observable<R>'. Type 'Observable<T>' is not assignable to type 'Observable<R>'. Type 'T' is not assignable to type 'R'.
解决方案：1.更换Typescript版本 cnpm install typescript@2.6.1 --save-dev 确保与"rxjs": "5.5.2",版本对应
         2.在tsconfig.json文件的compilerOptions对象中添加属性"noStrictGenericChecks": true,"skipLibCheck": true,    

或参考 https://stackoverflow.com/questions/44793859/rxjs-subject-d-ts-error-class-subjectt-incorrectly-extends-base-class-obs

# 打包项目
npm run build //测试
npm run ionic:build --prod//生产

# 安卓环境中：
ionic cordova platform add android(ios)   //加入到安卓中
ionic cordova  build android  //打包

ionic run android  //真机

ionic emulate android  //虚拟机
 
ionic cordova platform rm ios(android)
ionic cordova platform remove android
ionic cordova platform add android
ios也一样，将android改成ios

另外
ionic serve   //在浏览器上运行，自动会打开浏览器


#Deploying to a Device
ionic cordova run android --prod --release
# or
ionic cordova build android --prod --release
成功apk路径
/ionic-angular4/platforms/android/build/outputs/apk/android-debug.apk

#生成签名
keytool -genkey -v -keystore my-release-key.keystore -alias moon(应用名) -keyalg RSA -keysize 2048 -validity 10000
建议使用 "keytool -importkeystore -srckeystore my-release-key.keystore -destkeystore my-release-key.keystore -deststoretype pkcs12" 迁移到行业标准格式 PKCS12。
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks android-release-unsigned.apk my-alias
#签名应用文件
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore demo.keystore test.apk moon(应用名)
zipalign -v 4 android-release-unsigned.apk HelloWorld.apk
apksigner verify HelloWorld.apk

```
# 一、添加android平台(其他框架与项目)
cordova  create  test  com.cordova.test   test  （创建cordova工程  <文件夹名> <包名> <app名>）@6.0.0
终端项目目录下输入命令：cordova platform add android(添加)，cordovaplatform remove android(移除)，添加之后，在项目目录的platforms下会生成一个android文件夹。
# 二、cordova编译应用
执行命令：cordova build --release android，使用build命令编译应用的发布版本，这个过程需要你的android sdk和环境变量、java jdk和环境变量、android的gradle配置没有错误。说一下gradle的配置：到http://www.androiddevtools.cn/，添加环境变量PATH=D:\gradle-3.5\bin，输入命令gradle -v查看是否安装成功。编译成功之后，在项目路径的\platforms\android\build\outputs\apk下会生成一个还未签名的apk文件，我把它重新命名为test.apk，这个时候的apk还不能被安装到手机上。
# 三、生成签名文件
执行命令：keytool -genkey -v -keystore demo.keystore -alias moon -keyalg RSA -keysize 2048 -validity 10000，输入的密码要记住，其他姓名地区等信息随便填吧，最好还是记住，成功之后在主目录下就生成了demo.keystore文件，命令中demo.keystore是生成文件的名字，moon 是别名，随便起但是要记住，一会签名要用到，其他信息如加密、有效日期等就不说了，无需改动。
四、签名应用文件
把在第二步生成的test.apk拷贝到与生成的keystore同一目录下，也就是项目的主目录下，执行命令：jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore demo.keystore test.apk moon，输入签名文件的密码，成功之后主目录下的test.apk就被签名成功了，会比原来未被签名的apk文件大一点，能够安装到手机或android虚拟机上了。

# ionic打包apk主要分为几个步骤：
第一、 打包
首先生成 release包
$ cordova build --release android # 记得加上--release 参数，不然会打出debug包
执行完这条命令后，cordova会根据你的config.xml生成一个未签名的apk包。在platform文件夹可以找到apk包（ platforms/android/ant-build ），接下来就可以签名了。
第二、生成安全钥匙
App签名需要用到安全钥匙，你可以用JDK的keytool工具生成，执行下面命令：
# 把my-release-key和alias_name换成你的名字
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
执行后需要回答一些问题，正常填写就好了
Enter keystore password:
Re-enter new password:
What is your first and last name?
[Unknown]: test
What is the name of your organizational unit?
[Unknown]: test
What is the name of your organization?
[Unknown]: test
What is the name of your City or Locality?
之后会生成一个your_name.keystore文件，这就是你的安全秘钥，记得要好好保管，下次更新应用要用到，丢失就大事了，你以后就甭想更新市场上的应用了。
第三、签名
使用JDK中的jarsigner工具为apk签名，命令如下：
# my-release-key和alias_name换成你的名字
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name
执行后会生成一个已签名成功的apk，也可以用这个包发布市场。

常见错误

1.Error: Your yargs-parser platform does not have Api.js
  解决方案：用cordova 6.0.0试试，npm install -g cordova@6.0.0
  解决方案：执行cordova platform add android --nofetch
2.Error: Please install Android target: "android-23".
Hint: Open the SDK manager by running: /home/al/Downloads/android-sdk-linux/tools/android
You will require:
1. "SDK Platform" for android-23
2. "Android SDK Platform-tools (latest)
3. "Android SDK Build-tools" (latest)

    解决方案：1.检查环境变量
               1.java环境
               2.android SDK
               3.gradle
               4.android studio
               D:\software\JAVA_Uitils\android-sdk-windows\tools
               D:\software\JAVA_Uitils\android-sdk-windows\platform-tools
               D:\software\JAVA_Uitils\gradle-4.3.1-bin\bin
               D:\software\JAVA_Uitils\android-sdk-windows
             2.打开android studio编辑器setting中找android sdk/sdk platsform 下载android(api)-23
```

# 文件结构
 
├── config
│   ├── helpers.js              ────── 配置入口文件
│   ├── webpack.common.js       ────── 公共的配置文件
├── src
│   ├── app    
│   │   │── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts        ────── 根组件
│   │   ├── app.module.ts     ────── 根模块  为Angular描述如何组装应用
│   │ 
├── |—— component ———————— 组件
├── |—— common ———————— 公共用件
│   │   ├── interface       ────── 定义接口
│   │   │   └── interface.ts
│   │   ├── service     ──────  服务
│   │   │    └── service.ts
│   │   ├── pipe     ────── 管道（过滤器）
│   │   │    └── pipe.ts
├── |—— data ———————— 数据，全局变量，常量
├── |—— theme ———————— 主题化，框架样式
│   ├── index.html      ────── 主页面
|   |————service-worker.js   ────── 项目的入口文件
|       ├── main.ts        
|       ├── polyfills.ts    ────── 在大多数现代浏览器中运行Angular程序时需要的标准填充物。
|       └── vendor.ts       ────── 我们需要的提供商文件：Angular、Lodash、bootstrap.css……
├── package.json        ────── 项目所有相关依赖信
├── CubeModule.json       ────── 配置了项目的信息，版本等
├── README.md   
|——config.xml  ———————— cordova的配置文件
├── tslint.json       ────── 配置了TypeScript代码检查配置
├── tsconfig.json       ────── 配置了TypeScript编译器的编译参数
└── webpack.config.js   ──────  webpack配置文件

# 遵循typeScript的语法
# 类名必须大写
```


