import {Request, Response} from 'express'
import { HandleDistancesService } from '../services/HandleDistancesService'


class HandleDistanceController {
    async handle(req:Request,res:Response) {
       const data = req.body

       const {pointA, destinationValues} = data

     
       const service = new HandleDistancesService()

       try{
        const result = await service.execute({pointA,destinationValues })
        return res.json(result)
       }catch(err){
           console.log(err)
       }
      
    }
}


export {HandleDistanceController}