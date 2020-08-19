({
	"baseUrl": "web/js",
	"name": "main",
	"out": "web/js/main.optimized.js",
	"paths": {
		"knockout": "libs/knockout/knockout-3.5.0.debug",
		"jquery": "libs/jquery/jquery-3.4.1",
		"jqueryui-amd": "libs/jquery/jqueryui-amd-1.12.1",
		"hammerjs": "libs/hammer/hammer-2.0.8",
		"ojdnd": "libs/dnd-polyfill/dnd-polyfill-1.0.1.debug",
		"ojs": "libs/oj/v8.0.0/debug",
		"ojL10n": "libs/oj/v8.0.0/ojL10n",
		"ojtranslations": "libs/oj/v8.0.0/resources",
		"text": "libs/require/text",
		"signals": "libs/js-signals/signals",
		"customElements": "libs/webcomponents/custom-elements.min",
		"proj4": "libs/proj4js/dist/proj4-src",
		"css": "libs/require-css/css.debug",
		"touchr": "libs/touchr/touchr",
		"corejs": "libs/corejs/shim",
		"regenerator-runtime": "libs/regenerator-runtime/runtime",
		"cryptojs": "libs/crypto-js"
    },
    "optimize": "none",
	"shim": {
		"jquery": {
			"exports": "$"
		}
	},
	"include": [
		"viewModels/login",
		"utils/jwt.util",
		"utils/router.util",
		"ojs/ojbootstrap",
		"knockout",
		"appController",
		"ojs/ojrouter",
		"knockout",
		"ojs/ojmodule-element-utils",
		"ojs/ojknockouttemplateutils",
		"ojs/ojrouter",
		"ojs/ojresponsiveutils",
		"ojs/ojresponsiveknockoututils",
		"ojs/ojarraydataprovider",
		"ojs/ojoffcanvas",
		"text",
		"ojs/ojmodule-element",
		"ojs/ojknockout",
		"ojs/ojnavigationlist",
		"ojs/ojtoolbar",
		"ojs/ojasyncvalidator-regexp"
	],
	"bundles": {
		"main.min": []
	}
})