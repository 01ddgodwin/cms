import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocummentEditComponent } from './documment-edit.component';

describe('DocummentEditComponent', () => {
  let component: DocummentEditComponent;
  let fixture: ComponentFixture<DocummentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocummentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocummentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
