ERROR in vendor.cc7a69996de8e4edcabc.bundle.js from UglifyJs
Unexpected token: punc ()) [vendor.cc7a69996de8e4edcabc.bundle.js:136608,20]

类似这样的错误，八成是在项目的某一个JS（非编译后，最大可能是第三方的JS）中使用的
大于 es5 (如 es6, es2015/6/7) 的语法，造成在编译压缩时报错！！