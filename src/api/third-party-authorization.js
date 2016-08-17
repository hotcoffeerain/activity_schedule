//认证
//参数, 跳转微信认证:url
export const authorizationAction = (url) => {

    const userAgent = navigator.userAgent.toLowerCase()

    //setCookieItem('vote',true,1);
    console.log(getCookieByName('vote'))
    //是否微信
    if(userAgent.match(/MicroMessenger/i) == "micromessenger") {

        let obj = {}
        obj.union_id = getCookieByName('union_id') //微信授权union_id
        obj.vote = getCookieByName('vote') // 是否可投票
        obj.vote_id = getCookieByName('vote_id') //投票女神id 
        obj.uid = getCookieByName('uid') //用户id
        obj.key = getCookieByName('key') // token值防刷

        if(obj.union_id){
            if(obj.vote){
                $$('.vote-btn').on('click',function(){
                    let vote_id = $$(this).attr('data-vote-id'); //从页面上获取投票女神id
                    if(vote_id){
                       obj.vote_id = vote_id;
                    }
                    const voteRequest = '/act/goddess/my_votes' //投票请求参数
                    myApp.requestApi(voteRequest, obj, function(data){
                        //location.href = url //跳转到投票成功页
                        mainView.router.load({pageName: 'index-voted'});
                    })
                })
            }
        }else {
            //location.href = url
            myApp.alert('请下载TT语音客户端');
        }

    }else {
        return false
    }
}

//获取cookie值
const getCookieByName = (name) => {
    let arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)")
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2])
    }
    else return null
}

//设置cookie
const setCookie = (key, content) => {
    document.cookie = key.toString() + '='+ content.toString() 
}
//设置cookie 
//name (必要)要创建或覆盖的cookie的名字 (string)。value (必要)cookie的值 (string)。
//end (可选)过期时间小时算 (一年为31536e3， 永不过期的cookie为Infinity) ，或者过期时间的GMTString格式或Date对象; 
// path (可选)例如 '/', '/mydir'。domain (可选)例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com'。
// secure (可选)cookie只会被https传输 (boolean或null)。

const setCookieBytime  = (sKey,sValue,vEnd,sDomain,sPath,bSecure) =>{
    if(!skey ||  /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey) ) { return false; }
    let sExpires = '';
    if(vEnd){
        let Hours = vEnd || 1;
        let exp = new Date();
        exp.setTime(exp.getTime() + Hours*60*60*1000);//设置距当前时间后多少小时
        switch(exp.constructor){
            case Number:
                sExpires = exp === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + exp;
                break;
            case String:
                sExpires = "; expires=" + exp;
                break;
            case Date:
                sExpires = "; expires=" + exp.toUTCString();
                break;
        }
    }
    document.cookie = encodeURIComponent(skey)+'='+encodeURIComponent(sValue)+ sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
}
