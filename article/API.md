# 学习如何设计API
## API是什么?
应用程序接口（英语：Application Programming Interface，简称：API），又称为应用编程接口，就是软件系统不同组成部分衔接的约定。由于近年来软件的规模日益庞大，常常需要把复杂的系统划分成小的组成部分，编程接口的设计十分重要。程序设计的实践中，编程接口的设计首先要使软件系统的职责得到合理划分。良好的接口设计可以降低系统各部分的相互依赖，提高组成单元的内聚性，降低组成单元间的耦合程度，从而提高系统的维护性和扩展性。

对于web端开发人员而言，api就是协商好的一种规范，大家都按这个规范做事，这里主要针对前&后端交互的接口进行说明～

![](http1-url-structure.png)   
上图可以看到url的组成，而这里我们需要关注的是resource path和query部分
## API路径风格
api就是我们平常所说的接口，路径是指后端提供给前端调用该接口的地址，其实就是该接口的链接，最好以一个较为明显的词为开头，或者说以单独的域开头，路径还要向语义化靠拢，这里只是路径，不涉及到参数，比如：

* /api/user/info
* http://www.foreverll.cn/user/info   
注：通常是复数时会在词后加s，比如文章是recoitem，但文章集合，多篇文章时是recoitems，当然这不是硬性规定，具体还要看你～

### 隐式语义化风格
* /api/recoitem   获取所有文章列表
* /api/recoitem/create 创建文章
* /api/recoitem/delete 删除文章
* /api/recoitem/update 更新文章
* /api/recoitem/:id 获取单个文章信息

### 显式语义化风格
* /api/recoitem/get-list 获取文章列表
* /api/recoitem/create 创建文章
* /api/recoitem/delete 删除文章
* /api/recoitem/set 更新
* /api/recoitem/set-xx 更新某项
* /api/recoitem/get/:id 创建单个

### restful
* GET /api/recoitem 获取所有的文章列表
* GET /api/recoitem/1 获取id为1的文章详细信息
* POST /api/recoitem 添加一篇文章
* PUT /api/recoitem/1 更新id为1的文章数据
* DELETE /api/recoitem/1 删除id为1的文章数据   
注：restful是一种风格，也可以说是一种思想，现在已经被广泛的应用于客户端接口的开发，这是一种以提交类型来约定行为的api实现方案，想了解更多resetful相关知识，[请戳这里](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

## API参数
参数分为可选参数和必选参数，使用时又可细分为url参数和body参数，api参数需要定义参数的名字、类型及值的范围，以及必要的文字说明，以我日常业务中常见的参数为例：
```javascript
qs: {
  _page: 1,
  _size: 10,
  _sort: '_created_at:desc',
  _filters: 'id:(123456)'
}
```
前端请求后端接口时最常见的场景就是分页了，下面表格列举出这些参数的信息

<table width=100%>
  <tr>
    <th  bgcolor=yellow >参数名</th>
    <th bgcolor=yellow>是否必须</th>
    <th bgcolor=yellow>类型取值</th>
   <th  bgcolor=yellow>说明</th>
  </tr>
  <tr>
    <td bgcolor=#eeeeee> _page</td>
    <td> 是  </td>
    <td> int</td>
    <td> 页码</td>
  </tr>
  <tr>
    <td bgcolor=#eeeeee> _size</td>
    <td> 否  </td>
    <td> int</td>
    <td> 每页数据量 </td>
 </tr>
  <tr>
    <td bgcolor=#eeeeee> _sort</td>
    <td> 否  </td>
    <td> string</td>
    <td> 排序方式 </td>
 </tr>
  <tr>
     <td bgcolor=#eeeeee> _filters</td>
    <td> 否  </td>
    <td> string</td>
    <td> 筛选条件  </td>
  </tr>
</table>

## API返回值
对于前端开发人员来说，接口的返回值没有规范简直就是一场噩梦，尤其是没有状态码，或者状态码凌乱，规范的请求返回值应该包含状态码，请求成功的响应数据，及失败时的错误信息，还是以我在业务中的实现为例：
```javascript
  // 成功时
  {
    return_code: 0,
    data: {
      id: '123',
      _update_at: '更新时间'
    },
    err_msg: ''
  }

  // 失败时
  {
    return_code: 1,
    data: {},
    err_msg: '错误信息'
  }
```
<p>由于后端抛错信息对于前端展示而言，友好度不够，如果不进行任何加工就展示给用户看，不仅用户会懵逼，也不利于报给研发排查问题。对此，我一般的处理方式是，前端针对接口配置友好的文案，结合后端返回的err_msg进行提示。</p>
<p>经常会遇到这样的场景，需求设计之初仅需支持单条数据的patch操作，后续会要求支持批量操作，如果从节省开发成本的角度去实现，大可从前端发起n次请求，这样，不仅不需要修改服务端代码，前端操作完成后的提示也可维持现状（任其逐一提示）。</p>
<p>但从性能和用户友好的角度去看，发起多次的http请求本身就会增加额外的时间，而且凌乱的返回信息不利于用户得到想要的反馈。我说说我的优化方案，将需要批量操作的数据按请求体组合成数组，只需发起一次http请求，服务端去遍历请求数组进行相应操作。由于是批量操作，上面谈到的err_msg显然就不能满足了，我的做法是扩展data成数组，分别记录每次请求的状态码return_code和data信息。这样，前端拿到的反馈信息可进行归类展示，啦啦啦！！！完美解决上述两个问题，也许，看到这里，聪明的你，已经想到了更好的方案。</p>

## API版本控制
如果在客户端应用接口还要涉及到版本控制，比如你发的App1.0使用的接口跟2.0使用的可能不一样，可能会有接口字段调整，类型调整等，这时你又不能丢弃老的用户，还要兼容新的版本，那么这样的版本总体来说可以分大版本和小版本   
### 大版本
以版本号为路径，比如 /api/v1/*，在App做一次大的升级，会出现多个接口大的迁移，这时要考虑到数据库的兼容，在适当时候整体新版本里应用v2资源，当然这个应该是在App加载的时候获取的配置文件里带的，升级大版本后相关调整的接口一定要跟客户端开发者约定好，避免兼容问题
### 小版本
实际工作中难免会经常fix一些问题，或者小的需求改动，比如在登录里加个验证码，这小的改动遵循只添加不删除的规则，因客户端在请求接口时都会带有App当前的版本号，后端可根据该版本来做一些兼容，比如1.0.1的时候登录不用验证码，1.0.2的时候必须有验证码这样的需求，当然还有一些设备的兼容，比如ios和android等，当一个接口里小的版本过多时就得考虑升级了

## 结语
对于研发人员来说，发布是一件神圣的事，要时刻保持对生产的崇敬之情，尤其是api这种面向大众的产品，必须谨记：慎重！慎重！慎重~