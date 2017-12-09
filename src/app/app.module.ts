import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//组件
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
//优惠卷
import { CouponPage } from '../pages/coupon/coupon';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * app service
 */
import { LocationService } from '../common/service/LocationService';//定位服务
import { BrowserService } from '../common/service/BrowserService';
import { URLService } from '../common/service/URLService';
import { NativeService } from "../common/service/NativeService";
import { HttpService } from "../common/service/HttpService";
import { DateService } from "../common/service/DateService";
import { PriceService } from '../common/service/PriceService';
import { HttpIntercept } from "../common/intercept/HttpIntercept";
import { HttpInterceptHandle } from "../common/intercept/HttpInterceptHandle";

/**
 * app pipe
 */
import { DictPipe } from "../common/pipe/DictPipe";
import { MomentPipe } from "../common/pipe/MomentPipe";
import { PricePipe } from "../common/pipe/PricePipe";
/**
 * http
 */
import { Http, XHRBackend, RequestOptions, HttpModule, JsonpModule } from '@angular/http';
/**
 * 乘客
 *  as 为断言写法，类似类型转换
 */
import { ListPage as PassengerListPage } from '../pages/passenger/list/list';
import { FormPage as PassengerFormPage } from '../pages/passenger/form/form';


export function httpFactory(backend: XHRBackend,
  defaultOptions: RequestOptions,
  httpInterceptHandle: HttpInterceptHandle
):Http{
  return new HttpIntercept(backend, defaultOptions, httpInterceptHandle);
}


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,//底部tab
    PassengerListPage,//乘客list
    PassengerFormPage,//乘客表单
    CouponPage,
     //pipe 管道
    MomentPipe,
    PricePipe,
    DictPipe
  ],
  /**
   * 如果组件、指令或管道出现在模块的imports数组中，不要把它声明在declarations数组中。 
   * 如果它是你自己写的，并且属于当前模块，就要把它声明在declarations数组中。
   */
  imports: [
    BrowserModule,
    FormsModule,
    JsonpModule,
    // ToastController,
    HttpModule,
    IonicModule.forRoot(
      MyApp,
      {	//整体配置
        backButtonText: ' ',
        mode: 'ios',//统一样式 md为安卓，ios
        iconMode: 'ios',
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        pageTransition: 'ios'
      },
      {	//路由配置 （{ component: 页面, name: '路由名', segment: '路径:lineId(‘:’后为参数)' }）DeepLinker
        links: [
          //测试start
          //当点击返回的时候，应该返回首页。所以Ionic2提供了defaultHistory参数，如果页面历史堆栈中不存在历史页面的时候，就会返回到这个页面。
         // { component: DetailPage, name: 'Detail', segment: 'detail/:user', defaultHistory: [HomePage] },

          // { component: InterOrderDetailPage, name: 'InterOrderDetailPage', segment: 'detailPage' },
          // { component: CouponPage, name: 'Coupon', segment: 'coupon' },
          // { component: CouponTipPage, name: 'CouponTip', segment: 'couponTip' },
          // { component: SelectDatePage, name: 'select-date', segment: 'select-date' },
          // { component: SametOrderDetailPage, name: 'sametorderdetail', segment: 'sametorderdetail' },
          // { component: StationDetailPage, name: 'stationdetail', segment: 'stationdetail' },
          // { component: PassengerListPage, name: 'Plist', segment: 'plist' },
          // { component: PassengerFormPage, name: 'Pform', segment: 'pform' },
          //测试end
        ]
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,//底部tab
    PassengerListPage,//乘客list
    PassengerFormPage,//乘客表单
    CouponPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    URLService,
    NativeService,
    HttpService,
    DateService,
    PriceService,
    HttpIntercept,
    BrowserService,
    LocationService,
     //自定义
    HttpInterceptHandle,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: Http,
      useFactory: httpFactory,
      /*(
        backend: XHRBackend, 
        defaultOptions: RequestOptions, 
        httpInterceptHandle: HttpInterceptHandle) => {
        return new HttpIntercept(backend, defaultOptions, httpInterceptHandle);
      },*/
      deps: [XHRBackend, RequestOptions, HttpInterceptHandle]
    }
  ]
})
export class AppModule {}
