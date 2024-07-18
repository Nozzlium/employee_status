import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusListComponent } from './status-list.component';
import { EmployeeStatusService } from '../employee-status.service';
import jasmine from 'jasmine';

describe('StatusListComponent', () => {
  let service: EmployeeStatusService
  let component: StatusListComponent;
  let fixture: ComponentFixture<StatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusListComponent]
    })
      .compileComponents();

    service = TestBed.inject(EmployeeStatusService)
    fixture = TestBed.createComponent(StatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector(".page-title")?.textContent).toContain("Employee Status List")
  })

  it('should render as many rows as employee status items', async () => {
    const compiled = fixture.nativeElement
    const res = await service.getEmployeeStatuses()
    expect(compiled.querySelectorAll('.dx-data-row').length).toBe(res.length)
  })
});
