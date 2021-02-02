# mlgame
## A general snake game controlled with audio keywords

Our model responds according to the audio keywords like Up, Down, Left, Right and moves the snake in that directiion.

## How it's made?

### Step-1:
we collected a open source snake game in which a snake moves in a 2 dimensional space randomly. A special object is placed randomly in the space so that when the snake passes through that object i.e., when the snake eats the object, The size of the snale grows by 1 unit.

### Step-2:
We train an audio model in my teachable machine using four audio classes namely Up, Down, Left, Right. After training the model we uploaded the model to the cloud.

### Step-3:
Combining the Snake game and Myteachable machine model with Javascript.
The output of our code is displayed in the below repl.i link.

# repl
## https://mlgame.yalangisanjay.repl.co/

