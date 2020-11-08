// await 关键字之后的函数
var delay_time = function(ms){
	return new Promise(function(resolve){
		setTimeout(resolve, ms);
	})
}

//async 函数
var delay_print = async function(ms){
	await delay_time(ms);
	return new Promise(function(resolve, reject){
		resolve("END");
	})
}

// 执行 async 函数后
delay_print(1000).then(function (resolve) {
	console.log(resolve);
})
