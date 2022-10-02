import axios from 'axios'

class HandleDistancesService{
  constructor(
    
  ) {}
    async execute({pointA,destinationValues,lastValues,priorities }) {

const REACT_APP_GOOGLE_API_KEY = 

 let origin = pointA.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
 //let origin = 'Rua Felipe Cardoso'
//let dest = ['Rua Nestor','Rua Felipe Cardoso','Rua General Olimpio']

 let dest =[]
 let lastDest = []
 let prioritiesDest = []


destinationValues.map((info) => (
  dest.push(info.points)
))

lastValues.map((info) => (
  lastDest.push(info.points)
))

priorities.map((info) => (
  prioritiesDest.push(info.points)
))


const destLength = dest.length
const priorityLength = prioritiesDest.length
const lastPriorityLength = lastDest.length


let delivery = null

let deliveryTeste = null
let results = []

let priority = null
let lastPriority = 'Rua Felipe Cardoso'

const totalLength = destLength + priorityLength + lastPriorityLength


for(let i =0; i<totalLength; i++) {
  if(!prioritiesDest.length && dest.length > 0 ){
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


  if(lastDest.length > 0 && !prioritiesDest.length && !dest.length) {
   
    const lastPrioritiesJoinend = lastDest.join('|').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${lastPrioritiesJoinend}&key=${REACT_APP_GOOGLE_API_KEY}`)
    results.push({time:response.data.rows[0]?.elements[0]?.duration?.value,
      destination: response.data.destination_addresses[0]
     })
     delivery = response.data.destination_addresses[0]
  
  const index =  response.data.destination_addresses.indexOf(delivery, 0)
  origin = lastDest[index].normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  lastDest.splice(index,1)
}

  if(prioritiesDest.length > 0) {
      const prioritiesJoinend = prioritiesDest.join('|').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${prioritiesJoinend}&key=${REACT_APP_GOOGLE_API_KEY}`)
      results.push({time:response.data.rows[0]?.elements[0]?.duration?.value,
        destination: response.data.destination_addresses[0]
       })
       delivery = response.data.destination_addresses[0]
    
    const index =  response.data.destination_addresses.indexOf(delivery, 0)
    origin = prioritiesDest[index].normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    prioritiesDest.splice(index,1)
  }
  
     return results
  
  }
  
 
}

export   {HandleDistancesService}
