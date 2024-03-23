# games-of-life
Implementing [Conway's game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) in multiple different programming languages.
This is not as simple as finding the module in each language that does the trick for me. This will ultimately be a place to track how well I can program in whichever language implementations I have listed.

**Does a completed challenge in a language mean I am an expert in the language?** Nah, you're dreaming, but it does imply that I have a working understanding of the syntax. Wisdom and practice in the language will come with further work experience, given the chance.

## Implemented Languages
_Currently none will be completed, but this can show what languages I want to learn and have learned so far._
- [x] HTML + CSS + Javascript
- [ ] Python
- [ ] Java
- [ ] C
- [ ] _C++_
- [ ] _Scala_
- [ ] _Golang_

_Italics mean it's a language I want to learn._

## Rules

### 1. Requirements of the output.
If these conditions are not satisfied, then I cannot check the language off in the above list.
- Runs on Windows (I will not bother with multi-platform support).
- The game starts with a random state of cells.
- The game will launch with a grid of size 256x144.
- The game can be paused by pressing `SPACEBAR`.
- The game can be cleared by pressing `c`.
- A random state can be repopulated by pressing `r`.
- Individual cells can be activated/deactivated by clicking on them.
- The game runs correctly. See the [Conway's Game of Life Wikipedia Page for the rules](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- The framerate of the game can be adjusted with arrow keys (`up`, `down`).
- The code has proper commenting.
- There is a README which explains how to run the code and provides a general description of the implementation/design.

### 2. Minimal foreign code.
This means I will endeavour to use very little code I haven't personally committed.
The challenge presents a great case to learn as many fundamentals in the selected language as possible.
- I will need to make decisions to design a UI of sorts. This means working with graphics and creating my game-loop.
- I will design my data structures, teaching me memory management principles where necessary.
- Standard libraries are fair game, however.

### 3. Tutorial blindness.
I will endeavour to avoid tutorials that implement the Game of Life in my selected language.
- The algorithm should be similar each time so I'm not reinventing the wheel per language (although I predict I might struggle with OCAML).
- General tutorials on the language are fine, but I need to be wary of tutorial hell.

### 4. "A-I won't use it like that."
AI is very useful and I could easily ask it to write the games for each language.
This would defeat the purpose of the challenge. I will only use AI as an alternative to Stack Overflow if I am especially desperate.
