

//==本JS是加载Lodop插件及CLodop服务的综合示例，可直接使用，建议看懂后融进自己页面程序==
// import { ElMessageBox } from 'element-plus'
// import { printStore as store } from 'store'
var CreatedOKLodopObject, CLodopIsLocal, CLodopJsState
CLodopIsLocal
//==判断是否需要CLodop(那些不支持插件的浏览器):==
export function needCLodop() {
    try {
        var ua = navigator.userAgent
        if (ua.match(/Windows\sPhone/i)) return true
        if (ua.match(/iPhone|iPod|iPad/i)) return true
        if (ua.match(/Android/i)) return true
        if (ua.match(/Edge\D?\d+/i)) return true

        var verTrident = ua.match(/Trident\D?\d+/i)
        var verIE = ua.match(/MSIE\D?\d+/i)
        var verOPR = ua.match(/OPR\D?\d+/i)
        var verFF = ua.match(/Firefox\D?\d+/i)
        var x64 = ua.match(/x64/i)
        if (!verTrident && !verIE && x64) return true
        else if (verFF) {
            verFF = verFF[0].match(/\d+/)
            if (verFF[0] >= 41 || x64) return true
        } else if (verOPR) {
            verOPR = verOPR[0].match(/\d+/)
            if (verOPR[0] >= 32) return true
        } else if (!verTrident && !verIE) {
            var verChrome = ua.match(/Chrome\D?\d+/i)
            if (verChrome) {
                verChrome = verChrome[0].match(/\d+/)
                if (verChrome[0] >= 41) return true
            }
        }
        return false
    } catch (err) {
        return true
    }
}

//==加载引用CLodop的主JS,用双端口8000和18000(以防其中一个被占):==
export function loadCLodop() {
    if (CLodopJsState == 'loading' || CLodopJsState == 'complete') return
    CLodopJsState = 'loading'
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
    var JS1 = document.createElement('script')
    var JS2 = document.createElement('script')
    // JS1.src = 'http://116.63.188.34:10152/CLodopfuncs.js?priority=1'
    JS1.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
    // JS2.src = 'http://116.63.188.34:10152/CLodopfuncs.js'
    JS2.src = 'http://localhost:18000/CLodopfuncs.js'
    JS1.onload = JS2.onload = function () {
        CLodopJsState = 'complete'
    }
    JS1.onerror = JS2.onerror = function () {
        CLodopJsState = 'complete'
    }
    head.insertBefore(JS1, head.firstChild)
    head.insertBefore(JS2, head.firstChild)
    CLodopIsLocal = !!(JS1.src + JS2.src).match(/\/\/localho|\/\/127.0.0./i)
}

export function loadLodop() {
    if (needCLodop()) {
        loadCLodop()
    }
} //加载
loadLodop()

//==获取LODOP对象主过程,判断是否安装、需否升级:==
export function getLodop(oOBJECT, oEMBED) {
    var LODOP
    try {
        var ua = navigator.userAgent
        var isIE = !!ua.match(/MSIE/i) || !!ua.match(/Trident/i)
        if (needCLodop()) {
            try {
                LODOP = getCLodop()
            } catch (err) {
                console.log(err)
            }
            if (!LODOP && CLodopJsState !== 'complete') {
                if (CLodopJsState == 'loading') ElMessageBox.alert('网页还没下载完毕，请稍等一下再操作', '提示')
                else ElMessageBox.alert('没有加载CLodop的主js，请先调用loadCLodop过程.', '提示')
                return false
            }
            if (!LODOP) {
                store.showControlMessage({
                    message: 'Web打印服务CLodop未安装启动，请下载安装包',
                    type: 'notInstalled',
                    file: 'CLodop_Setup_for_Win32NT',
                })
                return false
            } else {
                if (CLODOP.CVERSION < '4.1.2.7') {
                    store.showControlMessage({
                        message: 'Web打印服务CLodop需升级，请下载新的安装包',
                        type: 'needUpdate',
                        file: 'CLodop_Setup_for_Win32NT',
                    })
                }
                if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED) //清理旧版无效元素
                if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT)
            }
        } else {
            var is64IE = isIE && !!ua.match(/x64/i)
            //==如果页面有Lodop就直接使用,否则新建:==
            if (oOBJECT || oEMBED) {
                if (isIE) LODOP = oOBJECT
                else LODOP = oEMBED
            } else if (!CreatedOKLodopObject) {
                LODOP = document.createElement('object')
                LODOP.setAttribute('width', 0)
                LODOP.setAttribute('height', 0)
                LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;')
                if (isIE) LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA')
                else LODOP.setAttribute('type', 'application/x-print-lodop')
                document.documentElement.appendChild(LODOP)
                CreatedOKLodopObject = LODOP
            } else LODOP = CreatedOKLodopObject
            //==Lodop插件未安装时提示下载地址:==
            if (!LODOP || !LODOP.VERSION) {
                let tip
                if (ua.indexOf('Chrome') >= 0) tip = '如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装'
                if (ua.indexOf('Firefox') >= 0) tip = '注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它'
                store.showControlMessage({
                    message: '打印控件未安装，请下载安装包',
                    type: 'notInstalled2',
                    file: is64IE ? 'install_lodop64' : 'install_lodop32',
                    tip,
                })
                return LODOP
            }
        }
        if (LODOP.VERSION < '6.2.2.6') {
            if (!needCLodop()) {
                store.showControlMessage({
                    message: '打印控件需要升级，请下载新的安装包',
                    type: 'needUpdate2',
                    file: is64IE ? 'install_lodop64' : 'install_lodop32',
                })
            }
        }
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):==
        LODOP.SET_LICENSES(
            '威海和信信息技术有限责任公司',
            '5ED2BBBD6615C31A13D3473032DB8A38',
            '威海和信信息技術有限責任公司',
            '8F2A36186C6C7A7423F45881DF8F73C2'
        )
        // LODOP.SET_LICENSES("", "EE0887D00FCC7D29375A695F728489A6", "C94CEE276DB2187AE6B65D56B3FC2848", "")
        // console.log(LODOP.VERSION);
        if (LODOP.VERSION > '6.1.4.5') {
            // LODOP.SET_LICENSES('THIRD LICENSE', '', 'Weihai Heshine Infomation Technology Co., LTD', '6EDA4BA6D91F667EEF29A5042FBC8DF4')
            // LODOP.SET_LICENSES("", "EE0887D00FCC7D29375A695F728489A6", "C94CEE276DB2187AE6B65D56B3FC2848", "")
            LODOP.SET_LICENSES(
                '威海和信信息技术有限责任公司',
                '5ED2BBBD6615C31A13D3473032DB8A38',
                '威海和信信息技術有限責任公司',
                '8F2A36186C6C7A7423F45881DF8F73C2'
            )
        }
        return LODOP
    } catch (err) {
        alert('getLodop出错:' + err)
        return false
    }
}
export default getLodop

