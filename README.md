# Cute CSS in JS

&nbsp;
[![Price](https://img.shields.io/badge/price-FREE-0098f7.svg)](https://github.com/bmarkov/cute-css/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/cute-css.svg?style=flat)](https://www.npmjs.com/package/cute-css)
[![License: APACHE](https://img.shields.io/badge/license-APACHE-blue.svg)](https://github.com/bmarkov/cute-css/blob/master/LICENSE)

# &lt;Cute&gt;

## Installation 

```npm i cute-css

[Live Demo ↗](https://bmarkov.github.io/cute-css/)

```
cute`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;     
    `
    .querySelector('.wrapper');

  cute`
    padding: 4em;
    background: papayawhip;
    `
    .querySelector('.title');
```

```
<div class="wrapper">
  <div class="title">Hello!!! I am Cute</div>
</div>
```

The above code's result is:

[<img src="https://raw.githubusercontent.com/https://github.com/bmarkov/cute-css/master/cute-js.png" alt="Screenshot of Cute CSS">](https://bmarkov.github.io/cute-css/)

```
 cute`
      display: inline-block;
      border-radius: 3px;
      padding: 0.5rem 0;
      text-decoration: none;
      text-align: center;
      font-size: 18px;
      line-height: 1.6;
      margin: 0.5rem 1rem;
      width: 11rem;
      cursor: pointer;
      background: #3F51B5;
      color: #fff;
      border: 2px solid #3F51B5;
      transition: all 0.2s;

      ${properties => properties.secondary ? cute.css`
        background: white;
        color: #3F51B5;
      ` : ''}

      ${onhover => cute.css`
        background: #444;
        color: #fff;
        border-color: #444;
      `}    

      ${onactive => cute.css`
        background: #007ACC;
        color: #fff;
        border-color: #007ACC;
      `}                  
    `
    .okButton()
    .cancelButton({secondary: true})
```            

```
   <primary-button id="okButton">OK</primary-button>
   <secondary-button id="cancelButton">CANCEL</secondary-button>
```     

[<img src="https://raw.githubusercontent.com/https://github.com/bmarkov/cute-css/master/cute.png" alt="Screenshot of Cute CSS">](https://bmarkov.github.io/cute-css/)
