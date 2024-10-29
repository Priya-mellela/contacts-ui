import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactOperationsComponent } from './contact-operations.component';

describe('ContactOperationsComponent', () => {
  let component: ContactOperationsComponent;
  let fixture: ComponentFixture<ContactOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
