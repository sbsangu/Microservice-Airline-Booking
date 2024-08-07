function compareTime(stringTime1,stringTime2){
 let time1=new Date(stringTime1);
 let time2=new Date(stringTime2);
 return time1.getTime() > time2.getTime();
}



module.exports={
 compareTime
}