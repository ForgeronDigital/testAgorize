export default class AvailabilitiesEvent {

    eventList = [];

    setAvailabilities({opening=false, recurring=false, startDate="", endDate=""}){
        this.eventList.push({opening,
            recurring,
            startDate,
            endDate})
    }

    availabilities(fromDate, toDate){
        const openEvents = []
        let openRecurrinEvents = []
        const closedEvents = []
        const closedRecurrinEvents = []


        this.eventList.map((event)=>{
            if(event.recurring && event.opening && event.startDate <= toDate){
                // Create all 30min event
                const dateDiff30minStep = (event.endDate-event.startDate)/36e5*2
                for(let i=0; i< dateDiff30minStep; i++){
                    openRecurrinEvents.push(new Date(event.startDate).getTime() + (30*60*1000*i))
                }
                // Create all recurring event until endDate of request availabilities
                const dateDiff1WeekStep = Math.floor((toDate-event.startDate)/(7*24*3600*1000));
                const clonedateDiff24hStep = openRecurrinEvents.slice();
                for(let k=1; k <= (dateDiff1WeekStep); k++){
                    for(let j=0; j<= (clonedateDiff24hStep.length); j++){
                        openRecurrinEvents.push(new Date(clonedateDiff24hStep[(j)]).getTime()+(7*24*3600*1000*(k)));
                    }
                }
                openRecurrinEvents = openRecurrinEvents.sort()
                // Finding the first matching event
                for(let l=0; l < (new Date(toDate).getDate()- new Date(fromDate).getDate()); l++){
                    const indexStartingDate = openRecurrinEvents.findIndex((openedRecurringEvent)=>{
                        return new Date(fromDate).getDate()+(l+1) == new Date(openedRecurringEvent).getDate()
                    })
                    if(indexStartingDate>0){
                        openRecurrinEvents = openRecurrinEvents.slice(indexStartingDate)
                    }
                }
                
            }else if(!event.recurring && !event.opening && event.startDate <= toDate){
                // Create all 30min event
                const dateDiff30minStep = (event.endDate-event.startDate)/36e5*2
                for(let i=0; i< dateDiff30minStep; i++){
                    closedEvents.push(new Date(event.startDate).getTime() + (30*60*1000*i))
                }
                // Finding overlapping events and remove them from opening
                const indexArr =[]
                closedEvents.forEach(closedEvent=>{
                    const indexMatchingDate = openRecurrinEvents.findIndex((openedRecurringEvent)=>{
                        return closedEvent == openedRecurringEvent
                    })
                    if(indexMatchingDate){
                        indexArr.push(indexMatchingDate)
                    }
                })
                indexArr.forEach(matchingDate=>{
                    openRecurrinEvents.splice(matchingDate,1)
                })
            }
            //TODO Add 2 other cases for non recurring opening and recurring non opening
            
        })
        // Need to use "moment" library to be simplier and pretier
        const firstAvailability = new Date(openRecurrinEvents[0])
        const slot30mins = []
        openRecurrinEvents.forEach(slot =>{
            if(!Object.is(slot, NaN)){
                slot30mins.push(`${new Date(slot).getHours()}:${new Date(slot).getMinutes() == 0 ? "00" : new Date(slot).getMinutes()}`)
            }
        })
        const parsedSlot30mins = slot30mins.reduce((text, value, i, array)=>{
                return text + (i < array.length - 1 ?', ':', and ') + value
        })
        console.log(`I'm available from ${new Intl.DateTimeFormat("en-US", { month: "long" }).format(firstAvailability)} ${firstAvailability.getDate()} at ${parsedSlot30mins}`);
        console.log("I'm not available any other time !");
    }
  }