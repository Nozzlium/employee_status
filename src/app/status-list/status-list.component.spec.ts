import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusListComponent } from './status-list.component';
import { EmployeeStatusService } from '../employee-status.service';

describe('StatusListComponent', () => {
  let service: EmployeeStatusService
  let component: StatusListComponent;
  let fixture: ComponentFixture<StatusListComponent>;

  beforeEach(async () => {
    jasmine.clock().install()
    await TestBed.configureTestingModule({
      imports: [StatusListComponent]
    })
      .compileComponents();

    service = TestBed.inject(EmployeeStatusService)
    fixture = TestBed.createComponent(StatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(async () => {
    jasmine.clock().uninstall()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector(".page-title")?.textContent).toContain("Employee Status List")
  })

  it('should spawn a creation form when the create button is clicked', async () => {
    const compiled = fixture.nativeElement as HTMLElement
    const button = compiled.querySelector('.create-button') as HTMLButtonElement

    button.click()

    await fixture.whenStable()

    console.log(compiled.innerHTML)
    expect(compiled.querySelector('.dx-form')).toBeTruthy()
  })

  it('should render as many rows as employee status items', async () => {
    const compiled = fixture.nativeElement as HTMLElement
    jasmine.clock().tick(1000)
    const res = await service.getEmployeeStatuses()
    expect(compiled.querySelectorAll('.dx-data-row').length).toBe(res.length)
  })
});
