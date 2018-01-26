### 0.0.8 ng-zorro updated modify file structure

### 0.0.9 remove handsontableModule and update @angular/cli@1.4.2

### 0.1.0 add ReqServices.setHeaders with HttpInterceptor

### 0.1.1 fixed node compile scss error with mn-echarts.scss

### 0.1.2 mn-col add wrapper of div.mn-col-content

### 0.1.3 【MnReqModule】 remove mn-req-resource, resource merge mn-req-http

### 0.1.4 【MnReqModule】 fixed bugs: resource get params and payload

### 0.1.5 【MnEchart】 fixed bug when rotate = 0 then interval = 0；

### 0.1.6 【SCSS ANALYSIS】 scss analysis not support /deep/ then change ::ng-deep

### 0.1.7 modify file name with 'mn'

### 0.1.8 every box support hph (height percent hundred) && mn-echart result add source

### 0.1.9 ReqInterceptor with reqCatch, reqError handling exceptions

### 0.1.10 ReqInterceptor setHeaders of value support function

### 0.2.0

* LoaderBar process ued best
* Echart legend cover chart optimization algorithm
* Echart series (result) out ref, chart, width, height, options, source, dataView
* Echart series register event
* Echart listener parent dom resize then chart.resize()
* Echart support set colors_map and colors
* Rule fixed bugs with set default value
* Fixed bugs repeat hph setting

# 0.2.1

* LoaderBar can target
* LoaderBar can set style
* Echart can set base colors
* Echart set config with def tools

* b3: roll back  echarts 3.6.2 && echart-worldcloud 1.1.0 && zrender 3.5.2 fixed textStyle no work and hover blink
* b4: Resolve echart using 'setOptions' to change options when 'tooltip.formatter' inherits old values

# 0.2.2

* Echart support sort by rate
* Rate sort then yAxis before zero
* b1: fixed bug -> Echart setOptions no merge
* b2: fixed bug -> Echart default calc _rate, _precent

# 0.2.3

* Echart panel toolbar sort support by total && clear
* Fixed Echart color calc error

* b1: fixed bugs with mnReq noData status no change

# 0.2.4

* MnReqNoDataComponent adjust style
* b1: Echart download filename add timestamp
* b3: 修正echart panel下载文件中中文乱码
* b4: 修正词云快速设置option时，nomerge失效造成词云重叠 （升级echarts以及相关架包）
* b5: 饼图自动排序
* b6: 饼图自动排序, 可以设置排序顺序

# 0.2.5

* Panel Toolbar add tooltip
* b1: 修正mnReq空数据没有状态返回
* b1: 修正colorMap, color key不区分大小写
* b2,3,4: 修正fonts样式\e第三方js不能正确解析
* b5 i18nService add byText

* 0.2.6 / 0.2.7

* 发布 datetimepicker
* b4: rule 支持 使用 let call result info

* 0.2.8

* 整合内部各services对外统一出口 MnCommonService
* MnReq 支持配置noDataComponent

* b1: 调整 drop-down 样式，避免出现滚动条; 修改loader zIndex，避免遮住dropDown
* b2: 调整 drop-down 样式，使其适应屏幕宽度
* b3: 1. 调整 echart width 计算值，宽度为某个小数的时候，浏览器会四舍五入计算到一位小数，这样就造成最终计算mn-col的宽度的时候，大于mn-fill的宽度值
* b4: 2. fixed loaderStyles 不能正常工作

* 0.2.9
* 添加 mnTooltip
* 移除 ng-zorro
* b1: 修改 panel 的 toolbar 与 title 的布局关系

0.2.10
* 修正 mn-col 会被content部分撑破宽度，并重写其关联css样式

0.3.2
* update angular 5

0.3.3

* instead http to httpClient
* rewrite ReqInterceptor
* mn-req change req add unsubscribe
* 修正在EchartServices被除数为0的情况

0.3.4

* fixed set req.header value no undefined
* rewrite mnResource (URLSearchParams -> HttpParams)

0.3.5

* 修正 mnResource post | patch 等方法 params 的传递方式

0.3.6, 0.3.7, 0.3.8

* 添加 echart type for map

0.3.9 - 0.3.13

* 修正 mnReq 支持空传data属性的数据变化
* 修正 mnReq 支持 no restful 返回数据类型变化
* .publish 不再主动提交到 git

0.3.14

* 修正 mnReq nodata error

0.3.15

* 修正 datetimepicker minDate change no render
* 修正 mnEchartPanel nodata series.type error

0.3.16

* 修正 mnEchartPanel toolbar reload 在 not req 时显示

0.3.17

* 添加module -> mnGutter
* 将mnGutter融入mnReq
* mnEchartPanel设置是否显示mnGutter -> mnShowGutter

0.3.18

* 添加module -> mnAppend, mnPrepend
* mnEchartPanel 支持 mnAppend, mnPrepend

0.3.19

* 添加module -> mnAlert, mnNotity, mnModal
* 添加services mnModalService

0.3.21

* MnDatePicker v2.0.0 发布，暂时只支持 days