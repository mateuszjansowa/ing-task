
# ING recruitment task – web components with Lion &amp; Lit


## Setup

1. Install the dependencies using node v16 +.



```javascript

npm i

```



2. Install json-server globally to fake rest API



```javascript

npm install -g json-server

```



3. Run both the server and the json-server with the command below.

```javascript

npm start

```
This starts local server on port **8000** & json-server on **3000**

## What I've learned
Thank you for the challenge!

It was exhausting but very satisfactory. I had an opportunity to gain experience in web components and the Lit framework. I've really enjoyed a small amount of boilerplate and the fact that I can use default browser features to achieve what I want. I really liked the freedom of structuring the project in my manner. Lion components were fun to work with. I didn't have to worry about accessibility too much.

I would try to create my next project using web components & Lit.


## My feedback

1. I've spotted an issue in the docs related to `<lion-input-amount>` component. In **[Modifying the amount of decimals](https://lion-web.netlify.app/components/input-amount/use-cases/#modifying-the-amount-of-decimals)** chapter there is a code missing in the example. I had to go through node_modules in order to **connect correct formatOption**.
2. I believe that the JSON you provided has got a **bug** related to **houseNumber** field. There are two min-number validators. I have changed one to max-number.
3. Your docs are a pleasure to read, but I believe they can be improved with **interactive examples** (e.g. hosted on CodeSandbox).
4. I'm not a huge fan of the sidebar. It could be more user friendly if there were buttons at the bottom navigating to next chapter.


# Thank you!