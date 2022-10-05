import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgpNgImageEditorComponent } from './dgp-ng-image-editor.component';

describe('DgpNgImageEditorComponent', () => {
  let component: DgpNgImageEditorComponent;
  let fixture: ComponentFixture<DgpNgImageEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgpNgImageEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgpNgImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
