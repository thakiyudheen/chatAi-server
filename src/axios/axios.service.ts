import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AxiosService {
  private axiosInstance: AxiosInstance;
  private readonly BASE_URL: string = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL, 
    });
  }

  async postData(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      return {error:true}
    }
  }

}
