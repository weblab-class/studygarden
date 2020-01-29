export default function getNiceTime(sec){
  let minuteTxt;
  if (sec/60 === 1){
    minuteTxt = " minute";
  }else{
    minuteTxt = " minutes";
  };
  let secTxt;
  if (sec === 1){
    secTxt = " second";
  }else{
    secTxt = " seconds";
  };
  if (sec<60){
    return sec + secTxt;
  }else if (sec%60 === 0){
    return sec/60 + minuteTxt;
  }else{
    return Math.floor(sec/60) + minuteTxt + " and " + sec%60 + secTxt;
  }
}