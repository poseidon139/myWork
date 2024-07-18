import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailButtonComponent } from "./email-button/email-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmailButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Surya Vardhan';
  openMail(): void {
    let emailAddress = 'suryavardhan261@gmail.com';
    let subject = 'Hello';
    let body = 'I want to receive an email!';
    
    let mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the user's default email client
    window.open(mailtoLink);
  }
}
