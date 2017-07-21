# MasterNG

An Angular 4 i18n 

基于Angular4的国际化方案

## Dependencies

* [Angular](https://angular.io)

### module
```javascript
imports: [
    I18nModule
    // or 
    // I18nModule.forRoot()
]
````

### Component
```javascript
constructor(private $$I18nServices: $$I18nServices) {
    $$I18nServices.setConfig({
        prefix: '/demo/i18n',
        lang: 'en'
    });
}

// I18nConfig
export interface I18nConfig {
    prefix: string;
    lang?: string;
    suffix?: string;
    storageKey?: string;
}

lang default 'en';

````
    
###i18n resource        
```javascript
// en.json
// {0}, {1}, {name}
// 参数替换支持数组和对象
{
    "HELLO_WORLD": "Hello, World!!!",
    "HELLO_USER": "Hello, {0}!!!",
    "WELCOME_1": "Welcome {0} back to {1}, {0} last login in {2}",
    "WELCOME_2": "Welcome {name} back to {site}, {name} last login in {address.province}!!!",
    "WELCOME_3": "Welcome {name} back to {site}, {name} last login in {address.province} {0}!!!",
    "WELCOME": {
        "_3": "Welcome {name} back to {site}, {name} last login in {address.province} {0}!!!"
    }
}
```
###
```javascript
// 对象参数注意必须放在最后一个
this.$$I18nServices.getText((text) => {
    console.debug(text);
}, 'WELCOME._3', '2017-05-05', {
    name: 'mizi',
    address: {
        province: 'Shanghai'
    }
});
```

### Pipe
```html
<div>{{ 'HELLO_WORLD' | i18n }}</div>
<div>{{ 'HELLO_USER' | i18n: 'Mizi' }}</div>
<div>{{ 'WELCOME_1' | i18n:'Mizi':'i18n' }}</div>
<div>{{ 'WELCOME_1' | i18n:['Mizi','i18n'] : 'Shanghai' }}</div>
<div>{{ 'WELCOME_2' | i18n: userInfo }}</div>
<div>{{ 'WELCOME_3' | i18n: '2017-05-05' : userInfo }}</div>
<div>{{ 'WELCOME._3' | i18n: '2017-05-05' : userInfo }}</div>
```

### Directive
```html
<div [i18n]>HELLO_WORLD</div>
<div [i18n]="'Mizi'">HELLO_USER</div>
<div [i18n]="['Mizi', 'i18n']">WELCOME_1</div>
<div [i18n]="[['Mizi', 'i18n'], 'Shanghai']">WELCOME_1</div>
<div [i18n]="['2017-05-05', this.userInfo]">WELCOME._3</div>
```






