/**
* 功能：商品分类功能
**/
/**********************************************/
/* 文档加载完成后执行部分 */
/**********************************************/
$(function() {
	// 实例化公共功能对象
	var common = new Main();
	// 商品数量选择
	common.countor(".goodsLength-1",3);
	common.countor(".goodsLength-2",6);
});