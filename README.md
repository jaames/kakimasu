###    kakimasu
###### learn how to write Japanese kana
___

When I started to learn Japanese, I had the most difficulty with the writing system. Japanese uses a mix of two phonetic alphabets (hiragana and katakana), and a few thousand kanji, which are somewhat pictographic. You'll be forgiven if you think that sounds rather overwhelming. (':

I wanted to build an interesting way to learn how to write Japanese kana, utilizing modern web technology -- something that I feel other Japanese learning resources are yet to make use of.

For now kakimasu only has hiragana and katakana, but I intend to keep working on improving and adding to it!

#### Roadmap:

###### Completed:

 - [x] Added [katakana](https://en.wikipedia.org/wiki/Katakana) character set
 - [x] Added play/pause toggle for animation playback
 - [x] Make it more obvious that certain sounds aren't present in the Japanese language and they're not just missing because of some bug
 - [x] Keyboard navigation (left/right = prev/next items and spacebar = play/pause)

###### Upcoming:

 - [ ] Do proper [feature detection](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard) and display a message or something if a browser is not supported
 - [ ] Tweak character animation timings and svgs to get them juuust right
 - [ ] Add option to change playback speed

###### Future plans:

 - [ ] Add level 1 [kanji](https://en.wikipedia.org/wiki/Kanji) character set
 - [ ] Add a 'test' feature, i.e. show random characters and users have to guess what they are
 - [ ] Add basic vocabulary words for each character
 - [ ] Find someone that can provide voice recordings of the character pronunciations?


#### Third-party JS Libraries Used:
- [Vue JS](http://vuejs.org/)
- [Vivus](https://github.com/maxwellito/vivus)

#### Building / Contributing

Clone this repo to your local machine:
```bash
git clone https://github.com/jaames/kakimasu.git
```

kakimasu is built using [vbuild](https://github.com/egoist/vbuild), which must be [installed globally with npm](https://github.com/egoist/vbuild#quick-start) before building.
