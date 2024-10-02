const { Plugin } = require('obsidian');

module.exports = class MobileHotReload extends Plugin {
    pluginReloader(file) {
	const pluginsDir = app.plugins.getPluginFolder() + '/';
	if(file && file.startsWith(pluginsDir) && ['manifest.json', 'main.js', 'styles.css'].some(s => file.includes(s))) {
		let fileDir = file.substring(pluginsDir.length);
		fileDir = fileDir.substring(0, fileDir.indexOf('/'));
		Object.values(app.plugins.plugins).map(plugin => {
		    if((pluginsDir + fileDir) === plugin.manifest.dir) {
			console.log('HOT RELOAD 🔥 🏁 restarting plugin: ' + plugin.manifest.id)
			app.plugins.disablePlugin(plugin.manifest.id)
			app.plugins.enablePlugin(plugin.manifest.id)
		    }
		})
	}
    }

    onload() {
	app.vault.on('raw', this.pluginReloader)
    }

    onunload() {
	this.app.vault.offref(this.pluginReloader)
    }

}
