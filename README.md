# Slick

[![npm version](https://img.shields.io/badge/Version-0.0.1-lightgrey.svg)](https://github.com/geoctrl/slick/releases/tag/v0.0.1)

Slick components written in ES6 and transpiled to ES5 with `BabelJS`.

### Getting Started

*To use animations, Slick requires VelocityJS `>=1.2.0`.*

Download the repo or install with Bower:

    bower install slick-components --save

Add required `dist/slick.min.js` and `dist/slick.min.css` files to your project (unminified versions are available as well).

### Components

####slick-input

    new SlickInput('selector', {options}');

Options       | Default  | Description
------------- | ---------|--------------
animate       | `true`   | Use VelocityJS animiations
duration      | `300`    | Duration of animation
