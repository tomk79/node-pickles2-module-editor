/**
 * GPI: deletePackage
 */
module.exports = function(px2me, data, callback){
	delete(require.cache[require('path').resolve(__filename)]);

	var utils79 = require('utils79');
	var fsx = require('fs-extra');

	var realpath;
	try {
		realpath = require('path').resolve(px2me.entryScript, '..', px2me.px2conf.plugins.px2dt.path_module_templates_dir)+'/';
	} catch (e) {
	}
	if( !utils79.is_dir(realpath) ){
		callback(false);
		return;
	}

	if( !px2me.isEditablePath( realpath ) ){
		// 編集可能なパスかどうか評価
		// 駄目なら上書いてはいけない。
		callback(false);
		return;
	}
	realpath = realpath+'/'+encodeURIComponent(data.packageId)+'/';
	if( !utils79.is_dir(realpath) ){
		// 既に存在していない
		callback(false);
		return;
	}
	var result = fsx.removeSync(realpath);

	callback(!!result);

	return;
}
