---
supertitle: Dropbox Express with ECMAScript 6+
subtitle: 'Part 6: Double boxing.'
title: 'Dropbox Express 6: Double Dropbox.'
date: 2015-05-30T01:51Z
tags:
  - dropbox
  - node.js
  - es.next
section: code
---

_This is how I built a simple server-side JavaScript app on top of the
Dropbox API, using Express.js, ECMAScript 6 (and one thing I hope will
be in ES 7), and Zombie.js for testing. It was my first time using any
of these things (except JavaScript, natch), so there are probably
better ways to do some of it. [Let me know!][contact]_

In [part 5], we set up separate environments for development and
testing. Our app is working fine, but it isn't very interesting.
Let's complicate things a little. <!-- READMORE -->

## File fetching.

Instead of just counting files in the folder, let's make the app
fetch and display the contents of the latest file. (When I wrote
the application these posts are based on, I had some very specific
requirements, but the basic gist is, show me the latest entry from
my journal.)

First, copy a couple of HTML files to the Dropbox folder for your
test app. Here are the files:

- <code>[2015-05-30.html]</code>
- <code>[2015-05-31.html]</code>

`2015-05-31.html` has a body that tells us it's the newest file, so
let's revise `test/acceptance_test.js` to look for it:

```javascript
it('displays the latest file from the Dropbox folder', function () {
  this.browser.assert.text('body', /newest file/i)
})
```

## More callbacks!

`npm test` fails because the app is still just counting files. We need
to fetch the list of files, figure out which one is the latest
(from the date in the filename), and fetch its contents. In `app.js`:

```javascript
// When a browser requests `/`, display the latest file from the
// Dropbox folder.
app.get('/', (req, res) => {
  // Ask Dropbox for a list of files in the app folder.
  client.readdir('/', (dirError, entries, dirstat, filestats) => {
    // We get either `error` or `entries` depending on whether
    // reading the directory worked.
    if (dirError) {
      // Failure! Tell the user of our disgrace.
      console.log(dirError)
      return res.send(dirError.response.error)
    }

    // Ignore files without dates in their names.
    const datedFiles = filestats.filter((e) => /^[0-9-]*\.html$/.test(e.name))
    // Get the last one.
    const latest = datedFiles.sort()[datedFiles.length - 1]

    // Ask Dropbox for the contents of the latest file.
    client.readFile(latest.path, (fileError, contents) => {
      // Another opportunity for failure!
      if (fileError) {
        console.log(fileError)
        return res.send(fileError.response.error)
      }

      // Success at last! Display the file contents to the user.
      return res.send(contents)
    })
  })
})
```

(Notice the arrow function expression in the `filter` line. We've used
arrow functions before, with multiline bodies inside curly braces. This
is a simpler way of writing a function that just evaluates an expression
and returns the result.)

This does the job&nbsp;&mdash; the test passes, and you can run
`npm start` and try it out with different combinations of files in
your development app folder&nbsp;&mdash; but it's become harder to
follow the basic logic. We're nesting callbacks within callbacks to do
what's effectively a linear procedure, and we interrupt the usual
flow&nbsp;&mdash; not once but twice&nbsp;&mdash; to talk about
what to do when things go wrong. In part 7, we'll use ECMAScript&nbsp;6
[promises] to start making this easier to read.

[contact]: mailto:code@erikostrom.com
[part 5]: /code/words/dropbox-express-5-a-sandbox
[2015-05-30.html]: /projects/dropbox-express/fixtures/2015-05-30.html
[2015-05-31.html]: /projects/dropbox-express/fixtures/2015-05-31.html
[promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
