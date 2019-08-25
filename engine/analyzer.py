from acora import AcoraBuilder 
import sys

class TOSAnalyzer: 
    def __init__(self, text):
        self.text = text
        keywords = ["ownership", "owner", "own", "propietary", "tracking", "track", "store", "keep", "keeping"]
        builder = AcoraBuilder()
        builder.add(*keywords)
        self.finder = builder.build()
        
    def find(self):
        return self.finder.findall(self.text)

# read ToS from stdin and feed them to the TOS analyzer
analyzer = TOSAnalyzer(sys.stdin.read())

# for each match, output the start and end positions
for kw, pos in analyzer.find():
    print(f"{pos}:{pos+len(kw)}")