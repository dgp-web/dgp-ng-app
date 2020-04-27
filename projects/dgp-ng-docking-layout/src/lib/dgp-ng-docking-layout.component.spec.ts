import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgpNgDockingLayoutComponent } from './dgp-ng-docking-layout.component';

describe('DgpNgDockingLayoutComponent', () => {
  let component: DgpNgDockingLayoutComponent;
  let fixture: ComponentFixture<DgpNgDockingLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgpNgDockingLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgpNgDockingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
