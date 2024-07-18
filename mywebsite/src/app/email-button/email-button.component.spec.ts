import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailButtonComponent } from './email-button.component';

describe('EmailButtonComponent', () => {
  let component: EmailButtonComponent;
  let fixture: ComponentFixture<EmailButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
