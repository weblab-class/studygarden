// taken and modified from https://stackoverflow.com/a/52685672 and other answers in the question

export default class Timer {
  constructor(funcToRun, delayInterval, repeat, runAtStart, out){
    
    this.delayInterval = delayInterval;
    this.repeat = repeat;
    this.count = 10;
    this.startTime = performance.now();
    this.isRunning = runAtStart;
    this.funcToRun = funcToRun(this.count);
    let _this = this;
    //console.log("DDD")
    this.timeout = window.setTimeout(
      () => {
        _this.tick();
      }, this.delay
    )
  };
  tick(func) {
    if(this.isRunning)  {
      this.funcToRun;
      func
      this.count++;
    };
    //adjusts delay if previous tick was lagging
    if (this.repeat === -1 || (this.repeat >0 && this.count < this.repeat)){
      let adjustedDelay = Math.max(1,
        this.startTime + ((this.count+1)*this.delayInterval)-performance.now());
      let _this = this;
      this.timeout = window.setTimeout( function(){_this.tick(this.funcToRun);}, adjustedDelay)
    };
    return this.count;
    //for testing
    
  };
  stop() {
    window.clearTimeout(this.timeout);
  };

  pause() {
    this.isRunning = false;
  };

  resume() {
    this.isRunning = true;
  }
  getCount(){
    return this.count();
  }

  addTime(time){
    //probably wont need but
    if (time >= 0){
      this.repeat = this.repeat + time;
    } else {
      throw new error("currently cannot add a negative amount of time")
    }
  }
}
