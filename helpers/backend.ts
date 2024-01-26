import 'dotenv/config';
import axios, { AxiosResponse } from 'axios';

const URL: string = "https://stage.rentzila.com.ua/api/backcall/";

const Headers = {
    'Authorization': `Bearer ${process.env.TOKEN}`
}

export interface consultation {
    id: number,
    name: string,
    phone: string,
    created_date: string,
    closed_date: string | null,
    is_closed: boolean
}

export async function listConsultations() {
    const response: AxiosResponse = await axios.get(URL, { headers: Headers });

    return response.data;
}

export async function deleteConsultation(id: number) {
    const response: AxiosResponse = await axios.delete(URL + String(id) + "/", { headers: Headers });

    return response.status == 204;
}