# Mock.js

## 一、数据占位符

占位符只是在属性值字符串中占个位置，并不出现在最终的属性值中。

```JS
 var data = Mock.mock({
  'list|1-10': [
    {
      'id|+1': 1,
      name: '@cname' // 随机产生中文姓名
    }
  ]
})

// 该方法类似JSON pretty
console.log(JSON.stringify(data, null, 2))
```

## 二、Mock.Random

Mock.Random 是一个工具类，用于生成各种随机数据。

```JS
const random = Mock.Random
const friends = ['张三', '李四', '王二', '麻子']

const data = {
  email: random.email(),
  // 随机生成图片(尺寸，背景色，字体颜色，图片文字)
  avatar: random.image('200x100', '#dddddd', '#fff', 'Mock数据'),
  name: random.cname(),
  url: random.url(),
  address: random.city(),
  bestfriend: random.pick(friends)
}

console.log(JSON.stringify(data, null, 2))
```

## 三、Mock 可拦截网络请求

```html
<body>
  <button id="app">点击请求</button>
  <script>
    $('#app').click(function() {
      $.ajax({
        url: 'http://xxx.xx.com/api/getUser',
        type: 'get',
        dataType: 'json'
      }).done(function(data, status, xhr) {
        console.log(JSON.stringify(data, null, 2))
      })
    })

    const testObj = { aa: '11', bb: '22', cc: '33', dd: '44' }

    Mock.mock('http://xxx.xx.com/api/getUser', {
      'user|1-5': [
        {
          'id|+1': 1,
          name: '@cname',
          'age|18-28': 0, // 0表示指定age类型
          birthday: '@date("yyyy-MM-dd")',
          city: '@city',
          'fromObj|2': testObj // 随机从testObj中取出两个数据
        }
      ]
    })
  </script>
</body>
```
