import urllib
print('This script will download avatars for a given range of Pokemon.')
minPokemonId = raw_input('Start ID: ')
maxPokemonId = raw_input('End ID: ')
for x in range(int(minPokemonId), int(maxPokemonId)+1):
    
    urllib.urlretrieve("http://pokeunlock.com/wp-content/uploads/2015/01/" + str(x).zfill(3)+ ".png", str(x) + ".png")