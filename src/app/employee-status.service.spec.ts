import { TestBed } from '@angular/core/testing';

import { EmployeeStatusService, GetEmployeeStatusesResponse } from './employee-status.service';

describe('EmployeeStatusService', () => {
  let service: EmployeeStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeStatusService);
  });

  it('should return a list of employee statuses', async () => {
    const dummyResponse: GetEmployeeStatusesResponse = {
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
    spyOn(service, 'graphQLFetch').and.resolveTo(dummyResponse)
    const res = await service.getEmployeeStatuses()
    console.log(res)

  })

});
