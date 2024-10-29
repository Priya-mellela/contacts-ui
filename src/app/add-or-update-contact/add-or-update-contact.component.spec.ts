import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateContactComponent } from './add-or-update-contact.component';

describe('AddOrUpdateContactComponent', () => {
  let component: AddOrUpdateContactComponent;
  let fixture: ComponentFixture<AddOrUpdateContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrUpdateContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrUpdateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
