// taken and modified from https://stackoverflow.com/a/52685672 and other answers in the question

export default class Timer {
  constructor(funcToRun, delayInterval, repeat){
    this.funcToRun = funcToRun;
    this.delayInterval = delayInterval;
    this.repeat = repeat;
    this.count = 0;
    this.startTime = performance.now();
    this.isRunning = true;
    const _this = this;
    this.timeout = window.setTimeout(
      () => {
        _this.tick();
      }, this.delay
    )
  };
  tick() {
    this.isRunning ? (
      this.funcToRun();
      this.count++;
    ) : ();
    //adjusts delay if previous tick was lagging
    if (this.repeat === -1 || (this.repeat >0 && this.count < this.repeat)){
      let adjustedDelay = Math.max(1,
        this.startTime + ((this.count+1)*this.delayInterval)-performance.now());
      const _this = this;
      this.timeout = window.setTimeout( () => {_this.tick();}, adjustedDelay)
    };
  };
  stop() {
    window.clearTimeout(this.timeout);
  };
  pause() {
    
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
