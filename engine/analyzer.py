from acora import AcoraBuilder 

class TOSAnalyzer: 
    wordBank = ["ownership", "owner", "own", "propietary", "tracking", "track", "store", "keep", "keeping"]
    builder = AcoraBuilder()
    builder.add(wordBank)
    finder = builder.build

    def __init__(self, termsOfService):
        this.termsOfService = termsOfService.tolower()
        
    def findTOS(self):
        keywords = finder.findall(termsOfService)
        return keywords
    
    def display(self):
        print("Your terms of services may have some suspicious keywords.")
        for index in range(len(keywords)):
            if keywords[index][1] >= 1:
                print(keywords[0][index])