// //用双端口加载主JS文件Lodop.js(或CLodopfuncs.js兼容老版本)以防其中某端口被占:
// var MainJS = "CLodopfuncs.js",
//   URL_WS1 = "ws://localhost:8000/" + MainJS,                //ws用8000/18000
//   URL_WS2 = "ws://localhost:18000/" + MainJS,
//   URL_HTTP1 = "http://localhost:8000/" + MainJS,              //http用8000/18000
//   // URL_HTTP1 = "http://http://3c7d6884.r15.cpolar.top/" + MainJS,              //http用8000/18000
//   URL_HTTP2 = "http://localhost:18000/" + MainJS,
//   URL_HTTP3 = "https://localhost.lodop.net:8443/" + MainJS;   //https用8000/8443

// //==检查加载成功与否，如没成功则用http(s)再试==
// //==低版本CLODOP6.561/Lodop7.043及前)用本方法==
// function checkOrTryHttp() {
//   if (window.getCLodop) return true;
//   var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
//   var JS1 = document.createElement("script")
//     , JS2 = document.createElement("script")
//     , JS3 = document.createElement("script");
//   JS1.src = URL_HTTP1;
//   JS2.src = URL_HTTP2;
//   JS3.src = URL_HTTP3;
//   JS1.onerror = function (e) {
//     if (window.location.protocol !== 'https:')
//       head.insertBefore(JS2, head.firstChild); else
//       head.insertBefore(JS3, head.firstChild);
//   }
//   JS2.onerror = JS3.onerror = function () {
//     var JSelf = document.createElement("script");
//     JSelf.src = "/" + MainJS; //JSelf让其它电脑通过本机打印（仅适用CLodop自带例子）
//     document.head.insertBefore(JSelf, document.head.firstChild);
//   }
//   head.insertBefore(JS1, head.firstChild);
// }

// //==加载Lodop对象的主过程:==
// (function loadCLodop() {
//     if (!window.WebSocket && window.MozWebSocket) window.WebSocket = window.MozWebSocket;
//     //ws方式速度快(小于200ms)且可避免CORS错误,但要求Lodop版本足够新:
//     try {
//         var WSK1 = new WebSocket(URL_WS1);
//         WSK1.onopen = function (e) { setTimeout("checkOrTryHttp()", 200); }
//         WSK1.onmessage = function (e) { if (!window.getCLodop) eval(e.data); }
//         WSK1.onerror = function (e) {
//             var WSK2 = new WebSocket(URL_WS2);
//             WSK2.onopen = function (e) { setTimeout("checkOrTryHttp()", 200); }
//             WSK2.onmessage = function (e) { if (!window.getCLodop) eval(e.data); }
//             WSK2.onerror = function (e) { checkOrTryHttp(); }
//         }
//     } catch (e) {
//         checkOrTryHttp();
//     }
// })();

// //==获取LODOP对象的主过程:==
// function getLodop(oOBJECT, oEMBED) {
//   var LODOP;
//   try {
//     LODOP = window.getCLodop();
//     if (!LODOP && document.readyState !== "complete") {
//       alert("C-Lodop没准备好，请稍后再试！");
//       return;
//     }
//     //清理原例子内的object或embed元素，避免乱提示：
//     if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
//     if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
//     return LODOP;
//   } catch (err) {
//     alert("getLodop出错:" + err);
//   }
// }



// export default getLodop