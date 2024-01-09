---
title: 'Svelte: first impressions'
date: 2019-07-29T15:38-0500
tags:
  - javascript
  - frameworks
status: published
section: code
---

[Svelte] is "a tool for building fast web applications." Here are a few
thoughts after
running through the (excellent)
[tutorial]. Just to get this out of the way: If it seems like I'm
wrong about something, I probably am! All I did was read the tutorial.

---

The first thing everyone tells you about Svelte is that... you know
what? Let's skip that. You've already heard it, or if you haven't I'll
tell you later.

I'm excited by what reactivity feels like in Svelte.
Here's some [code from the tutorial][reactive-declarations]:

```html
<script>
  let count = 0
  $: doubled = count * 2

  function handleClick() {
    count += 1
  }
</script>

<button on:click="{handleClick}">
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>
```

`count` is declared as a variable in a Svelte component. That's all
it took to make it reactive. Now when it's incremented in `handleClick`,
the button text is automatically updated.

The `$` label signifies a <i>reactive declaration.</i> `doubled` is not
just _initialized_ but _defined_ as `count * 2` – meaning that whenever
`count` changes, `doubled` is recomputed. And when `doubled` changes,
the paragraph below the button is automatically updated too.

All the modern frameworks have some version of this, and the differences
are subtle. All I can say is that this feels good to me.

---

<i>(By the way, how does Svelte get away with reactivity that feels this
simple? Because it's not "just JavaScript." The code above looks like
slightly funky HTML with an embedded script, and syntactically the
script is valid
JavaScript. But semantically it's different – variable assignment triggers
code execution! – and that's because Svelte isn't a framework, it's a
compiler. But we'll get to that.)</i>

---

Just as reactivity within components feels simple, so does data management
outside of them. Here's another [sample from the tutorial][custom-stores]:

```javascript
function createCount() {
  const {subscribe, set, update} = writable(0)

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(0),
  }
}
```

OK, that doesn't make a lot of sense out of context. But it creates a
data store with a standard interface (subscribe and unsubscribe), and
a custom interface (increment, decrement, reset).

I don't know what it's like to use this for complex applications, but
at this level, it's very appealing.

---

This is just a standalone feature, not a basic concept like reactivity
and data stores. But I love that Svelte templates have built-in [syntax
for promises][await-blocks]:

```html
{#await promise}
<p>...waiting</p>
{:then number}
<p>The number is {number}</p>
{:catch error}
<p style="color: red">{error.message}</p>
{/await}
```

This makes a no-brainer out of the "loading" indicators I often put
off until later because they feel like tedious boilerplate.

Also, bonus points for doing some basic accessibility checks at build time.

---

The first thing everyone else tells you about Svelte is that it's "compiled."
Most web development frameworks consist of a large bundle of code that
has to be downloaded and parsed by every user's browser, and that code
in turn has to interpret your application code to figure out what to put
on the page from moment to moment. Svelte doesn't do that.
Instead, you use Svelte to translate your application code into a small
bundle of very efficient code that already knows how it has to manipulate
the page.

The second thing everyone tells you is that, because it's compiled,
Svelte is much faster than most frameworks.

To me, those aren't the most
exciting things about Svelte. There are three reasons for that:

- While Svelte delivers an [impressively small bundle,][bundle-size]  
  that's only one component of perceived and actual [performance].
- Performance is important, but it's not the only important thing.
  Robustness matters. Developer experience matters.
- I don't know, it's just not what I think is fun.

To be clear, I'm not saying that Svelte's overall performance isn't great,
or that it isn't robust, or that the developer experience is bad. (In fact,
most of this post is in praise of the developer experience!) I'm just saying
that the "compiled, therefore performant" story itself doesn't grab me.

---

There are at least two things I'm curious about:

- What is debugging like? Is it harder because the compiled JavaScript
  is further removed from the source code?
- What is testing like? (Sounds like it's a [work in progress][testing].)

Overall, though, I'm impressed with Svelte. I'm looking forward to building
something with it, and I recommend front-end developers check it out.

[Svelte]: https://svelte.dev/
[tutorial]: https://svelte.dev/tutorial/basics
[reactive-declarations]: https://svelte.dev/tutorial/reactive-declarations
[custom-stores]: https://svelte.dev/tutorial/custom-stores
[await-blocks]: https://svelte.dev/tutorial/await-blocks
[bundle-size]: https://www.freecodecamp.org/news/a-realworld-comparison-of-front-end-frameworks-with-benchmarks-2019-update-4be0d3c78075/#metric-2-size
[performance]: https://www.freecodecamp.org/news/a-realworld-comparison-of-front-end-frameworks-with-benchmarks-2019-update-4be0d3c78075/#performance
[testing]: https://github.com/sveltejs/svelte/wiki/FAQ#how-do-i-do-testing-svelte-apps
