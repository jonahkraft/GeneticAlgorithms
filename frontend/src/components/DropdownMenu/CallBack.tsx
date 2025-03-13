export interface myCallBackType { 
    doWork(index: number): void 
}

class CallBack implements myCallBackType{
    myCallBack: ((index: number) => void);

    doWork(index: number)
    {
        this.myCallBack(index); 
    }

    constructor(call: ((index: number) => void)) {
        this.myCallBack = call;
    }
}

export default CallBack;