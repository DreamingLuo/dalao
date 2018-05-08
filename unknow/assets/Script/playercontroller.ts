const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    playerNode:cc.Node = null;
    @property(Number)
    jumpHeight:number = 0;
    @property(Number)
    jumpDuration:number = 0;
    @property(Number)
    maxMoveSpeed:number = 0;
    @property(Number)
    accel:number = 0;
    // LIFE-CYCLE CALLBACKS:
   // 加速度方向开关
    @property
    accLeft:boolean = false;
    @property
    accRight:boolean = false;
    //最大速度
// 主角当前水平方向速度
    xSpeed = 0;

     onLoad () 
     {
        this.node.runAction(this.setJumpAction());
        cc.log(cc.p(100,100));
        this.setInputControll();
     }

    start () {
        
    }

     update (dt) 
     {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
       // this.node.x+=5;
        // 根据当前速度更新主角的位置
        cc.log(this.xSpeed)
        this.node.x += this.xSpeed * dt;
     }

     setJumpAction() {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    }

    setInputControll()
    {
        cc.log("hahaha");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,(event)=>{
            switch(event.keyCode) {
                case cc.KEY.a:
                cc.log("点击了A间");
                cc.log(this.accLeft);
                    this.accLeft = true;
                    break;
                case cc.KEY.d:
                    this.accRight = true;
                    break;
            }
        });

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event){
            switch(event.keyCode) {
                case cc.KEY.a:
                cc.log("松开按键")
                    this.accLeft = false;
                    break;
                case cc.KEY.d:
                    this.accRight = false;
                    break;
            }
        });
    }
}
