import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';

const API_URL = 'http://localhost:8000/api/applications';

@Injectable({
  providedIn: 'root',
})
export class ApplicationApiService {
  /**
   * Fetch all applications from FastAPI
   */
  async getAll(): Promise<Application[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch applications: ${response.status}`);
    }
    return response.json();
  }
  /**
   * Fetch a single application by ID
   */
  async getById(id: number): Promise<Application> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch application ${id}: ${response.status}`);
    }
    return response.json();
  }
  /**
   * Create a new application
   */
  async create(data: Partial<Application>): Promise<Application> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to create application: ${response.status}`);
    }
    return response.json();
  }
  /**
   * Update status or details of an existing application
   */
  async update(id: number, data: Partial<Application>): Promise<Application> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update application: ${response.status}`);
    }
    return response.json();
  }
}
