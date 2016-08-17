//定义全局的computd计算属性换算等方法
//引用computed.xx
//js截取字符串，中英文都能用  
//如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。  
//字符串，长度  
/** 
     * 使用方法 xx.chartStr(str,len)
     * js截取字符串，中英文都能用 
     * @param str：需要截取的字符串 
     * @param len: 需要截取的长度 
     */
export const  chartStr = (str, len)=>{
    let str_length = 0;
    let str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (let i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4  
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；  
    if (str_length < len) {
        return str;
    }
}
/*
    筛选女神榜单列表
        参数 ——
            value： 总女神榜单列表
            type： 女神类型
            rank: 榜单类型
        返回 ——
            过滤后的女神榜单列表

    使用方式 ——
    xx.chartRank.(value,rank,type)   
*/
export const chartRank = (value,rank,type)=>{

 if(rank == 0 || rank == null || !value){
        return  value
  }else{

    //过滤掉未投票的&&榜单内未有排名的
    var value = _.filter(value, (item)=>{
        return item.ranking.votes
    });
    if(type == 0 || type == null){
        switch(rank){
            case 1 : //小时榜
                var value_sortby = _.sortBy(value,(item)=>{
                    return item.ranking.rank_by_hour
                })
                break;
            case 2 : //日榜
                var value_sortby = _.sortBy(value,(item)=>{
                    return item.ranking.rank_by_day
                })
                break;
            case 3 : //总榜
                var value_sortby = _.sortBy(value,(item)=>{
                    return item.ranking.rank
                })
                break;
        }
    }else{

      var value_type = _.filter(value,(item)=>{
            return item.profile.type == type
      });

      switch(rank){
        case 1 :
            var value_sortby = _.sortBy(value_type,(item)=>{
                return item.ranking.rank_by_hour
            })
            break;
        case 2 :
            var value_sortby = _.sortBy(value_type,(item)=>{
                return item.ranking.rank_by_day
            })
            break;
        case 3 :
            var value_sortby = _.sortBy(value_type,(item)=>{
                return item.ranking.rank
            })
            break;
        }
    }
    let value_sortby = value_sortby.slice(0,50)
        return value_sortby

    }
}
/*
    过滤女神动态
*/
export const GoddessPost = (value, {type = 0, goddess_id = 0}) => {

    value = _.sortBy(value, function (item){
        return - item.time;
    });

    if (goddess_id){

        let tmpList =  _.filter(value, (item) => {
            return item.uid == goddess_id;
        });
        return tmpList;

    } else {

        if (type){
            let tmpList =  _.filter(value, (item) => {
                return item.type == type;
            });
            return tmpList;

        } else {
            // let tmpList =  _.filter(value, (item) => {
            //     return item.uid !== 0;
            // });
            // return tmpList;
            return value;

        } 
    }
}
/*
    过滤单个女神秀
*/
export const GoddessSingleState = (value, goddess) => {

    if (goddess){
        let tmpList =  _.filter(value, (item) => {
            return item.profile.uid == goddess;
        });

        if (!tmpList.length){
            return false;
        } else {
            return tmpList[0];
        }

    } else {
        return false;
    }

}

/*
    筛选女神类型之间的type&title转换
        参数 ——
            value:女神类型列表
            type(number):女神类型
        返回 ——
            过滤后的title(string): 女神类型

    使用方式 ——
    xx.chartRechargeType.(type)   
*/
export const chartRechargeType = (value,type) =>{
    if(type == 0 || type ==null || !value){
        return null
    }else{
        let value_title = _.filter(value,(item)=>{
            return item.type == type
        })
        let title = value_title[0].title
        return title
    }

}

/*
    筛选我已经投票的女神榜单列表
        参数 ——
            value： 总女神榜单列表
            my_votes: 榜单类型
        返回 ——
            过滤后的女神榜单列表

    使用方式 ——
    xx.chartMyRank.(value,my_votes)   
*/
export const chartMyRank = (value,my_votes) =>{
    if(!value){
        return null
    }else{
        let value_my = _.filter(value, function(item) {
          // return …
          return item.my_votes > 0
        });
        return value_my
    }
}

/*
    筛选获奖女神榜单列表
        参数 ——
            value： 总女神榜单列表
            type： 女神类型(全部类型种类 默认为 传入godess_type数组时可chartAllType使用方法先过滤)
            rank: 榜单类型(默认为3全部 不需要传)
            placedstart: 1
            placedend:3
        返回 ——
            过滤后的获奖女神榜单列表

    使用方式 ——
    xx.chartAwardRank.(value,rank,type)
*/
export const chartAwardRank = (value,typelist,placedstart,placedend) =>{
    if(!value || !value.length){
        return null
    }else{
        let chartAwardList = chartTypeToal(chartTypeList(value,typelist),placedstart,placedend);
        // console.log(chartAwardList)
        return chartAwardList
    }
}
const chartTypeList = (value,typelist) =>{
    let type_list = [];
     //针对传入的type类型进行筛选各个类型的女神数据
    $$.each(typelist,function(index, el) {
        let type =  typelist[index].type;
        let type_path  = _.filter(value, (item)=>{
            return item.profile.type == type;
        });
        type_list.push(type_path);
    });
    return type_list
}
const chartTypeToal = (typelist,placedstart,placedend) =>{
    //针对筛选出来的各个type类型的女神进行筛选前几名数据
    let type_list_total = [];
    let type_list_rank = [];
    $$.each(typelist,function(index, el) {
        //对总榜的女神列表进行排序
        let placed_path = _.sortBy(el, (item)=>{
            return item.ranking.rank 
        });
        type_list_total.push(placed_path.slice(placedstart,placedend));
    });
    for (let i = 0; i < type_list_total.length; i++) {
        for (let j = 0; j < type_list_total[i].length; j++) {
            type_list_rank.push(type_list_total[i][j]);
        }
    }
    return type_list_rank
}
/*
    拉取女神type类型
        参数 ——
            value： 女神类型列表(goddess_type)
            type:1 表示返回需要全部标签类型(可选)
        返回 ——
            过滤后的女神类型列表

    使用方式 ——
    xx.chartAllType.(value,type)
*/
export const chartAllType = (value,type) =>{
    let type_modal_list = [
            { type: 1,title: '甜美萝莉',registration_total: 0},
            { type: 2,title: '清新文艺', registration_total: 0},
            { type: 3,title: '帅酷有型',registration_total: 0 },
            { type: 4,title: '机灵搞怪',registration_total: 0 },
            { type: 5,title: '性感女王',registration_total: 0 },
            { type: 6,title: '呆萌纯真',registration_total: 0 }
        ];
    let type_all_list = [{type: 0, title: '全部',registration_total: 0}];
    if(!value || !value.length){
        if(type){
            let type_new_list = type_all_list.concat(type_modal_list)
            return type_new_list
        }else{
            return type_modal_list
        }
    }else{
        if(type){
            let type_all_list_less = _.filter(value, (item)=>{
                return item.type == 0;
            });
            if(!type_all_list_less.length){
                var type_new_list = type_all_list.concat(value);
            }else{
                var type_new_list = type_modal_list;
            }
            // console.log(type_all_list_one)
            return type_new_list
        }else{
            let type_new_list_none = _.reject(value, (item)=>{
                return item.type == 0;
            });
            return type_new_list_none
        }
    }
}
/*
    筛选获奖公会榜单列表
        参数 ——
            value： 获奖女神榜单列表 xx.chartAwardGoddess()(需要先使用之前方法过滤获奖各个类型前六名女神榜单)
        返回 ——
            过滤后的获奖公会所在女神榜单列表

    使用方式 ——
    xx.chartAwardGbuild(value)
*/
export const chartAwardGbuild = (value)=>{
    let gubild_list_init = [];
    let gubild_list_item = {};
    let gubild_list_global = [];

    if(!value || !value.length){
        return null
    }
    //将获奖女生列表所在的公会id筛选出来
    gubild_list_init = _.filter(value, (item) => {
        return  item.profile.guild_id > 0
    });
    gubild_list_item = _.uniq(value, (item) => {
        return  item.profile.guild_id
    });
    if(!gubild_list_item.length) {
        return null
    };
    //将所在公会的女神列表一次插入到所在公会
    $$.each(gubild_list_item,function(index, item) {

        let guild_id = item.profile.guild_id
        //筛选出匹配到gbuild_id一致的女神秀
        let guild_list_location =  _.filter(value, (item)=>{
            return item.profile.guild_id === guild_id
        });
        //查找到是否存在改
        let lastIndex = _.findLastIndex(guild_list_location,(item)=>{
            return item.profile.guild_id === guild_id;
        });
        //存在即可替换数据
        if(lastIndex != -1){
            gubild_list_item[index] = guild_list_location
        }else{
            gubild_list_item.push(guild_list_location)
        }
    });
    //将获得的公会所在的数据在一次合并解耦
    $$.each(gubild_list_item,function(index, item) {
        //构建数据结构
        const stateData = {
            profile: {
                guild_id: item[0].profile.guild_id, //公会id
                guild_name: item[0].profile.guild_name, //公会名称
                guild_total: item[0].profile.guild_total, //公会总人数
            },
            //所在公会的女神榜列表
            goddess_list:item
        }
        //判断数据是否存在,返回索引
        const stateIndex = _.findLastIndex(item, function(obj){
            return obj.profile.guild_id == stateData.profile.guild_id
        })
        //如果数据已经存在就替换,否则添加
        if(stateIndex != -1){
            gubild_list_global[index] = stateData
        }else{
            gubild_list_global.push(stateData)
        }
    });
    //返回所在公会下女神列表
    console.log(gubild_list_global)
    return gubild_list_global
}

/*
    初始化女神类型列表
*/
export const initTypeList = (value, flag) => {

    let tmp_arr = [
        {
            type: 1,
            title: '甜美萝莉',
            registration_total: 0
        },
        {
            type: 2,
            title: '清新文艺',
            registration_total: 0
        },
        {
            type: 3,
            title: '帅酷有型',
            registration_total: 0
        },
        {
            type: 4,
            title: '机灵搞怪',
            registration_total: 0
        },
        {
            type: 5,
            title: '性感女王',
            registration_total: 0
        },
        {
            type: 6,
            title: '呆萌纯真',
            registration_total: 0
        }
    ];

    if (flag){
        return value;
    } else {
        return tmp_arr;
    }
}