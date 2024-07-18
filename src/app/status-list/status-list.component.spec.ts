import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusListComponent } from './status-list.component';

describe('StatusListComponent', () => {
  let component: StatusListComponent;
  let fixture: ComponentFixture<StatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusListComponent]
    })
      .compileComponents();

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
});
