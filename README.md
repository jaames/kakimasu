> **Note:** This project is no longer maintained. Most of it was written when I wasn't super familiar with Vue or modern CSS so there's lots of "nooby" code and I'd rather move on to focus on my more recent projects. In Jan 2019 I did some minimal changes to update dependencies and allow the app to be built as a static site so it could be hosted on GitHub Pages, but otherwise I won't be updating the code any further. 

> However! Contributions are welcome if you're interested in the project. Most of these are friendly enough to tackle if you're at a beginner-to-intermidiate level, and could be a great way to get more acquainted with Vue!
- The overall code quality isn't great; it needs refactoring to use modern JavaScript features more competently, and there's also a number of Vue best practices which aren't adhered to:
	- Components shouldn't really be navigating to other routes, they should [communicate with their parents](https://alligator.io/vuejs/component-communication/) instead.
    - When rendering lists with `v-for`, a unique `key` prop should also be provided for each item, as mentioned [here](https://vuejs.org/v2/guide/list.html#key).
- All of the CSS layout stuff uses floats where it would be much more suitable to use CSS Grids or Flexbox. Also, using [Foundation](https://foundation.zurb.com/sites) for a small project like this is kinda overkill. 
- Implementing a state management library like [vuex](https://vuex.vuejs.org/) could be useful, especially for storing character data and controling navigation between routes.
- The script that generates the character JSONs is written in Python, which in hindsight doesn't really make sense in a JavaScript project. :P This should really be rewritten as a Node JS script.

---

## kakimasu

##### Learn how to write Japanese kana


When I started to learn Japanese, I had the most difficulty with the writing system. Japanese uses a mix of two phonetic alphabets (called "Hiragana" and "Katakana") and "Kanji", which are more logographic.

I wanted to build an interesting way to learn how to write Japanese, utilizing modern web technology -- something that I feel other Japanese learning resources are yet to make use of.

For now, Kakimasu only has Hiragana and Katakana characters, however I plan to add basic level Kanji in the future, along with other features. (:

#### Third-party Libraries Used:

- [Vue JS](http://vuejs.org/)
- [Vivus](https://github.com/maxwellito/vivus)
- [vue-router](https://github.com/vuejs/vue-router)
- [vue-ga](https://github.com/egoist/vue-ga)

#### Building / Contributing

```bash
# To get started, clone this repo to your local machine
git clone https://github.com/jaames/kakimasu.git

# Make sure you've navigated into the project folder before then next steps

# Install the Node modules required
npm install

# Make whatever changes you want to make to the source code in src/

# Run the dev build script,
# This will compile all the files and start a development preview server on port 4000
# (Check out the vbuild documentation for more details!)
npm run dev

# If you wish to compile a "production" build,
# This will compile everything in production mode to the dist/ directory
npm run build
```
