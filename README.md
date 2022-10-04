# Tabletop Character Builder

This is a set of tabletop character utilies. This is a collection of tools for Dungeons and Dragons (DnD) dungeon masters to use for the creation of monsters for their games. The goal here is to be able create a monster from anywhere and then export the resulting stats to be able to be imported into various virtual tabletops.

**Link to project:** https://tabletop-character-builder.onrender.com

![imgur](https://i.imgur.com/15q1YrU.gif)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, MongoDB, Express, Node.js

This began as a side project to build tools for a group of my friends. Wanted to really dig deep on this stack. Began as a basic CRUB app but it has since morphed into something a lot more. Node.js, Express, and Passport are the backbones of the backend with MongoDB as the database. Utilized Materialize CSS as a framework instead of trying to build my own. Standard EJS was used as the templating engine to present the data. 

## Optimizations

Tried to minimize the amount of client side Javascript and handle as much on the backend as I could. Utilized CDNs for CSS instead of supplying bundled/minified my own for speed. Tried to optimize as much database interaction with trimming the fat on database objects and only using Javascript objects.

## Lessons Learned:

User authentication is my worst enemy. However, using passport local strategy was fairly simple to set up. Additionally, the amount of problems that occured during the development process have me a huge motivation to get interested in TDD/BDD. Additionally, I probably wouldn't have changed CSS processes 3 times during the process. Picking and sticking with Materialize from the very beginning.

## Examples:

Take a look at these couple examples that I have in my own portfolio:

**Alien Adventure:** https://github.com/ZRTAssassin/Alien-Adventure

**Dungeon Delver:** https://github.com/ZRTAssassin/Dungeon-Delver
