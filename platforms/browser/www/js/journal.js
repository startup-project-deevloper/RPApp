/////////////////////////////////////~~~~~~~~~~~JOURNAL~~~~~~~~~~~~~~~~~~~~~~~~?/////////////////////////////////////
console.clear();
console.log("~~~~Journal~~~~~~")
StartJournal();
console.log("/////////////");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function StartJournal() {
    var Party = JSON.parse(localStorage.getItem('_Party'));
    var Journal = JSON.parse(localStorage.getItem('_Journal'));
    console.log("Journal Starts");
    //Party[0].Experience.SkillPoints = Party[0].Experience.SkillPoints = 5;
   // Party[1].Experience.SkillPoints = Party[1].Experience.SkillPoints = 5;

    $("#Journal").html("<div id='JournalList' class='MenuWrapper animated FlipInY '></div>");
    $("#Locationtitle").html(" Journal ");
    $("#JournalList").css("border-color", "" + Party[0].Color + "");
    PlaceJournal();

    function PlaceJournal() {
            var JournalEntriesFound = 0;
    var JournalEntriesTotal = 0;
        CountJournalEntries();

        function CountJournalEntries() {
            // Counts all Available Journal Entries In TOTAL
            for (i = 0; i <  Journal.length; i++) {
                for (e = 0; e <  Journal[i].Entries.length; e++) {
                    JournalEntriesTotal++;
                };
            };
        };
          CountJournalEntriesViewed();

        function CountJournalEntriesViewed() {
            // Counts all Available Journal Entries In TOTAL
            for (i = 0; i <  Journal.length; i++) {
                for (e = 0; e <  Journal[i].Entries.length; e++) {
                   if ( Journal[i].Entries[e].Hidden == false){
                     JournalEntriesFound++;  
                   };
                };
            };
            $("#Message").html("  Journal Entries :  " + JournalEntriesFound + " / " + JournalEntriesTotal + "   ");
        };
        
        
        
        
        // PLace all journal Entry Categories
        $("#JournalList").html("");
        for (i = 0; i <  Journal.length; i++) {
             
            var JournalNotification = 0;
            
            
            

                for (e = 0; e <  Journal[i].Entries.length; e++) {
                   if ( Journal[i].Entries[e].Hidden == false){
                       if ( Journal[i].Entries[e].Viewed == false){
                           JournalNotification++; 
                       };   
                   };
                };
            
               if (JournalNotification == 0){
        $("#JournalList").append("<br><button id='" + i + "' class='animated FlipInY MenuButton'>" +  Journal[i].Name + "</button>");
        } else {
              $("#JournalList").append("<br><button id='" + i + "' class='animated FlipInY MenuButton'>" +  Journal[i].Name + "   ( "+JournalNotification+" )</button>");
        }
            
            
            
            
            
            
            PlaceJournalEntries();

            function PlaceJournalEntries() {
                // Place all journal entries for that category
                $("#" + i + "").click(function () {
                    var JournalEnteriesFoundCategory = 0;
                    var JournalEnteriesTotalCategory = 0;
                    var Index = this.id
                            CountJournalEntries(Index);

        function CountJournalEntries(Inex) {
            // Counts all Available Journal Entries In TOTAL
                for (e = 0; e <  Journal[Index].Entries.length; e++) {
                    JournalEnteriesTotalCategory++;
                };
        };
          CountJournalEntriesViewed(Index);

        function CountJournalEntriesViewed() {
            // Counts all Available Journal Entries In TOTAL
                for (e = 0; e <  Journal[Index].Entries.length; e++) {
                   if ( Journal[Index].Entries[e].Hidden == false){
                     JournalEnteriesFoundCategory++;  
                   };
                };
            $("#Message").html("  Journal Entries :  " + JournalEnteriesFoundCategory + " / " + JournalEnteriesTotalCategory + "   ");
        };
                    

                    $("#Message").html("  Journal Entries :  " + JournalEnteriesFoundCategory + " / " + JournalEnteriesTotalCategory + "   ");
                    $("#JournalList").html("");
                    for (e = 0; e <  Journal[this.id].Entries.length; e++) {
                        if ( Journal[this.id].Entries[e].Hidden != true) {
                        if ( Journal[this.id].Entries[e].Viewed == false){
                         $("#JournalList").append("<br><button class='MenuButton' id='" + this.id + "" + e + "'>" +  Journal[this.id].Entries[e].Name + " ( 1 ) </button>");   
                        } else {
                          $("#JournalList").append("<br><button class='MenuButton' id='" + this.id + "" + e + "'>" +  Journal[this.id].Entries[e].Name + "</button>");  
                        }
                        
                        $("#" + this.id + e + "").click(function () {
                             Journal[this.id.substr(0, 1)].Entries[this.id.substr(1, 1)].Viewed = true;
                           
                            if ( Journal[this.id.substr(0, 1)].Entries[this.id.substr(1, 1)].Avatar == "" ||  Journal[this.id.substr(0, 1)].Entries[this.id.substr(1, 1)].Avatar == undefined ){
                               Journal[this.id.substr(0, 1)].Entries[this.id.substr(1, 1)].Avatar == "none.png";  
                            };
                            // Place journal entry that was clicked on
                            $("#JournalList").html("<div class='MenuWrapper'><h3> " +  Journal[this.id.substr(0, 1)].Entries[this.id.substr(1, 1)].Name + " </h3><br><img class='JournalAvatar' src='"+ Journal[this.id.substr(0, 1)].Entries[this.id.substr(1, 1)].Avatar+"'></img><br><span>" +  Journal[this.id.substr(0, 1)].Entries[this.id.substr(1, 1)].Description + "</span><br></div>");
                            if ( Journal[this.id.substr(0,1)].Entries[this.id.substr(1, 1)].Defeated){
                               $("#JournalList").append("<span> Times Defeated : <strong>" +  Journal[this.id.substr(0, 1)].Entries[this.id.substr(1, 1)].Defeated + "</strong></span>"); 
                            };
                            if ( Journal[this.id.substr(0,1)].Name == "Enemies"){
                            $(".JournalAvatar").css("border-color","Red");
                            } else  if ( Journal[this.id.substr(0,1)].Name == "Cities"){
                            $(".JournalAvatar").css("border-color","Blue");
                            }
                            
                            $("#JournalList").append("<br><button class='MenuButton' id='Back'> Back </button>");
                            $("#Back").click(function () {
                                  localStorage.setItem('_Party', JSON.stringify(Party));
                                  localStorage.setItem('_Journal', JSON.stringify(Journal));
                                PlaceJournal();
                            });
                        });
                    };
                    }
                    $("#JournalList").append("<br><button class='MenuButton' id='Back'> Back </button>");
                    $("#Back").click(function () {
                        PlaceJournal();
                    });
                });
            };
        };
        $("#JournalList").append("<br><h3></h3><button class='MenuButton' id='Back'> Back </button>");
        $("#Back").click(function () {
            localStorage.setItem('_Party', JSON.stringify(Party));
            localStorage.setItem('_Journal', JSON.stringify(Journal));
            $("#App").load("temp/Victoria.html");
        });
    };
}