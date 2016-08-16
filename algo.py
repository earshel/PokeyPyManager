
def logAndDump(action,curPoke,status):
    iv = (round(inventory.party[poke].individual_attack + inventory.party[poke].individual_defense + inventory.party[poke].individual_stamina) / 45)
    #TRANSFER POKEMON
    if action.find("Transfer") > -1:
        if inventory.party[poke].favorite: #SKIP FAVORITED POKEMON
            logging.critical("Found Pokemon, skipping transfer - it's favorited!")
            
        else:
            status = "Transferring Pokemon with ID " + str(curPoke.id)
            logging.critical(session.releasePokemon(inventory.party[poke])) #TRANSFER POKEMON AND LOG RESULT
            waitTime = int(config.get('CONFIG','releaseDelay')) + random.randint(1, 5) #CALCULATE WAIT TIME
            
    elif action.find("Evolve") > -1:
        status = "Evolving Pokemon with ID " + str(curPoke.id)
        logging.critical(session.evolvePokemon(inventory.party[poke])) #EVOLVE POKEMON AND LOG RESULT
        waitTime = int(config.get('CONFIG','evolveDelay')) + random.randint(1, 5)
        
    elif action.find("Rename") > -1:
        status = "Found pokemon. Renaming to " + str(pokedex[curPoke.pokemon_id]) + "_" + str(int(iv*100))
        logging.critical(session.nicknamePokemon(inventory.party[poke],str(pokedex[curPoke.pokemon_id]) + "_" + str(int(iv*100)))) #RENAME POKEMON TO POKEMONNAME_IV
        waitTime = int(config.get('CONFIG','renameDelay')) + random.randint(1, 5)
        
    elif action.find("PowerUp") > -1:
        status = "Upgrading Pokemon with ID " + str(curPoke.id)
        logging.critical(session.upgradePokemon(inventory.party[poke])) #UPGRADE POKEMON AND LOG RESULT
        waitTime = int(config.get('CONFIG','evolveDelay')) + random.randint(1, 5)
    elif action.find("Favorite") > -1:
        status = "Togging favorite on Pokemon with ID " + str(curPoke.id)
        if inventory.party[poke].favorite:
            logging.critical(session.setFavoritePokemon(inventory.party[poke],False))
        else:
            logging.critical(session.setFavoritePokemon(inventory.party[poke],True))
            waitTime = random.randint(1, 2) #WAIT TIME HERE IS LESS STRICT BECAUSE FAVORITING IS EASY!
                            
    logging.info(status)
      
    json.dump({"status": status}, open('static/status.json', 'w')) #WRITE STATUS MESSAGE TO JSON FILE, TO BE READ BY STATUS LOG ON WEB INTERFACE

    if len(pokeID.split(","))>1 and pokeID.split(",")[len(pokeID.split(",")) - 1] != curPoke.id:
        logging.critical("Rate limiting in effect, waiting before next action.")
        time.sleep(waitTime)
        
        
        
    for z in pokeID.split(","):
        status = ""
        for poke in range(0,len(inventory.party)-1):
            curPoke = inventory.party[poke]
            
            
            if str(curPoke.id) == str(z):
                

                ##this is ugly, I need to clean it up
                

                    
                
                