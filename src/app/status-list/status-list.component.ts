import { Component, inject, ViewChild } from '@angular/core';
import { EmployeeStatus } from '../employee-status';
import { DxDataGridModule, DxButtonModule, DxDataGridComponent, DxToastModule } from 'devextreme-angular';
import { EmployeeStatusService } from '../employee-status.service';
import { CommonModule } from '@angular/common';
import { RowInsertingEvent, RowRemovingEvent, RowUpdatingEvent } from 'devextreme/ui/data_grid';

interface EmployeeStatusTypeLookup {
  id: string;
  display: string;
}

interface ToastInfo {
  isVisible: boolean;
  message: string;
  type: 'info' | 'success' | 'error';
}

@Component({
  selector: 'app-status-list',
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxToastModule
  ],
  templateUrl: './status-list.component.html',
  styleUrl: './status-list.component.css'
})
export class StatusListComponent {
  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent;

  employeeStatusService: EmployeeStatusService = inject(EmployeeStatusService)
  employeeStatuses: EmployeeStatus[] = []
  toastInfo: ToastInfo = {
    isVisible: false,
    message: "",
    type: 'info'
  }

  employeeTypeLookupData: EmployeeStatusTypeLookup[] = [
    {
      id: "PKWT",
      display: "Permanent Employment (PKWT)"
    }, {
      id: "PKWTT",
      display: "Time Based Employment (PKWTT)"
    }
  ]

  constructor() {
    (async () => {
      try {
        this.employeeStatuses = await this.employeeStatusService.getEmployeeStatuses()
      } catch (error) {
        this.toastInfo = {
          isVisible: true,
          message: 'failed to retrieve informations',
          type: 'error'
        }
      }
    })()
  }

  createItem(e: RowInsertingEvent) {
    (async () => {
      try {
        const tempEmployeeStatusData = e.data as EmployeeStatus
        const creationStatus = await this.employeeStatusService.createEmployeeStatus(tempEmployeeStatusData)
        if (!creationStatus) {
          this.toastInfo = {
            isVisible: true,
            message: 'failed to create',
            type: 'error'
          }
          e.cancel = true
          return
        }
        this.toastInfo = {
          isVisible: true,
          message: 'creation was a success',
          type: 'success'
        }
      } catch (error) {
        this.toastInfo = {
          isVisible: true,
          message: 'failed to create',
          type: 'error'
        }
        e.cancel = true
      }
    })()
  }

  updateItem(e: RowUpdatingEvent) {
    (async () => {
      try {
        const updated = { ...e.oldData, ...e.newData }
        const updateStatus = await this.employeeStatusService.updateEmployeeStatus(updated)
        if (!updateStatus) {
          this.toastInfo = {
            isVisible: true,
            message: 'failed to update',
            type: 'error'
          }
          e.cancel = true
          return
        }
        this.toastInfo = {
          isVisible: true,
          message: 'update was a success',
          type: 'success'
        }
      } catch (error) {
        this.toastInfo = {
          isVisible: true,
          message: 'failed to update',
          type: 'error'
        }
        e.cancel = true
      }
    })()
  }

  deleteItem(e: RowRemovingEvent) {
    (async () => {
      try {
        const tempEmployeeStatusData = e.data as EmployeeStatus
        const deletionStatus = await this.employeeStatusService.deleteEmployeeStatus(tempEmployeeStatusData.id)
        if (!deletionStatus) {
          this.toastInfo = {
            isVisible: true,
            message: 'failed to update',
            type: 'error'
          }
          e.cancel = true
          return;
        }
        this.toastInfo = {
          isVisible: true,
          message: 'deletion was a success',
          type: 'success'
        }
      } catch (error) {
        this.toastInfo = {
          isVisible: true,
          message: 'failed to update',
          type: 'error'
        }
        e.cancel = true

      }
    })()
  }

  getDescription = (employeeStatus: EmployeeStatus) => {
    switch (employeeStatus.employeeStatusType) {
      case "PKWT":
        return employeeStatus.isPKWTCompensation ? "With Compensation" : "Without Compensation"
      case "PKWTT":
        return employeeStatus.isProbation ? "Probation" : "Permanent"
      default:
        return ""
    }
  }

  getEmployeeStatusTypeDefinition(cellInfo: any) {
    switch (cellInfo.value) {
      case "PKWT":
        console.log("masuk satu", cellInfo)
        return "Permanent Employment (PKWT)";
      case "PKWTT":
        console.log("masuk dua", cellInfo)
        return "Time Based Employment (PKWTT)"
      default:
        console.log("masuk tiga", cellInfo)
        return "";
    }
  }

  onCreateClick() {
    this.grid.instance.addRow()
  }
}
