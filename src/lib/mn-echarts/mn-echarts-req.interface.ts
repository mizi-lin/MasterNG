export interface MnEchartsReq {
    // 异步调用链接
    url?: string;
    // -> method ::: ajax request method; api 和 url 不能同时赋值
    method?: string;
    // -> params ::: ajax.get params
    params?: any;
    // -> payload ::: ajax.post[put, patch] data
    payload?: any;

    // -> api ::: resource api 接口方法; api 和 url 不能同时赋值
    api?: string;
}
