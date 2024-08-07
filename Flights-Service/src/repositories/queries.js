function addRowLockOnFlights(flightsId){
 return `SELECT * from Flights WHERE Flights.id=${flightsId} for UPDATE;`
}

module.exports={
 addRowLockOnFlights
}