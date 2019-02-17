/*
Owner: https://htmlelements.com/
*/

(function () {
    'use strict';
	
	const cssCache = [];
	
	function addStylesheetRules (selector, css) {
	  var styleEl = document.createElement('style');

	  let rules = '';
	  let hover = '';
	  let active = '';
	  let focus = '';
	  let disabled = '';
	  let attributeRules = [];
	  let classNameRules = [];
	  
	  const json = Object.assign({}, css);
		
	  const serialize = function(css) {
		 let rules = '';
		 
		 for(let cssProperty in css) {
			if (cssProperty === 'onhover') {
				hover = serialize(css[cssProperty]);
				continue;			
			}
			else if (cssProperty === 'onactive') {
				active = serialize(css[cssProperty]);
				continue;			
			}
			else if (cssProperty === 'onfocus') {
				focus = serialize(css[cssProperty]);
				continue;			
			}
			else if (cssProperty === 'ondisabled') {
				disabled = serialize(css[cssProperty]);
				continue;			
			}
			else if (cssProperty.startsWith('attr')) {
				attributeRules[cssProperty.replace('attr', '').toLowerCase()] = serialize(css[cssProperty]);
				continue;			
			}
			else if (cssProperty.startsWith('className')) {
				classNameRules[cssProperty.replace('className', '').toLowerCase()] = serialize(css[cssProperty]);
				continue;			
			}
			else {
				rules += cssProperty + ': ' + css[cssProperty] + '; ';	
			}
		 }
		 
		 return rules
	  }
	  
	  rules = serialize(json);
	  
	  if (cssCache[rules]) {
		  selector = cssCache[rules];
		  
		  return selector;
	  }
	  else {
		cssCache[rules] = selector;
	  }
		
	  const cssClass = '.' + selector;
	  
	  styleEl.innerHTML = cssClass + ' {' + rules + '}';

	  for(let attributeName in attributeRules){
		 styleEl.innerHTML += cssClass + '[' + attributeName  + '] {'  + attributeRules[attributeName] + '}';
	  }

	  for(let className in classNameRules){
		 styleEl.innerHTML += cssClass + '.' + className  + ' {'  + classNameRules[className] + '}';
	  }
	  
	  if (hover) {
		styleEl.innerHTML += cssClass + ':hover {' + hover + '}';
	  }
	  
	  if (active) {
		styleEl.innerHTML += cssClass + ':active {' + active + '}';
	  } 
	  
	  if (focus) {
		styleEl.innerHTML += cssClass + ':focus {' + focus + '}';
	  } 
	  
	  if (disabled) {
		styleEl.innerHTML += cssClass + ':disabled {' + disabled + '}';
	  } 
	  
	  // Append <style> element to <head>
	  document.head.appendChild(styleEl);	  
	}


	const cssFromString = function(cssString) {
		const rules = cssString.split(';');
		const result = [];

		for (let i = 0; i < rules.length; i++) {
			const rule = rules[i].toString();	
			const ruleWithoutComments = rule.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '');	
			const splitRule = ruleWithoutComments.split(':');
			
			if (splitRule.length > 1) {
				result[splitRule[0].trim()] = splitRule[1].trim();
			}
		}

		return result;
	}

	const css = function(cssObject, options) {
		let result = [];
		
		if (Array.isArray(cssObject)) {
			for(let i = 0; i < cssObject.length; i++) {
				let rules = [];
				
				if (typeof cssObject[i] === 'function') {
					rules = css(cssObject[i], options);
					
					const functionName = cssObject[i].toString();
					
					if (functionName.startsWith('on') ||
					   (functionName.startsWith('attr')) ||
					   (functionName.startsWith('className'))
					) {
						const stateName = functionName.substring(0, functionName.indexOf('=')).trim()
						
						result[stateName] = rules;
						continue;
					}		
				}
				else {
					rules = cssFromString(cssObject[i].toString());
				}
		
				const keys = Object.keys(rules);
			
				for(let j = 0; j < keys.length; j++) {
					result[keys[j]] = rules[keys[j]];
				}	
			}	
		}
		else if (typeof cssObject === 'function') {
			return cssObject(options || {});		
		}
		else {
			return cssFromString(cssObject.toString());
		}
		
		return result;
	}

	function constructWithOptions(
	  componentConstructor,
	  tag
	) {
	 

	  const templateFunction = (...args) => componentConstructor(tag, args, this);
	  
	  return templateFunction;
	}

	function CuteComponent(element, styles) {
		const tagName = !element.tagName ? element : element.tagName;
		
		const data = {
			tagName: tagName,
			styles: styles,
			element: element
		}
		
		const createComponent = function(options) {
			const cssResult = css(this.styles, options);				
			const element = typeof this.element === 'string' ? document.createElement(this.tagName) : this.element;	
			const className = tagName + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			
			for(let option in options) {
				element[option] = options[option];	
			}
			
			const cachedClassName = addStylesheetRules(className, cssResult);
			
			if (cachedClassName) {
				element.classList.add(cachedClassName);
			}
			else {
				element.classList.add(className);
			}
			
			return element;
		}.bind(data);
						
		createComponent.__proto__.that = createComponent;
						
		return createComponent;
	}

	const domElements = [
	  'a',
	  'abbr',
	  'address',
	  'area',
	  'article',
	  'aside',
	  'audio',
	  'b',
	  'base',
	  'bdi',
	  'bdo',
	  'big',
	  'blockquote',
	  'body',
	  'br',
	  'button',
	  'canvas',
	  'caption',
	  'cite',
	  'code',
	  'col',
	  'colgroup',
	  'data',
	  'datalist',
	  'dd',
	  'del',
	  'details',
	  'dfn',
	  'dialog',
	  'div',
	  'dl',
	  'dt',
	  'em',
	  'embed',
	  'fieldset',
	  'figcaption',
	  'figure',
	  'footer',
	  'form',
	  'h1',
	  'h2',
	  'h3',
	  'h4',
	  'h5',
	  'h6',
	  'head',
	  'header',
	  'hgroup',
	  'hr',
	  'html',
	  'i',
	  'iframe',
	  'img',
	  'input',
	  'ins',
	  'kbd',
	  'keygen',
	  'label',
	  'legend',
	  'li',
	  'link',
	  'main',
	  'map',
	  'mark',
	  'marquee',
	  'menu',
	  'menuitem',
	  'meta',
	  'meter',
	  'nav',
	  'noscript',
	  'object',
	  'ol',
	  'optgroup',
	  'option',
	  'output',
	  'p',
	  'param',
	  'picture',
	  'pre',
	  'progress',
	  'q',
	  'rp',
	  'rt',
	  'ruby',
	  's',
	  'samp',
	  'script',
	  'section',
	  'select',
	  'small',
	  'source',
	  'span',
	  'strong',
	  'style',
	  'sub',
	  'summary',
	  'sup',
	  'table',
	  'tbody',
	  'td',
	  'textarea',
	  'tfoot',
	  'th',
	  'thead',
	  'time',
	  'title',
	  'tr',
	  'track',
	  'u',
	  'ul',
	  'var',
	  'video',
	  'wbr',

	  // SVG
	  'circle',
	  'clipPath',
	  'defs',
	  'ellipse',
	  'foreignObject',
	  'g',
	  'image',
	  'line',
	  'linearGradient',
	  'mask',
	  'path',
	  'pattern',
	  'polygon',
	  'polyline',
	  'radialGradient',
	  'rect',
	  'stop',
	  'svg',
	  'text',
	  'tspan'
	];
    
	const data = {
		css: css,
		tag: (tag) => constructWithOptions(CuteComponent, tag)
	};
	
	const cuteComponent = (element) => function(options){
		for(let i = 0; i < this.styles.length; i++) {
			const currentStyles = this.styles[i];
			
			const cssResult = css(currentStyles, options);				
			
			const className = element.tagName.replace('-', '').toLowerCase() + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			
			for(let option in options) {
				element[option] = options[option];	
			}
			
			const cachedClassName = addStylesheetRules(className, cssResult);
			
			if (cachedClassName) {
				element.classList.add(cachedClassName);
			}
			else {
				element.classList.add(className);
			}
		}
		
		return this;
	}
		
	const cute = window.cute = (...args) => (function(args) {
		if (!this.styles) {
			this.styles = [];
		}
		
		this.styles.push(args);
		
		return this;
		
	}.bind(data))(args);
	
	cute.tag = data.tag;
	cute.css = css;
	data.cute = cute;
	
	data.querySelector = function(selector, options) {		
		const element = document.querySelector(selector);
		
		if (!element) {
			return this;
		}
		
		return cuteComponent(element).bind(this)(options);
	}
	data.querySelectorAll = function(selector, options) {	
		const that = this;
		
		document.querySelectorAll(selector).forEach(function(element) {
			cuteComponent(element).bind(that)(options);
		});
		
		return this;
	}
	
	domElements.forEach(domElement => {
	  data[domElement] = (options) => {
		  return data.querySelectorAll(domElement, options);
	  }
	});

	window.addEventListener('load', function() {
		const allElements = document.body.querySelectorAll('*');

		allElements.forEach(element => {
			  if (element.id) {
				data[element.id] = data['#' + element.id] = cuteComponent(element);			
			  }
			  else if (element.classList.length > 0) {
				data['.' + element.className.split(' ')[0]] = cuteComponent(element);
			  }
			  
			  if (domElements.indexOf(element.tagName.toLowerCase()) === -1) {
				 class SmartHTMLElements extends HTMLElement {
					  constructor() {
						// Always call super first in constructor
						super();
					  }
					} 
				  customElements.define(element.tagName.toLowerCase(), SmartHTMLElements, {extends: 'div'});
			  }
		});
	});
})();