var app = (function () {

  // config
  var $config = {
    autoplay: false,
    defaultCharSet: 'hiragana'
  }

  // some potentially useful things to keep track of
  var $body =               document.body,
      $gridViewContainer =  document.getElementById('grid-view'),
      $modalViewContainer = document.getElementById('modal-view');

  // cache storage
  var $cache = {};

  var addToCache = function (setId, charSet) {
    $cache[setId] = charSet.map(function (item, index, arr) {
      // 'next' and 'prev' may be defined explicitly
      // otherwise we try to get the adjacent items in the array, or return false if nothing is found
      item.prevItemId = item.prev || (arr[index - 1] ? arr[index - 1].id : false)
      item.nextItemId = item.next || (arr[index + 1] ? arr[index + 1].id : false)
      return item;
    })
  };

  var getCharSet = function (setId, callback) {
    // check if the set is cached
    if ($cache[setId]) {
      callback ? callback.call(this, $cache[setId]) : false;
    }
    // else we'll use an AJAX request to get the json
    else {
      var req = new XMLHttpRequest();
      var url = './charsets/' + setId + '/compiled.json';

      req.onreadystatechange = function () {
        if(req.readyState == 4 && req.status == 200) {
          var resp = JSON.parse(req.responseText)
          addToCache(setId, resp);
          callback ? callback.call(this, $cache[setId]) : false;
        }
      }.bind(this);

      req.open("GET", url, true);
      req.send();
    }
  };

  var getCharItem = function (setId, charId) {
    if (!$cache[setId]) {
      return null;
    }

    var length = $cache[setId].length;
    var index = -1;

    while (++index < length) {
      if ($cache[setId][index].id === charId) {
        return $cache[setId][index]
      }
    }

    return null;
  };

  // modal Vue instance, this does most of the work
  var modalView = new Vue({
    el: $modalViewContainer,
    data: {
      isOpen: false,
      isPlaying: false,
      item: {}
    },
    ready: function () {
      // set up the Vivus.js svg object
      // Vivus.js docs and examples: https://github.com/maxwellito/vivus
      this.animation = new Vivus(this.$els.svg, {
        duration: 320,
        type: 'scenario-sync',
        start: 'manual',
        pathTimingFunction: Vivus.EASE,
      });

      this.animation.callback = function () {
        this.isPlaying = false;
      }.bind(this);
      // listen for when the open item changes and re-init the animation instance
      this.$watch('item', function () {
        this.animation.init();
        $config.autoplay ? this._play() : this.animation.finish();
      })

      $body.addEventListener('keyup', function (e) {
        var keyCode = e.keyCode || e.which;
        if (!this.isOpen) {
          return true
        }
        e.preventDefault();
        switch (keyCode) {
          // spacebar
          case 32:
            this.togglePlay();
            break;
          // left
          case 37:
            this.prev();
            break;
          // right
          case 39:
            this.next();
            break;
        }
        return false
      }.bind(this))
    },
    methods: {
      // open the modal view, or switch the character
      open: function (itemId) {
        this.item = getCharItem(gridView.charset, itemId);
        if (!this.isOpen) {
          this.isOpen = true;
        }
      },
      // close the card view
      close: function () {
        if (this.isOpen) {
          this.isOpen = false;
        }
      },

      next: function () {
        this.item.nextItemId ? this.open(this.item.nextItemId) : false;
      },

      prev: function () {
        this.item.prevItemId ? this.open(this.item.prevItemId) : false;
      },

      togglePlay: function () {
        this.isPlaying ? this._pause() : this._play();
      },

      _play: function () {
        // if the animation has finished, reset
        this.animation.getStatus() === 'end' ? this.animation.reset() : false;
        this.isPlaying = true;
        this.animation.play()
      },

      _pause: function () {
        this.isPlaying = false;
        this.animation.stop();
      },

      // util wrapper for ramjet transitions
      // ramjet.js docs and examples: https://github.com/Rich-Harris/ramjet
      _transition: function (fromTarget, toTarget, callback) {
        // ramjet takes callback functions, to which I want to bind `this`
        // but we don't always need callbacks, so let's make them optional
        callback = callback ? callback.bind(this) : false;
        ramjet.transform(fromTarget, toTarget, {
          duration: 320,
          easing: ramjet.easeInOut,
          done: callback,
          appendToBody: true
        });
      }

    },
    // Vue transitions for this element
    transitions: {
      // modal opening / closing transition
      modal: Vue.transition(null, {
        // this will run when isOpen is set to true,
        // Vue will set `display: block;` before this
        enter: function () {
          // find the card element that belongs to the selected kana
          var $card = document.getElementById(this.item.id);
          // disable mouse events on the body
          $body.classList.add('u-no-mouse', 'u-no-scroll');
          // init the card opening transition
          this._transition($card, this.$els.modal, function () {
            // once open, make sure the modal is visible
            ramjet.show(this.$els.modal);
          })
          // set the modal background opacity to 1 (which is transitioned with css)
          ramjet.show(this.$el)
        },
        // this will run when isOpen is set to false
        // Vue will set `display: none;` after this
        leave: function () {
          // find the card element that belongs to the selected kana
          var $card = document.getElementById(this.item.id);
          // allow mouse events on the body
          $body.classList.remove('u-no-mouse', 'u-no-scroll');
          // hide the modal card
          ramjet.hide(this.$els.modal);
          // init the card closing transition
          this._transition(this.$els.modal, $card);
          // hide the modal background
          ramjet.hide(this.$el)
        },
      })
    }
  });

  var gridView = new Vue({
    el: '#grid-view',
    data: {
      items: [],
      charset: $config.defaultCharSet
    },
    ready: function () {
      // load default set
      this.loadSet(this.charset)
      this.$watch('charset', function () {
        this.loadSet(this.charset)
      })
    },
    methods: {
      open: modalView.open,
      // switch out character set from another JSON
      loadSet: function (setId) {
        getCharSet(setId, function (resp) {
          this.items = resp;
        }.bind(this));
      }
    }
  });

  return {
    gridView: gridView,
    modalView: modalView,
    $cache: $cache,
    $config: $config
  }

})();
