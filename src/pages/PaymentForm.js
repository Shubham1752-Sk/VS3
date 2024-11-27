import React from 'react'
import { PayPalButtons,FUNDING,PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { endpoints } from '../services/api';
import { apiConnector } from '../services/apiConnector';
import { toast } from 'react-hot-toast';

export default function Paypalbuttons () {
    const initialOptions = {
        clientId: "ATo0ZfXJ7mKwggvGdFq3ZNPpq6ZV1Ws6PVMPu5T6t7QkTIKSIxHIFClD51r1b3oFNz-2h7ULFJHQBb8g",
        currency: "USD",
        intent: "capture",
      };
      const FUNDING_SOURCES = [
        FUNDING.PAYPAL,
        FUNDING.VENMO
      ];
      const { token } = useSelector((state) => state.auth)
      const createOrder =async (data) => {
        try{
          const response =await apiConnector("POST",endpoints.CREATE_ORDER,null,{
            Authorization: `Bearer ${token}`,
          })
          return response.data.id
        }
        catch(err){
          console.log(err);
          toast.error(err);
        }
      };
      const onApprove =async (data) => {
        console.log("dtat",data)
        try{
          const response=await apiConnector("POST",endpoints.CAPTURE_PAYPAL_PAYMENT,{orderID:data.orderID},{
            Authorization: `Bearer ${token}`,
          })
          console.log("Approve",response)
        }
        catch(err){
          console.log(err);
          toast.error(err);
        }
      };  
  return (
    <div>
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                className=' w-[300px]'
                createOrder={async (data, actions) => createOrder(data,actions) }
                onApprove={async (data, actions) => onApprove(data,actions)}
            />
        </PayPalScriptProvider>
    </div>
  )
}

