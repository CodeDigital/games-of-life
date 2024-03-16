# [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) (HTML/JS/CSS)

## Background

Here is my first solution to the challenge: Conway's Game of Life in basic web front-end languages. I learned HTML/CSS back in 2016 and made an awful website with my newfound skills at the time, as is customary. What's interesting is that HTML was not the first programming language I ever learned. You'll need to read through other solutions to see if I've implemented the Game of Life in the language that brought me into code.

## Execution

To run this version of the Game of Life, run the `index.html` file in your browser. Simple as that.

## Design

I use that weird JS functions-as-classes pattern to create a cell class. This stores the state of each cell (alive, not alive), the state it will have next round, as well as functions necessary to update this.

I split functionality into "modules". This is great for future me, who will want to add commenting, and refactor some of the code to get it working more how I want.

Finally, I want to address the `fps-helpers.js` script. Yes, I used the `-helpers` suffix. I have seen posts on LinkedIn claiming that it's lazy naming. Honestly, I don't want to over-modularize but splitting the file further (only 18 lines). If you have a better name suggestion, feel free to contact me.