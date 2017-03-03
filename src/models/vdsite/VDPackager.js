
var VDPackager = {

	fileStructure: {
		css: '',
		pages: {}
	},

	pages: {},
	css: {},
	layout: {},

	htmlTpl: {
		head: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Gospel</title><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="generator" content="Gospel"><link rel="stylesheet" type="text/css" href="css/normalize.css"><link rel="stylesheet" type="text/css" href="css/gospel.css"><link rel="stylesheet" type="text/css" href="css/styles.css"><script type="text/javascript" src="js/modernizr.js"></script></head></html>`,

		body: `</head><body>`,

		footer: `<script src="//cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script><script src="js/bootstrap.min.js"></script><!--[if lte IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script><![endif]-->`
	},

	pack (params) {

		this.fileStructure = {
			css: '',
			pages: {}
		};

		this.pages = params.pages;
		this.css = params.css;
		this.layout = params.layout;

		this.fileStructure.css = this.compileCSS();

		this.compilePage();

		return this.fileStructure;
	},

	compileCSS () {
		return window.stylesGenerator(this.css);
	},

	compilePage () {
		var self = this;

		const pageGenerator = (pages, directory, parentDir) => {

			for (var i = 0; i < pages.length; i++) {
				var currentPage = pages[i];
				
				var meta = {
					description: ''
				};

				if(currentPage.children) {
					var tmpParentDir = {};

					if(directory) {
						parentDir[currentPage.key] = {};
						tmpParentDir = parentDir[currentPage.key];
					}else {
						this.fileStructure.pages[currentPage.key] = {};
						tmpParentDir = this.fileStructure.pages[currentPage.key];
					}
					pageGenerator(currentPage.children, true, tmpParentDir);
				}else {
					meta.description = self.compileDescription(currentPage.seo.description);
					var realHTML = '', htmlText = '';

					if(this.layout[currentPage.key]) {
						realHTML = this.compileLayout(this.layout[currentPage.key]);						
					}

					htmlText = this.htmlTpl.head + meta.description  + this.htmlTpl.body + realHTML + this.htmlTpl.footer;

					if(directory) {
						parentDir[currentPage.key] = htmlText;
					}else {
						this.fileStructure.pages[currentPage.key] = htmlText;
					}
				}
			};

		}

		pageGenerator(this.pages);

		return this.fileStructure;
	},

	compileDescription (description) {
		return '<meta name="description" content="' + description + '">';
	},

	compileLayout (layout) {

		var bodyChildren = layout[0].children,
			pageBase = $('<div class="page"></div>');

		for (var i = 0; i < bodyChildren.length; i++) {
            var currentController = bodyChildren[i],
            	elem = new window.ElemGenerator(currentController),
           		elemToAdd = $(elem.createElement());

           	pageBase += elemToAdd[0].outerHTML;
        };

        return pageBase;
	}

}

export default VDPackager;