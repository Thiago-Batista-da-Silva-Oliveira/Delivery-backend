import {Request, Response} from 'express'
import { HandleDistancesService } from '../services/HandleDistancesService'


class HandleDistanceController {
    async handle(req:Request,res:Response) {
       const data = req.body

       const {pointA, destinationValues,lastValues,priorities} = data

       const service = new HandleDistancesService()

       try{
        const result = await service.execute({pointA,destinationValues,lastValues,priorities })
        return res.json(result)
       }catch(err){
           console.log(err)
       }
      
    }
}


export {HandleDistanceController}
