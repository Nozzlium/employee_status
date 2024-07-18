import { Injectable } from '@angular/core';
import { EmployeeStatus } from './employee-status';

export interface GraphQLResp<T> {
  data?: T
  error?: GraphQLError
}

interface GraphQLError {
  message: string
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
    if (createStatus.data)
      return createStatus.data.createEmployeeStatuses

    if (createStatus.error)
      throw new Error(createStatus.error.message)

    return false
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
    if (employeeStatuses.data)
      return employeeStatuses.data.employeeStatuses

    if (employeeStatuses.error)
      throw new Error(employeeStatuses.error.message)

    return []
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

    if (createStatus.data)
      return createStatus.data.updateEmployeeStatus

    if (createStatus.error)
      throw new Error(createStatus.error.message)

    return false
  }

  async deleteEmployeeStatus(employeeStatusId: string): Promise<boolean> {
    const query = `
      mutation {
        deleteEmployeeStatus(id: "${employeeStatusId}")
      }
    `
    const deleteStatus = await this.graphQLFetch<DeleteEmployeeStatusResponse>(this.url, query, {})

    if (deleteStatus.data)
      return deleteStatus.data.deleteEmployeeStatus

    if (deleteStatus.error)
      throw new Error(deleteStatus.error.message)

    return false
  }

  async graphQLFetch<T>(url: string, query: string, variables: {}): Promise<GraphQLResp<T>> {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'CustomerId': '_d97njgf5objr8ftoxas7sp1heh' },
      body: JSON.stringify({ query, variables })
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const graphQlResp: GraphQLResp<T> = await res.json()
    return graphQlResp
  }

}


