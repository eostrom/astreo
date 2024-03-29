---
supertitle: Dropbox Express with ECMAScript 6+
subtitle: 'Part 4: Introducing the Dropbox API.'
title: 'Dropbox Express 4: The Dropbox API.'
date: 2015-05-25T23:20Z
tags:
  - node.js
  - express.js
  - es.next
  - dropbox
  - dotenv
section: code
---

_This is how I built a simple server-side JavaScript app on top of the
Dropbox API, using Express.js, ECMAScript 6 (and one thing I hope will
be in ES 7), and Zombie.js for testing. It was my first time using any
of these things (except JavaScript, natch), so there are probably
better ways to do some of it. [Let me know!][contact]_

In [part 3], we wrote the simplest Express app I could think of. Now,
let's write the simplest Express app I can think of that uses the
Dropbox API. All it will do is count the number of files in a folder. <!-- READMORE -->

## An app test.

In `test/acceptance_test.js`, change what the `it` block tests:

```javascript
it('displays information about the Dropbox folder', function () {
  this.browser.assert.text('body', /Files found: 0/i)
})
```

That's it for the test! We'll come back later and complicate it,
but for now, we just need the app to report that an empty folder
is empty.

## A test app.

To use the Dropbox API, we need to register an app with Dropbox.
Go to the [Dropbox App Console] and click the "Create App" button.
Create a Dropbox API app, limited to its own folder. Call it whatever
you like; I called mine "journal dev," because I knew what kind of app
I was going to write.

## Configuration.

_We're not going to do proper authentication with OAuth 2. I couldn't
get Zombie, or any other testing tool I tried, to make it through the
Dropbox login process, and eventually I decided I didn't need it for
my own purposes. Instead, you'll generate an access token that your
own app can use to access your own files._

When you created an app just now, you ended up on a settings page for
the new app. Under the heading "Generated access token," click the
"Generate" button to generate your token. We'll use that token to
configure the app.

One way to do that would be to hard-code the token in our source code,
but this is both insecure and inflexible. Another approach, used in
hosting environments such as Heroku, is to store it in an
environment variable, but this can be a pain during development.
The [`dotenv`][dotenv] package lets you simulate environment
variables by storing them in a file called `.env`. To install it:

```bash
npm install --save dotenv
git ignore .env
```

In general, you shouldn't check your security credentials into git,
so we told git to ignore the `.env` file. Now let's create it,
filling in your access token from the settings page:

```shell
DROPBOX_AUTH_TOKEN=Y0urL0ng&My5t3r10u5Acc355T0k3nG03sH3r3
```

And add a line at the top of `test/acceptance_test.js` to get this
configuration loaded:

```javascript
require('dotenv').load()
```

Now we can use the Dropbox token in our Express application.

## Application code.

Most of `app.js` needs to change. Here's the new code:

```javascript
const express = require('express'),
  Dropbox = require('dropbox')

// Initialize a Dropbox client.
const client = new Dropbox.Client({
  // Get auth token from `.env` or environment variables.
  token: process.env.DROPBOX_AUTH_TOKEN,
})

// Create an Express application.
const app = express()

// When a browser requests `/`, count the files in the Dropbox folder.
app.get('/', (req, res) => {
  // Ask Dropbox for a list of files in the app folder.
  client.readdir('/', (error, entries) => {
    // We get either `error` or `entries` depending on whether
    // reading the directory worked.
    if (error) {
      // Failure! Tell the user of our disgrace.
      console.log(error)
      return res.send(error.response.error)
    }

    // Success! Tell the user what we've learned.
    res.send(`Files found: ${entries.length}`)
  })
})

module.exports = app
```

`client.readdir` is an asynchronous method, because that's how
JavaScript rolls: it returns immediately, but it doesn't return
anything useful. Instead, it goes off and requests information
from Dropbox, and when Dropbox responds, `readdir` calls the
callback function that we provided, supplying it with either an
error or a list of entries. Our callback then reports the
results to the browser.

We need to install the Dropbox package (created, but not
officially supported, by Dropbox):

```bash
npm install --save dropbox
```

Run `npm test`. It passes! Our folder is empty!

We can't actually try it in the browser yet, because our development
server (`index.js`) doesn't load the `dotenv` configuration. In [part 5],
we'll fix that, discover some gotchas, and write a better test.

[contact]: mailto:code@erikostrom.com
[part 3]: /code/words/dropbox-express-3-an-app
[dropbox app console]: https://www.dropbox.com/developers/apps
[dotenv]: https://www.npmjs.com/package/dotenv
[part 5]: /code/words/dropbox-express-5-a-sandbox
