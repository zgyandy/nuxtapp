var Mock = require('mockjs')
// 使用mockjs模拟数据
Mock.mock('data', 'get', function() {
  return {
    name: 'andy'
  }
})
// 用户信息
Mock.mock('userinfo', 'post', {
  name: '@cname',
  img: '@dataImage(40x40,帅)',
  id: '@integer(1,9999)',
  address: '@region',
  phone: /^1(3|4|5|6|7|8|9)\d{9}/
})
Mock.mock('banner', {
  banner: [{
    img: Mock.Random.img('750x346', '#0f0')
  },
  {
    img: Mock.Random.img('750x346', '#f00')
  },
  {
    img: Mock.Random.img('750x346', '#00f')
  }]
})
Mock.mock('cheer', {
  cheer: [
    {
      img: Mock.Random.img('355x380', '#0f0')
    },{
      img: Mock.Random.img('355x190', '#00f')
    },{
      img: Mock.Random.img('355x190', '#f00')
    },{
      img: Mock.Random.img('355x190', '#f00')
    },{
      img: Mock.Random.img('355x190', '#f00')
    }
  ]
})
Mock.mock('lecture', {
  lecture: [
    {
      img: Mock.Random.img('345x214', '#0f0'),
      vip: '会员免费',
      time: '01:15:55',
      explain: '人工智能基础语python的爬虫之路',
      name: '杜牧原',
      num: '666'
    }, {
      img: Mock.Random.img('345x214', '#0f0'),
      vip: '会员免费',
      time: '01:15:55',
      explain: '人工智能基础语python的爬虫之路',
      name: '杜牧原',
      num: '666'
    }, {
      img: Mock.Random.img('345x214', '#0f0'),
      vip: '会员免费',
      time: '01:15:55',
      explain: '人工智能基础语python的爬虫之路',
      name: '杜牧原',
      num: '666'
    }, {
      img: Mock.Random.img('345x214', '#0f0'),
      vip: '会员免费',
      time: '01:15:55',
      explain: '人工智能基础语python的爬虫之路',
      name: '杜牧原',
      num: '666'
    }
  ]
})
Mock.mock('articleList', {
  banner: [
    {
      img: Mock.Random.img('345x214', '#0f0')
    }, {
      img: Mock.Random.img('345x214', '#00f')
    },{
      img: Mock.Random.img('345x214', '#f00')
    }

  ]
})
Mock.mock('articles', {
  articles: [
    {
      img: Mock.Random.img('230x172', '#0f0')
    }, {
      img: Mock.Random.img('230x172', '#00f')
    },{
      img: Mock.Random.img('230x172', '#f00')
    }
  ]
})