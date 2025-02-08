import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgpNgTablesComponent } from './dgp-ng-tables.component';

describe('DgpNgTablesComponent', () => {
  let component: DgpNgTablesComponent;
  let fixture: ComponentFixture<DgpNgTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DgpNgTablesComponent]
    });
    fixture = TestBed.createComponent(DgpNgTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
