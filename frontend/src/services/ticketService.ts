import api from "./api";
import type {
    Ticket,
    CreateTicketRequest,
    UpdateTicketRequest,
} from "../types/ticket";

export const getTickets = async (
    status?:string,
    priority?:string
):Promise<Ticket[]>=>{

    const params:any={};

    if(status) params.status=status;

    if(priority) params.priority=priority;

    const response=await api.get("/api/tickets",{params});

    return response.data;

};

export const getTicket=async(id:number):Promise<Ticket>=>{

    const response=await api.get(`/api/tickets/${id}`);

    return response.data;

};

export const createTicket=async(

    payload:CreateTicketRequest

):Promise<Ticket>=>{

    const response=await api.post("/api/tickets",payload);

    return response.data;

};

export const updateStatus=async(

    id:number,

    payload:UpdateTicketRequest

):Promise<Ticket>=>{

    const response=await api.patch(`/api/tickets/${id}`,payload);

    return response.data;

};