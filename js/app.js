// findIndex helper, since it doesn't have great browser support right now
function findIndex(array, predicate, fromRight) {
  var length = array.length,
      index = fromRight ? length : -1;

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}


var app = (function () {

  // some potentially useful things to keep track of
  var $body =               document.body;
  var $gridViewContainer =  document.getElementById('grid-view');
  var $modalViewContainer = document.getElementById('modal-view');

  var charSet = {
    // getItemDetails
    // find and fetch an item from charSet.items by its ID
    getItemDetails: function (itemId) {
      // if this.items doesn't exist yet, then there's nothing to fetch
      if (!this.items) {
        return null;
      }
      // find the index of the item in the items array
      var i = findIndex(this.items, function (item) {
        return item.id === itemId;
      });

      var data = this.items[i];
      // we'll also need to get adjacent chacters if possible
      data.prevItemId = this.items[i - 1] ? this.items[i - 1].id : false;
      data.nextItemId = this.items[i + 1] ? this.items[i + 1].id : false;
      return data;
    },
    // loadFromJSON
    // load a set of items fro a JSON file, call callback when done
    loadFromJSON: function (url, callback) {
      // we'll use an AJAX request to get the json
      var req = new XMLHttpRequest();

      req.onreadystatechange = function () {
        if(req.readyState == 4 && req.status == 200) {
          var resp = JSON.parse(req.responseText)
          this.items = resp;
          callback ? callback.call(this, resp) : false;
        }
      }.bind(this);

      req.open("GET", url, true);
      req.send();
    }
  }

  // modal Vue instance, this does most of the work
  var modalView = new Vue({
    el: $modalViewContainer,
    data: {
      isOpen: false,
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
      // listen for when the open item changes and re-init the animation instance
      this.$watch('item', function () {
        this.animation.init()
        this.animation.finish()
      })

    },
    methods: {
      // open the modal view, or switch the character
      open: function (itemId) {
        this.item = charSet.getItemDetails(itemId);
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

      play: function () {
        this.animation.reset()
        this.animation.play()
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
      items: []
    },
    ready: function () {
      // load default set
      this.loadSet('charsets/hiragana/compiled.json')
    },
    methods: {
      open: modalView.open,
      // switch out character set from another JSON
      loadSet: function (url) {
        charSet.loadFromJSON(url, function (resp) {
          this.items = resp;
        }.bind(this));
      }
    }
  });

  return {
    gridView: gridView,
    modalView: modalView,
    charSet: charSet
  }

})();
