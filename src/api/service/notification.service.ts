import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { Mail } from 'src/helpers/constant';

@Injectable()
export class NotificationService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  async sendEmailWithTemplate(payload: Mail) {
    const mail = {
      to: payload['to'],
      subject: payload['subject'],
      from: '<harryadward1@gmail.com>',
      text: payload['text'],
      html: payload['html'],
      templateId: payload['templateId'],
      dynamicTemplateData: payload['templateData'],
    };
    return await SendGrid.send(mail);
  }
}
