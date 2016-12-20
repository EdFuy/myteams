/**
 * Created by mastrt on 16/12/5.
 */
//获得首页时间
window.onload=function(){

//定时器每秒调用一次fnDate()
    setInterval(function(){
        fnDate();
    },1000);
}

//js 获取当前时间
function fnDate(){
    var oDivHour = document.getElementById("j_timeHour");
    var oDivYear = document.getElementById("j_timeYear");
    var date=new Date();
    var year=date.getFullYear();//当前年份
    var month=date.getMonth();//当前月份
    var data=date.getDate();//天
    var hours=date.getHours();//小时
    var minute=date.getMinutes();//分
    var second=date.getSeconds();//秒
    // var time=year+"-"+fnW((month+1))+"-"+fnW(data)+" "+fnW(hours)+":"+fnW(minute)+":"+fnW(second);
    var timeYear=year+"/"+fnW((month+1))+"/"+fnW(data);
    var timeHour=fnW(hours)+":"+fnW(minute)+":"+fnW(second);
    oDivHour.innerHTML=timeHour;
    oDivYear.innerHTML=timeYear;
}
//补位 当某个字段不是两位数时补0
function fnW(str){
    var num;
    str>10?num=str:num="0"+str;
    return num;
}