// 使用mock模拟假数据

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

var mock = new MockAdapter(axios);

// 模拟get请求
// 返回数据
mock.onGet('/student').reply(200, {
	student:[
		{name:"小机枪", age:11, sex:'女'},
		{name:"班长", age:22, sex:'男'},
		{name:"彬彬", age:33, sex:'男'},
		{name:"通通", age:82, sex:'男'},
		{name:"锋锋", age:12, sex:'男'},
		{name:"学委", age:7, sex:'男'},
		{name:"菲菲", age:28, sex:'男'},
		{name:"敏志", age:28, sex:'男'}
	]
});
mock.onGet('/project',
	{ params: { name: 'xueke' } }).reply(200,{
	project:["H5","java","u3d","php"]
});
