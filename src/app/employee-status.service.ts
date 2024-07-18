import { Injectable } from '@angular/core';
import { EmployeeStatus } from './employee-status';

interface GraphQLResp<T> {
  data: T
}

export interface GetEmployeeStatusesResponse {
  employeeStatuses: EmployeeStatus[]
}

export interface DeleteEmployeeStatusResponse {
  deleteEmployeeStatus: boolean
}

export interface CreateEmployeeStatStatus {
  createEmployeeStatuses: boolean
}

export interface UpdateEmployeeStatus {
  updateEmployeeStatus: boolean
}

export interface EmployeeStatusDataVariable {
  employeeStatus: EmployeeStatus
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeStatusService {
  readonly url = 'https://hrms-api.dev.andalsoftware.com/graphql/'

  async createEmployeeStatus(employeeStatus: EmployeeStatus): Promise<boolean> {
    const query = `
      mutation ($employeeStatus: [EmployeeStatusInput!]!) {
        createEmployeeStatuses(employeeStatus: $employeeStatus)
      }
    `
    const variable: EmployeeStatusDataVariable = {
      employeeStatus: employeeStatus
    }
    const createStatus = await this.graphQLFetch<CreateEmployeeStatStatus>(this.url, query, variable)
    return createStatus.createEmployeeStatuses
  }

  async getEmployeeStatuses(): Promise<EmployeeStatus[]> {
    const query = `query {
      employeeStatuses {
        createdAt
        createdBy
        duration
        employeeStatusName
        employeeStatusType
        id
        isPKWTCompensation
        isProbation
        isUsed
        updatedAt
        updatedBy
      }
    }`
    const employeeStatuses = await this.graphQLFetch<GetEmployeeStatusesResponse>(this.url, query, {})
    return employeeStatuses.employeeStatuses
  }

  async updateEmployeeStatus(employeeStatus: EmployeeStatus): Promise<boolean> {
    const query = `
      mutation ($employeeStatus: EmployeeStatusInput!) {
        updateEmployeeStatus(employeeStatus: $employeeStatus)
      }
    `
    const variable: EmployeeStatusDataVariable = {
      employeeStatus: employeeStatus
    }
    const createStatus = await this.graphQLFetch<UpdateEmployeeStatus>(this.url, query, variable)
    return createStatus.updateEmployeeStatus
  }

  async deleteEmployeeStatus(employeeStatusId: string): Promise<boolean> {
    const query = `
      mutation {
        deleteEmployeeStatus(id: "${employeeStatusId}")
      }
    `
    const deleteStatus = await this.graphQLFetch<DeleteEmployeeStatusResponse>(this.url, query, {})
    return deleteStatus.deleteEmployeeStatus
  }

  async graphQLFetch<T>(url: string, query: string, variables: {}): Promise<T> {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'CustomerId': '_d97njgf5objr8ftoxas7sp1heh' },
      body: JSON.stringify({ query, variables })
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const graphQlResp: GraphQLResp<T> = await res.json()
    return graphQlResp.data
  }

}


