# Async 实战
“流程控制”本来是件比较简单的事，但是由于Nodejs的异步架构的实现方法，对于需要同步的业务逻辑，实现起来就比较麻烦。往往需要多层的嵌套，代码就会变得的支离破碎了！接下来，我们看看本文的主角——async,是如何将这一切变得简单的～

<div>async主要实现了三个部分的流程控制功能：</div>

* 集合: Collections
* 流程控制: Control Flow
* 工具类: Utils   

<div>在日常业务中经常会用到async，这里由于篇幅有限，每个部分选取一个代表进行讲述。</div>
## Collections - mapLimit
maplimit是在map的基础上加了并发次数的限制，对集合中的每一个元素，执行某个异步操作，得到结果返回，由于不希望其中某个任务异常而整体流程终端，我习惯将其捕获，并以语义化的形式归纳到结果中输出
```javascript
const { mapLimit } = require('async')
const co = require('co')
const LIMIT = 10
mapLimit(tasks, LIMIT, (task, mdone) => {
  co(function* () {
    let res = {}
    try {
      const data = yield handleTask(task) // 此处的handleTask为具体的单次任务处理逻辑，本文未定义
      res.return_code = 0
      res.data = data
    } catch (e) {
      res.return_code = 1
      res.data = {}
      res.err_msg = e
    }
    mdone(null, res)
  })
}, (err, res) => {
  // dosomething with return res
})
```
注：并发数LIMIT的值可以根据具体情况进行设置，在稳定的前提下获得尽可能大的效率提升

## Control Flow - whilst
whilst当判断指标为true时，循环执行某个异步操作，循环是基于前一次任务成功返回，与mapLimit相同考虑，我们将错误捕获，以分页获取后端数据为例，当某次返回内容条数为0时（实际中可以是小于分页条数），视为已获取全部内容，跳出循环。另外为了避免出现循环无法跳出的情况，业务中可以考虑额外设置一个最大循环次数。
```javascript
const { whilst } = require('async')
const co = require('co')
let flag = true
const maxLoop = 10
let count = 1
whilst(() => flag, wdone => {
  co(function* () {
    let res = {}
    let data = null
    try {
      data = yield getSomeData(count) // 此处的getSomeData为获取当前页内容，返回为内容数组,本文未定义
      res.return_code = 0
      res.data = data
    } catch (e) {
      res.return_code = 1
      res.data = {}
      res.err_msg = e
    }
    count++
    flag = data.length > 0 && count <= maxLoop
    wdone(null, res)
  })
}, (err, res) => {
  // dosomething with return res
})
```
<div>注：需不需要设置maxLoop，或者设置为多少可以根据具体业务来定</div>

## Utils -  timeout
业务中经常会遇到网络超时的情况，如果等待http的超时响应，比较影响用户体验，timeout可以说很方便的解决了这个问题，这里我们直接用官方文档中的例子
```javascript
const myFunction = (foo, callback) => {
  doAsyncTask(foo, (err, data) => {
    if (err) return callback(err)
    return callback(null, data)
  })
}
var wrapped = async.timeout(myFunction, 1000);
wrapped({ bar: 'bar' }, function(err, data) {})
```
<div>下面再附上多个任务时，设置超时的代码</div>
```javascript
var callbacks = [];

var timer = setTimeout(function(){
    callbacks.some(function(obj){
        if(!obj.hasCalled){
            obj.fn(new Error('TIME-OUT'));
            obj.hasCalled = true;
            return true;
        }
        return false;
    });
}, 10000);

var foo = function(item, callback){
  var obj = {'hasCalled':false, 'fn':callback};
  callbacks.push(obj);
  var _callback = function(err, result){
    if(!obj.hasCalled){
      callback(err, result);
      obj.hasCalled = true;
    }
  }
  taskStart(item, function(err, data){	// 发起耗时任务
    if(err){
      _callback();					
    }else{
      _callback(null, data);
    }
  }); 	
};
	
async.mapLimit(items, 10, foo, function(err, resul){
  clearTimeout(timer);
  if(err){
    console.log(err.message);
  }
  result = result.filter(n => n);
});
```


