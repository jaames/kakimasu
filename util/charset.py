# charset.py - lazy utility script for compiling character svgs, animation data and details into a single .json
#
# Usage:
#   python charset.py [charset directory]
#
# The charset directory should have the following:
#   - 'base.json' which contains the data and animation timings for each character in an array format, which an object for each character:
#       - id
#       - romaji (pronunciation/name for the character in the Latin alphabet)
#       - timings (array of timings for each path)
#   - an 'svg' directory containing an svg file for each character, in the format of [character id].svg
#
# For an example, check out https://github.com/jaames/kakimasu/tree/master/charsets/hiragana

from os.path import splitext

from sys import argv

import xml.etree.ElementTree as xmlParser
import json

# xml namespace for svgs
# ref: https://docs.python.org/3/library/xml.etree.elementtree.html#parsing-xml-with-namespaces
ns = {"svg": "http://www.w3.org/2000/svg"}

charSetDir = argv[1]

with open(charSetDir + "/base.json") as file:
    charMap = json.load(file)

for char in charMap:

    if "spacer" in char: continue

    tree = xmlParser.parse(charSetDir + "/svg/" + char["id"] + ".svg")
    root = tree.getroot()

    pathGroup = root.find("svg:g", ns)[0]

    # for debugging:
    # print(char['id'])
    # for path in pathGroup:
    #    print(path.attrib)

    # lazyyyy fallback for if there's no defined stroke timings
    timings = char["timings"] if "timings" in char else [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]

    # create an array of svg paths (d) and their stroke timings (t)
    char["paths"] = [{"d": path.attrib['d'], "t": timings[i]} for i, path in enumerate(pathGroup)]

    # we don't want the timings array in the compiled file
    if "timings" in char: del char["timings"]

with open(charSetDir + "/compiled.json", "w") as out:
    out.write(json.dumps(charMap, sort_keys=True))

print("Finished compiling " + charSetDir)
