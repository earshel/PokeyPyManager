 <!--
    
        var party = []
        var squareCount = 0;
        var selectedPokes = []
        var pokes = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr-mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];
        var sortedParty = []
        function ucFirst(string) {
            return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
        }
        //        
        function loadJSON(path, success, error) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        if (success)
                            success(JSON.parse(xhr.responseText));
                    } else {
                        if (error)
                            error(xhr);
                    }
                }
            };
            xhr.open("GET", path, true);
            xhr.send();
        }

        function sortByKey(array, key) {
            if (key == 'cp' || key == 'iv' || key == 'creation_time_ms') {

                return array.sort(function(b, a) {
                    var x = a[key];
                    var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            } else {
                return array.sort(function(a, b) {
                    var x = a[key];
                    var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
        }

        function selectPoke(id) {

            if (selectedPokes.indexOf(id.parentElement.parentElement.id) == -1) {
                selectedPokes.push(id.parentElement.parentElement.id);
                id.parentElement.parentElement.style.background = 'rgba(255,0,0,.1)';
                id.parentElement.parentElement.style.border = "2px red solid";

            } else {
                selectedPokes.splice(selectedPokes.indexOf(id.parentElement.parentElement.id), 1);
                id.parentElement.parentElement.style.background = 'rgba(255,255,255,1)';
                id.parentElement.parentElement.style.border = "1px black solid";
            }




            for (var id in selectedPokes) {
                //debug
            }


            //push selected pokemon to hidden text field for transmittal to python script
            document.getElementById("pokeID").value = selectedPokes;
            document.getElementById("numSelected").innerHTML = selectedPokes.length + " of " + squareCount + " selected";


        }

        function sculpt(data) {


            party = data;

            sortPokes();
        }



        //sort pokemon by id,pokemon_id,cp,stamina,stamina_max,move_1,move_2,etc.
        function sortPokes() {

            selectedPokes = [];
            document.getElementById("pokeID").value = selectedPokes;
            squareCount = 0;
            document.getElementById('advFilterModal').style.display = "none";
            key = document.getElementById('sortBy').value;
            var d = new Date();
            var curTime = d.getTime() / 1000;

            if (parseInt(curTime) - parseInt(party[0].timeStamp) < 120) {
                key = party[0].sortBy;
                document.getElementById('sortBy').value = key;
            } else {}

            document.getElementById('inventory').innerHTML = origInventory;
            sortByKey(party, key);

            /*	SAMPLE POKEMON INFO FOR FORMATTING HELP
			
                #id: 2436312686824190668
                #pokemon_id: EEVEE
                #cp: 46
                #stamina: 19
                #stamina_max: 19
                #move_1: TACKLE_FAST
                #move_2: DIG
                #height_m: 0.297532558441
                #weight_kg: 8.24643802643
                #individual_attack: 15
                #individual_defense: 12
                #individual_stamina: 9
                #cp_multiplier: 0.166397869587
                #pokeball: ITEM_POKE_BALL
                #captured_cell_id: 6108423709528162304
                #creation_time_ms: 1469364470778
            	*/


            for (var i in party) {



                var content = document.createElement('div');
                content.className = 'square hoverable';
                content.id = party[i].id;

                if (party[i].reqCandies == 0) {
                    var candyString = party[i].candies + ' ' + ucFirst(party[i].candyFamily) + ' Candies';
                } else {

                    var candyString = party[i].candies + '/' + party[i].reqCandies + ' ' + ucFirst(party[i].candyFamily) + ' Candies';
                }
                content.innerHTML = '<font face=arial size=4 color=navy> <center>' + party[i].cp + ' CP | ' + Math.round(party[i].iv * 100) + '% IV</b><img  src="static/avatars/' + party[i].favorite + '" width=30 height=29 style="float:right;display:inline;position:absolute;right:10px ;"></font><br><font face=arial style="font-size:11px;"><b>Atk: </b>' + party[i].individual_attack + '<b>&nbsp;&nbsp;&nbsp;Def: </b>' + party[i].individual_defense + '<b>&nbsp;&nbsp;&nbsp;Sta: </b>' + party[i].individual_stamina + '</font></center><center><img class="pokeSquare" style="padding:10px;" onclick=\"javascript:selectPoke(this);\" height=120 width=120 src=static/avatars/' + party[i].pokemon_id + '.png> </center>\
	<font size=4 face=arial><center>' + ucFirst(party[i].pokemon_name) + '</font><br><progress style="height:10px;width:80%;" value=' + party[i].stamina + ' max=' + party[i].stamina_max + '></progress><br><font size=2>HP ' + party[i].stamina + '/' + party[i].stamina_max + '</center><b>' + party[i].move_1 + '</b><b  style="float:right;padding-right:10px;">' + party[i].move_1_dmg + '</b><br><i>' + party[i].move_1_type + '<br></i><b>' + party[i].move_2 + '</b><b  style="float:right;padding-right:10px;">' + party[i].move_2_dmg + '</b><br><i>' + party[i].move_2_type + '<br><br></i><b><center><img style="display:inline;position:relative;bottom:5px;" width=20 height=20 src=static/avatars/candy.png><font style="position:relative;bottom:10px;margin-bottom:15px;" color=navy face=arial size=2>' + candyString + '</font><br></center></b>\
	<br>'

                if (document.getElementById('pokemonName').value != '') {

                    if (document.getElementById('pokemonName').value.toUpperCase() == pokes[parseInt(party[i].pokemon_id) - 1].toUpperCase()) {

                        var ivEval = eval(String((party[i].iv * 100)) + document.getElementById("ivOper").value + document.getElementById('ivThreshold').value);
                        var cpEval = eval(party[i].cp + document.getElementById("ivOper").value + document.getElementById('cpThreshold').value);

                        if (eval(String('cpEval == true') + document.getElementById("andOr").value + " " + String('ivEval == true')) == true && document.getElementById('pokemonName').value.toUpperCase() == pokes[parseInt(party[i].pokemon_id) - 1].toUpperCase()) {

                            if (document.getElementById('canEvolveCK').checked) {
                                if (party[i].canEvolve == 1) {
                                    document.getElementById('inventory').appendChild(content);
                                    squareCount = squareCount + 1;
                                }
                            } else {
                                document.getElementById('inventory').appendChild(content);
                                squareCount = squareCount + 1;
                            }


                        }




                    }
                } else {
                    var ivEval = eval(String((party[i].iv * 100)) + document.getElementById("ivOper").value + document.getElementById('ivThreshold').value);
                    var cpEval = eval(party[i].cp + document.getElementById("ivOper").value + document.getElementById('cpThreshold').value);

                    if (eval(String('cpEval == true') + document.getElementById("andOr").value + " " + String('ivEval == true')) == true) {

                        if (document.getElementById('canEvolveCK').checked) {
                            if (party[i].canEvolve == 1) {
                                document.getElementById('inventory').appendChild(content);
                                squareCount = squareCount + 1;
                            }
                        } else {
                            document.getElementById('inventory').appendChild(content);
                            squareCount = squareCount + 1;
                        }


                    }



                }

            }


            var adjSquareCount = squareCount;

            if (adjSquareCount % 5 <= 3 && adjSquareCount % 5 != 0 || adjSquareCount < 5) {

                adjSquareCount = (5 - (5 - (adjSquareCount % 5))) + adjSquareCount;

                if (adjSquareCount == 5) {
                    document.getElementById('inventory').style.height = ((adjSquareCount / 5) * 400) + 130
                } else {
                    document.getElementById('inventory').style.height = ((adjSquareCount / 5) * 400);
                }
            } else if (adjSquareCount == 5) {
                document.getElementById('inventory').style.height = ((adjSquareCount / 5) * 400) + 130
            } else {
                document.getElementById('inventory').style.height = ((adjSquareCount / 5) * 400);
            }



            document.getElementById("numSelected").innerHTML = "0 of " + squareCount + " selected";
            document.getElementById('pokemonName').value = "";
            document.getElementById('ivThreshold').value = 0;
            document.getElementById('cpThreshold').value = 0;


        }

        var origInventory = document.getElementById('inventory').innerHTML;
        var url = "/static/inventory.json?" + new Date().getTime();
        loadJSON(url,
            function(data) {
                sculpt(data);
            },
            function(xhr) {
                console.error(xhr);
            }
        );

        function selectAllPokes() {
            selectedPokes = [];
            var pokePokes = document.getElementsByClassName("pokeSquare");
            for (var i = 0; i < pokePokes.length; i++) {
                var id = pokePokes.item(i);
                if (selectedPokes.indexOf(id.parentElement.parentElement.id) == -1) {
                    pokePokes.item(i).click();

                }


            }
        }



        function updateStatus(status, count) {
            var url = "/static/status.json?" + new Date().getTime();



            if (status != "finished") {

                loadJSON(url,
                    function(data) {
                        status = data.status;
                        if (status == "finished") {
                            if (window.count <= 0) {
                                document.getElementById('status').style.display = 'none';
                                return;

                            } else {

                                document.getElementById('statusText').value = document.getElementById('statusText').value + "\n" + "Finished! Refreshing page in 5 sec.";
                                redirURL = "/inventory";
                                setTimeout("location.href = redirURL;", 5000);

                            }
                        }
						else {
                        document.getElementById('status').style.display = 'block';


                        if (document.getElementById('statusText').value.search(status) < 0) {
                            if (document.getElementById('statusText').value == "") {
                                document.getElementById('statusText').value = document.getElementById('statusText').value + status;
                            } else {
                                document.getElementById('statusText').value = document.getElementById('statusText').value + "\n" + status;

                            }

                        }
                        document.getElementById('statusText').scrollTop = document.getElementById('statusText').scrollHeight;
                        window.count += 1;
                        setTimeout('updateStatus("' + status + '");', 500);


                    }},
                    function(xhr) {
                        console.error(xhr);
                    }
                );



            }
        } //end function

        //let's clear some stuff
        document.getElementById('pokemonName').value = "";
        document.getElementById('ivThreshold').value = 0;
        document.getElementById('cpThreshold').value = 0;
        window.count = 0;