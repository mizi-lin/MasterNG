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