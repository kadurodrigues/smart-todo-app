import { API_BASE_URL } from "@/constants";
import { Task } from "@/types/Task";
import axios from "axios";

export default class TaskService {
  static async getTasks(): Promise<Task[]> {
    try {
      const { data } = await axios.get<Task[]>(`${API_BASE_URL}/todos`);
      return data;
    } catch (error) {
      throw new Error(`API Error: ${error}`);
    }
  }

  static async addTask(text: string): Promise<Task> {
    try {
      const { data } = await axios.post<Task>(`${API_BASE_URL}/todos`, { text });
      return data;
    } catch (error) {
      throw new Error(`API Error: ${error}`);
    }
  }

  static async updateTask(id: string, text: string): Promise<Task> {
    try {
      const { data } = await axios.put<Task>(`${API_BASE_URL}/todos/${id}`, { text });
      return data;
    } catch (error) {
      throw new Error(`API Error: ${error}`);
    }
  }

  static async toggleTask(id: string, completed: boolean): Promise<Task> {
    try {
      const { data } = await axios.patch<Task>(`${API_BASE_URL}/todos/${id}/toggle`, { completed });
      return data;
    } catch (error) {
      throw new Error(`API Error: ${error}`);
    }
  }
}