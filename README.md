# r

## About

* See it live here: 
	** YOUTUBE_LINK

## How it Works?
The data structure that I applied for this project was a Doubly-LinkedList. The reason why I decided to use this was because I was going to make a lot of insertions/deletions, and I believed this would be the most efficient data structure given my use-case. 

How I'm storing the user's input is by consistently adding and removing to an instance of the doubly-linkedList, and resetting the local state with properties of the new doubly-linkedList. My local state consists of:

*  `.current`        : instance of the linkedList that represents the current command prompt
*  `.currentText`    : an object that tracks the entire current line (`1 + 3 + 4`) as well as a unique id that is associated with that line.
*  `.consoleIsActive`: boolean tracking whether the last click was in the console or not.
*  `.currentKey`     : a string that is the `id` property of the current character of the command line.
*  `.history`        : Array holding all entered commands
*	`.currentIndex`   : the index of the current command-line in respect to the history array
*  `.focus`          : the character value at the `currentKey` id in the `.current` linkedList instance
* 	`.left`           : String of all characters left to the `.focus` character
*  `.right`          : String of all characters right to the `.focus` character`

Everytime an edit occurs, I will first clone the existing doubly-linkedList instance (`.current`), apply the intended method (`.addNode`, `.insertNode`, `,removeNode`) to that instance, and then re-update the localState in respect to the new instance. Pretty much I'm creating a new instance every time the user types something.

When displaying every instance, the `.left`, `.right`, and `.focus` are the ones of importance. Let's say the user entered the string `ABC`. The cursor and `.focus` property are currently at the letter `C`, and let's say the user wants to move it back one spot so the cursor highlights at letter `B`. What'll happen is that we will re-calculate the `._left`, `._right`, and `._focus` properties on the doubly-linkedList so that the `.focus` property will now be at letter `B`, and the `._right` and `._left` properties will contain the characters respecitvely to the right and left of letter `B`. Now that the doubly-linkedList instance exhibits the correct properties, we update the `.right`, `.left`, `.focus` properties in our local state to match its counterparts in our doubly-linkedList instance. 

Lastly, all inputs sent to our `eval` function, which is hosted on the back-end, will be stored within our `.history` array. Examples of what might be stored would include the prior example's `ABC` or `1 + 2`.

Back to the `eval` part. All inputs are sent to the backend through a POST request to the route: `/api/eval/:id`. We are process whatever the user inputted into `eval`. 

## Primary Front-End Technologies Used:
* React
* Webpack
* Enzyme

## Primary Back-End Technologies Used:
* Express

## Startup
* `npm install` to install the package dependencies
* `node run wp` to start webpack
* `npm start` to run server

Known Issues:

- Once you get to the bottom of the console, everything isn't resizing propertly; therefore, your inputs will be pushed outside of the console.

- We could have moved a lot of the processing logic to the backend and simply send the doubly linkedList instance back and forth from the front-end to the back-end through socket.io.




