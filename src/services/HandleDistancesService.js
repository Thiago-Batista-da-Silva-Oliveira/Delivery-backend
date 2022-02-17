import axios from 'axios'

class HandleDistancesService{
  constructor(
    
  ) {}
    async execute({pointA,destinationValues }) {

const REACT_APP_GOOGLE_API_KEY = 



let time;

let time1 = null
let time2 = null
let time3 = null
let time4 = null

let delivery1 = 'asdasd'
let delivery2 = 'sadasf';
let delivery3 = 'afsafa';
let delivery4 = 'dasfsa';

let origin = pointA.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

// let dest = ['Rua Nestor','Rua São Benedito','Rua General Olimpio']

let dest =[]


destinationValues.map((info) => (
  dest.push(info.points)
))


const destLength = dest.length


let delivery = null
let results = []

/*
for(let i =0; i<destLength; i++) {
  
  const destJoinend = dest.join('|').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destJoinend}&key=${REACT_APP_GOOGLE_API_KEY}`)
  for(let u=0 ; u<dest.length; u++){
   
   
    if(!results[i] ) {
      results.push({time:response.data.rows[0]?.elements[u]?.duration?.value,
        destination: response.data.destination_addresses[u]
       })
       delivery = response.data.destination_addresses[u]
    }
      if(results[i]?.time > response.data.rows[0]?.elements[u]?.duration?.value ){
          delivery = response.data.destination_addresses[u]
          results[i].time = response.data.rows[0]?.elements[u]?.duration?.value
          results[i].destination = response.data.destination_addresses[u]
   }
  }
  const index =  response.data.destination_addresses.indexOf(delivery, 0)
  origin = dest[index].normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  dest.splice(index,1)

}
*/


let priority = 'Rua ThemistoCles Cavalcanti'
let lastPriority = 'Rua Felipe Cardoso'


for(let i =0; i<destLength; i++) {

  if(priority) {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${priority}&key=${REACT_APP_GOOGLE_API_KEY}`)
    results.push({time:response.data.rows[0]?.elements[0]?.duration?.value,
      destination: response.data.destination_addresses[0]
     })
    delivery = response.data.destination_addresses[0]
    origin = delivery.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    priority = null
  }
  if(!priority){
    const destJoinend = dest.join('|').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destJoinend}&key=${REACT_APP_GOOGLE_API_KEY}`)
    for(let u=0 ; u<dest.length; u++){
     
     
      if(!results[i] ) {
        results.push({time:response.data.rows[0]?.elements[u]?.duration?.value,
          destination: response.data.destination_addresses[u]
         })
         delivery = response.data.destination_addresses[u]
      }
        if(results[i]?.time > response.data.rows[0]?.elements[u]?.duration?.value ){
            delivery = response.data.destination_addresses[u]
            results[i].time = response.data.rows[0]?.elements[u]?.duration?.value
            results[i].destination = response.data.destination_addresses[u]
     }
    }
    const index =  response.data.destination_addresses.indexOf(delivery, 0)
    origin = dest[index].normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    dest.splice(index,1)
  }

  if(lastPriority && i == destLength - 1) {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${lastPriority}&key=${REACT_APP_GOOGLE_API_KEY}`)
    results.push({time:response.data.rows[0]?.elements[0]?.duration?.value,
      destination: response.data.destination_addresses[0]
     })
     delivery = response.data.destination_addresses[0]
  }

}

/*
if(time1 === null) {


  const destJoinend = dest.join('|')

  const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destJoinend}&key=${REACT_APP_GOOGLE_API_KEY}`)
  
 // dest = [response.data.destination_addresses[0],response.data.destination_addresses[1],response.data.destination_addresses[2],response.data.destination_addresses[3] ]
  
  for(let i=0 ; i<dest.length; i++){
    if(time1 > response.data.rows[0]?.elements[i]?.duration?.value || time1 === null ){
      time1 = response.data.rows[0]?.elements[i]?.duration?.value
      origin = response.data.destination_addresses[i]
      delivery1 = response.data.destination_addresses[i]
    }
  }

  const index =  response.data.destination_addresses.indexOf(delivery1, 0)


 dest.splice(index,1)
}



if(time2=== null || time2 < 18184854884) {

  
 // dest = dest.filter(info => info !== origin)

  const destJoinend = dest.join('|')

  console.log(origin)

 
  const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destJoinend}&key=${REACT_APP_GOOGLE_API_KEY}`)
  
  const filteredResponseTime = response.data.rows[0].elements.filter((info) => info.duration !== time1 )
  const filteredResponsePath =  response.data.destination_addresses.filter((info) => info.destination_addresses != delivery1 )

  for(let i=0 ; i<dest.length; i++){
    if(time2 > filteredResponseTime[i]?.duration?.value || time2 === null  ){
      time2 =  filteredResponseTime[i]?.duration?.value
     
      delivery2 =filteredResponsePath[i]
    }
  }

  const index =  response.data.destination_addresses.indexOf(delivery2, 0)

  origin = dest[index]
  dest.splice(index,1)
  
}


if(time3=== null  || time3 < 18184854884) {
 // dest = dest.filter((info) => info !== origin)
 console.log(origin)

  const destJoinend = dest.join('|')

  
  const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destJoinend}&key=${REACT_APP_GOOGLE_API_KEY}`)

  
  const filteredResponseTime = response.data.rows[0].elements.filter((info) => info.duration !== time2 && info.duration !== time1  )
  const filteredResponsePath =  response.data.destination_addresses.filter((info) => info.destination_addresses !== delivery2 && info.destination_addresses !== delivery1 )
  for(let i=0 ; i<dest.length; i++){
    if(time3 > filteredResponseTime[i]?.duration?.value || time3 === null  ){
      time3 =  filteredResponseTime[i]?.duration?.value
     
      delivery3 =filteredResponsePath[i]
      

    }
  }

  const index =  response.data.destination_addresses.indexOf(delivery3, 0)

  origin = dest[index]
  dest.splice(index,1)
  
}
  

if(time4 === null  || time4 < 18184854884) {
 // dest = dest.filter((info) => info !== origin)

  const destJoinend = dest.join('|')
  const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destJoinend}&key=${REACT_APP_GOOGLE_API_KEY}`)
  
  const filteredResponseTime = response.data.rows[0].elements.filter((info) =>  info.duration !== time2 && info.duration !== time1  && info.duration !== time3 )
  const filteredResponsePath =  response.data.destination_addresses.filter((info) => info.destination_addresses !== delivery2 && info.destination_addresses !== delivery1 && info.destination_addresses !== delivery3)
  for(let i=0 ; i<dest.length; i++){
    if(time4 > filteredResponseTime[i]?.duration?.value || time4 === null  ){
      time4 =  filteredResponseTime[i]?.duration?.value
      delivery4 =filteredResponsePath[i]
      
    
    }
  }
  const index =  response.data.destination_addresses.indexOf(delivery4, 0)

  origin = dest[index]
  dest.splice(index,1)
  
}
  
*/

//const destJoinend = ['Rua Felipe Cardoso|Rua General Olimpio|Rua ThemistoCles Cavalcanti|Rua Nestor']




time = time1 + time2 + time3 + time4
      // return {delivery1, delivery2, delivery3, delivery4,time1, time2, time3,time4, time}
 
      
     return results
  
  }
  
 
}

export   {HandleDistancesService}
