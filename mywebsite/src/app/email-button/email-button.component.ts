import { Component } from '@angular/core';

@Component({
  selector: 'app-email-button',
  standalone: true,
  imports: [],
  templateUrl: './email-button.component.html',
  styleUrl: './email-button.component.css'
})
export class EmailButtonComponent {
  openMail(): void {
    let emailAddress = 'suryavardhan261@gmail.com';
    let subject = 'Hello';
    let body = 'Your Query here !';
    
    let mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the user's default email client
    window.open(mailtoLink);
  }

}
