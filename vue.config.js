module.exports = {
	pwa: {
		name: process.env.NAME || "WebGL Objects",
	},
	chainWebpack: (config) => {
		config.plugin("html").tap((args) => {
			args[0].title = process.env.NAME || "WebGL Objects";
			return args;
		});
	},
};
