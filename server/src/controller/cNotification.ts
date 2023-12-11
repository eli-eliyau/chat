
import { Request, Response } from "express";
import MessagesSchema from "../schemas/sMessages";
import webpush from 'web-push'
const sendNotification = async (req: Request, res: Response) => {
    try {
         const subscription = req.body
         res.status(201).json({})
         const payload =JSON.stringify({title:'Push Test'})
         webpush.sendNotification(subscription,payload).catch(err=>{console.log(err)
         })
        
        } catch (error) {
        console.log(error);
    }

}
export { sendNotification }