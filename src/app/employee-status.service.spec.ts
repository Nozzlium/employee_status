import { TestBed } from '@angular/core/testing';

import { EmployeeStatusService, GetEmployeeStatusesResponse, GraphQLResp, CreateEmployeeStatStatus } from './employee-status.service';
import { EmployeeStatus } from './employee-status';

describe('EmployeeStatusService', () => {
  let service: EmployeeStatusService;

  let dummyEmployeeStatus: EmployeeStatus = {
    createdAt: 1719822909024,
    createdBy: null,
    duration: null,
    employeeStatusName: "Permanent",
    employeeStatusType: "PKWTT",
    id: "01906d6e-fe56-72ff-a2c1-796a756959c3",
    isPKWTCompensation: null,
    isProbation: false,
    isUsed: true,
    updatedAt: 1719822909024,
    updatedBy: null
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeStatusService);
  });

  it('get should return a list of employee statuses', async () => {
    const dummyResponse: GraphQLResp<GetEmployeeStatusesResponse> = {
      data: {
        employeeStatuses: [
          {
            createdAt: 1719822909024,
            createdBy: null,
            duration: null,
            employeeStatusName: "Permanent",
            employeeStatusType: "PKWTT",
            id: "01906d6e-fe56-72ff-a2c1-796a756959c3",
            isPKWTCompensation: null,
            isProbation: false,
            isUsed: true,
            updatedAt: 1719822909024,
            updatedBy: null
          },
          {
            "createdAt": 1719822909024,
            "createdBy": null,
            "duration": 12,
            "employeeStatusName": "Contract",
            "employeeStatusType": "PKWT",
            "id": "01906d6e-fe57-768e-9585-5f37ddf43f73",
            "isPKWTCompensation": true,
            "isProbation": null,
            "isUsed": false,
            "updatedAt": 1719822909024,
            "updatedBy": null
          }
        ]
      }
    }
    spyOn(service, 'graphQLFetch').and.resolveTo(dummyResponse)
    const res = await service.getEmployeeStatuses()
    expect(res).toBe(dummyResponse.data!.employeeStatuses)
  })

  it('get should throw an exception if server returns error', async () => {
    const dummyResponse: GraphQLResp<GetEmployeeStatusesResponse> = {
      error: {
        message: "error gilimanuk"
      }
    }

    spyOn(service, 'graphQLFetch').and.resolveTo(dummyResponse)
    await expectAsync(service.getEmployeeStatuses()).toBeRejectedWithError()
  })

  it('create should return true if success', async () => {
    const dummyResponse: GraphQLResp<CreateEmployeeStatStatus> = {
      data: {
        createEmployeeStatuses: true
      }
    }

    spyOn(service, 'graphQLFetch').and.resolveTo(dummyResponse)
    const res = await service.createEmployeeStatus(dummyEmployeeStatus)
    expect(res).toBeTrue()
  })

  it('create should throw error if failed', async () => {
    const dummyResponse: GraphQLResp<GetEmployeeStatusesResponse> = {
      error: {
        message: "error gilimanuk"
      }
    }

    spyOn(service, 'graphQLFetch').and.resolveTo(dummyResponse)
    await expectAsync(service.createEmployeeStatus(dummyEmployeeStatus)).toBeRejectedWithError()
  })

});
