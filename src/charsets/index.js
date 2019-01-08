// import charset JSONs
import hiragana from "./hiragana/compiled.json";
import katakana from "./katakana/compiled.json";

var charsets = {
  hiragana,
  katakana,
}

var findItemById = function (set, id) {
  var ret = set.filter((item) => {
    return item.romaji === id;
  });
  return ret.length > 0 ? ret[0] : null;
};

// parse the character sets and add some references for the previous / next items that will come in handy later!
for (var setId in charsets) {
  if (charsets.hasOwnProperty(setId)) {
    var set = charsets[setId];
    charsets[setId] = set.map((item, index, arr) => {
      item.prevItem = findItemById(set, item.prev || (arr[index - 1] ? arr[index - 1].romaji : false));
      item.nextItem = findItemById(set, item.next || (arr[index + 1] ? arr[index + 1].romaji : false));
      return item;
    });
  }
}

export default charsets;
