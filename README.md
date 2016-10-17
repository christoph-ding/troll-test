# Word Count Validator

## Instructions
        # Get my code
        git clone https://github.com/ironpup/troll-test
        cd troll-test

        # install the dependencies / create a local environment
        npm install

        # run the tests
        npm test

        # start the server
        npm start

## Assumptions

I assumed that you would want words to be counted even if they have punctuation or strange capitalization.  

For example, in the following passage, I assume that the word 'hello' occurs 4 times:
> HELLO, hello hello! Hello?

I also assumed that the frequency hash in the user posted request object will be formatted to a standard.  

I did not feel like writing the extra step that standarizing the user submitted frequency.

## Decisions / Considerations

I know how to promise libraries but wanted to demonstrate that I am strong with the 'fundamentals' of closures and callback chains.

I know the prompt said to write code as I would in the workplace, but I really wanted to show that I could handle async code without relying on promise libraries, although in my normal work I use bluebird.

Callback chains are incredibly difficult to unit test.

Also, there is a high level of modularity here and many directories with only a single file in them, for example: there is only a single service in the 'services' folder.

I did this to demonstrate how I might scaffold a larger project with more features, and my organizational thinking

## Further Things

There are a number of random choices made by the test generator: the sample text
and which words to exclude.

If I had more time or was in a work environment, I would have used sinon to mock out
random number generation for the sake of testing, but ran out of time here.

I mock quite often, and I would certainly write more tests.

Finally, I would review my commit log and probably squash many commits.
