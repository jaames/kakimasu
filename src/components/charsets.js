// import charset JSON files and parse into opjects
import hiragana from "../charsets/hiragana.json";
import katakana from "../charsets/katakana.json";

var charsets = {
  hiragana,
  katakana,
}

var findItemById = function (set, id) {
  var ret = set.filter((item) => {
    return item.id === id;
  });
  return ret.length > 0 ? ret[0] : null;
};

for (var setId in charsets) {
  if (charsets.hasOwnProperty(setId)) {
    var set = charsets[setId];
    charsets[setId] = set.map((item, index, arr) => {
      item.prevItem = findItemById(set, item.prev || (arr[index - 1] ? arr[index - 1].id : false));
      item.nextItem = findItemById(set, item.next || (arr[index + 1] ? arr[index + 1].id : false));
      return item;
    });
  }
}

export default charsets;
