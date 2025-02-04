import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(email: string, token: string): Promise<void> {
    const confirmationUrl = `http://localhost:3030/signin?token=${token}`;

    const template = `
    <html>
        <body>
          <h1>Confirmez votre inscription</h1>
          <p>Bonjour,</p>
          <p>Veuillez confirmer votre inscription en cliquant sur le lien suivant :</p>
          <p><a href="${confirmationUrl}">Confirmer mon inscription</a></p>
          <p>Cordialement,</p>
          <p>L'équipe de Mazava</p>
        </body>
      </html>
    `;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirmez votre inscription',
      html: template,
      context: {
        email,
        confirmationUrl,
      },
    });
  }
}
