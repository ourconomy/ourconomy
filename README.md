# Hey, this is ourconomy!

This is the ourconomy version of Karte von morgen. From this codebase, it will develop the products/services functionalities.


# The products and services version of Karte von morgen

This custom version of [Karte von morgen](https://github.com/flosse/kartevonmorgen) brings products and services to your sustainable world.  

![The new menu entry for products](produkte_neu.png)  ![products and companies in the result list](produkte_ergebnis.png)

Technically, virtually everything that exists for 'entries' in the codebase has been replicated for 'products' -- except the ResultList component and its items. 
Products and services are called _products_ in this fork of Karte von morgen. 
Currently, they cannot yet be rated nor do they have categories. 
The special backend for this version of the map is the [ourconomy version of Open Fair DB](https://github.com/ourconomy/openfairdb). 

Below, the original announcement of Karte von morgen:  

# Karte von morgen

![Screenshot](https://raw.githubusercontent.com/flosse/kartevonmorgen/master/screenshot.jpg)

## Mapping for Good

von morgen supports kindness, sustainability and joint action.
Everything that brings a little happiness to our world.
We believe that living in a de‐stressed, environmental‐friendly and
trust‐worthy society, is already in progress.
We want to support people in finding ways to embrace those values.

The Map von morgen is a website and app, that allows users to share their
favorite places in the world. Places that are forward‐thinking and inspiring.
The goal is to collect projects, companies and events that make a world of
tomorrow, already experienceable today.

Demo: [https://kartevonmorgen.org/](https://kartevonmorgen.org/)

## Development

[![Build Status](https://secure.travis-ci.org/flosse/kartevonmorgen.svg?branch=master)](http://travis-ci.org/flosse/kartevonmorgen)
[![Dependency Status](https://gemnasium.com/flosse/kartevonmorgen.svg)](https://gemnasium.com/flosse/kartevonmorgen)
[![Dependency Status](https://dependencyci.com/github/flosse/kartevonmorgen/badge)](https://dependencyci.com/github/flosse/kartevonmorgen)
[![License](https://img.shields.io/badge/license-AGPLv3-blue.svg?style=flat)](https://github.com/flosse/kartevonmorgen/blob/master/LICENSE)

Are you're interested in contributing to KVM?
The following is a description of a quickstart.
If you're looking for a more comprehensive introduction,
have a look at [CONTRIBUTING.md](CONTRIBUTING.md).

### Dependencies

To be able to start development you'll need the following tools:

- [git](https://www.git-scm.com/)
- [Node.js](https://nodejs.org/) version 6.x
- [npm](https://www.npmjs.com/package/npm) version 3.x
- [OpenFairDB](https://github.com/flosse/openfairdb)

Now clone this repository:

    git clone https://github.com/flosse/kartevonmorgen

Go to the root of it and install all the dependencies:

    cd kartevonmorgen/
    npm install

### Build

To build the web application run:

    npm run pack

The result can be found in `dist/`.
To build a Nix derivation, run

    nix-build -E '(import <nixpkgs>{}).callPackage ./kartevonmorgen.nix {}'

*Note*: Sometimes the build fails because of a bad binary cache, so just disable it:

    nix-build -E '(import <nixpkgs>{}).callPackage ./kartevonmorgen.nix {}' --option use-binary-caches false

### Local development setup

Download the OpenFairDB Server

    wget https://download.ofdb.io/openfairdb-x86_64-linux-v0.3.1.tar.gz

unpack it

    tar xzf openfairdb-x86_64-linux-v0.3.1.tar.gz

and run it

    ./openfairdb

Now `openfairdb` is listening on port 6767.

    cd /path/to/kartevonmorgen/
    npm start

The web app is now listening on port 8080.
Open it in your browser `http://localhost:8080`.

On every file change in `src/`, the app will be build
for you and the browser reloads automatically.

### Tests

All the tests can be found in the `spec/` folder.
To run the tests type

    npm t

### Nix

If you're using [Nix](http://nixos.org/nix/) or [NixOS](http://nixos.org/) you
can get your complete development environment by just typing

    nix-shell dev-env.nix

Updating the `node-packages.nix` works as follows:

    cd path/to/your/kartevonmorgen/
    git clone https://github.com/NixOS/npm2nix
    nix-shell -p nodejs
    node npm2nix/lib/npm2nix.js package.json node-packages.nix

...and don't forget to update 'kartevonmorgen.nix' ;-)

### Backend

KVM uses the [OpenFairDB](https://github.com/flosse/openfairdb) as its backend.

## License

Copyright (c) 2015 - 2018 Markus Kohlhase <mail@markus-kohlhase.de>

This project is licensed under the [AGPLv3 license](http://www.gnu.org/licenses/agpl-3.0.txt).
