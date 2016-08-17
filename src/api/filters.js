import Vue from 'vue';

/*
    限制七牛cdn的图片大小 ——
        参数 ——
            value： 图片url,
            w: 限制图片的width
            h：限制图片的height
        返回 ——
            限制图片后的url

    使用方式 —— 
        {{data | image-view 'auto' '230'}}

    说明 ——
        已把'img-filter'过滤器封装在内
*/
Vue.filter('image-view', (value, w, h) => {

    const imgFilter = Vue.filter('img-filter')(value);

    if (imgFilter == value){
        if (w === 'auto'){
            return value + '?imageView2/1/h/' + h+'/interlace/1';

        } else if (h === 'auto'){
            return value + '?imageView2/2/w/' + w+'/interlace/1';

        } else {
            return value + '?imageView2/1/w/' + w + '/h/' + h+'/interlace/1';
        }
    } else {
        
        return imgFilter;
    }

    
});

/*
    img filter, 当值为空时调用此base64
        返回 ——
            若值不是正常的图片url，则返回默认的base64

        使用方式 —— 
            {{data | img-filter}} 

        说明 ——
            'image-view'已把'img-filter'过滤器封装在内
*/

Vue.filter('img-filter', (value) => {
    if(!value || value.toString().search('http://') ==-1){
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=='
;
    } else {
        return value;
    }
});

/*
    格式化游戏名列表字符串 ——
        参数 ——
            value：字符串 如："天子 死神觉醒 功夫熊猫 风云 鉴定鉴定"

*/
Vue.filter('game-list', (value) => {
    return value.split(' ').join(' | ');
});

/*
    格式化数字，数字过大用k或w作单位 ——
        参数 ——
            value： 数字或内容是数字的字符串
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{data | format-unit}}
*/
Vue.filter('format-unit', (value) => { 
    if (value >= 1000 && value < 10000){
        return (value/1000).toFixed(2) + 'k';

    } else if (value >= 10000) {
        return (value/10000).toFixed(3) + 'w';
    }
});

/*
    格式化数字，逢千位加逗号 ——
        参数 ——
            value： 数字或内容是数字的字符串
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{data | format-thousands}}
*/
Vue.filter('format-thousands', (value) => { 
    
    if (value){
        return value.toString().replace(/\d+?(?=(?:\d{3})+$)/img, "$&,");
    } else {
        return 0;
    }
    
});


/*
 将带有表情的字符串转化为表情图片 ——
 参数 ——
 str：字符串
 返回 ——
 格式化后的字符串

 使用方式 ——
 {{data | face-img}}
 */
Vue.filter('face-img', (str) => {
    const facePath = 'http://app.52tt.com/face/';
    str = str.replace(/\[(f[0-9][0-9][0-9])\]/g,'<img data-face="$1" src="' +facePath +'$1.png" />');
    str = str.replace(/\[(t[0-9][0-9][0-9])\/\W+\]/g,'<img src="' +facePath +'$1.png" />');
    return str
});

/*
 将带有type的类型转化为title ——
 参数 ——
 str：字符串
 返回 ——
 格式化后的字符串

 使用方式 ——
 {{type | type-title type-list}}
 */
Vue.filter('type-title', (type,value) => {
    let title;
    let value_title = {};
    if(type == 0 || type ==null || !value){
        return '暂无类型'
    }else{
        value_title = _.filter(value,(item)=>{
            return item.type == type
        })
        try{
            title = value_title[0].title
        }catch(e){
            title = '暂无类型'
        }
        return title
    }
})
/*
 将带有guild_id的公会 ——
 参数 ——
 str：字符串
 返回 ——
 返回带有公会头像的链接

 使用方式 ——
 {{guild_id | guild-img }}
 */
 Vue.filter('guild-img',(item) => {
    let guild_img;
    if(!item){
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=='
    }
    guild_img = 'http://app.52tt.com/api/face?account='+item+'@guild'
    return guild_img
 });