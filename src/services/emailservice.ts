
import path from 'path'
import fs from 'fs'
import sgMail, { MailService } from '@sendgrid/mail';
import IEmailService from './interfaces/iemail.service';
import config from '../config';
import EmailRequest from '../requests/email.request';

class EmailService implements IEmailService {

    //#region dependencies
    private PATH: string;
    private EXTENSION: string;
    private SECRET: string;
    private FROM: string;

    private _sendgrid: MailService;
    //#endregion

    //#region singleton
    private static _instance: IEmailService;

    protected constructor() {
        this.PATH = path.join(__dirname, '..', config.email.templates);
        this.EXTENSION = config.email.extension;
        this.SECRET = config.email.sendgrid.secret;
        this.FROM = config.email.sendgrid.from;

        this._sendgrid = sgMail;
        this._sendgrid.setApiKey(this.SECRET);
    }

    static instance(): IEmailService {
        if (!this._instance) this._instance = new EmailService();
        return this._instance
    }
    //#endregion

    public async send(template: string, request: EmailRequest): Promise<boolean> {
        try {
            const html: string = await this.getTemplate(template);
            if (!html) return false;

            await this._sendgrid.send({
                to: request.to,
                from: this.FROM,
                subject: request.subject,
                html: await this.setParams(html, request.bodyParms)
            });

            return true;
        } catch (err) {
            console.error('Send email error:', err);
            return false;
        }
    }


    private async getTemplate(template: string): Promise<string> {

        const filePath = `${path.join(this.PATH, `${template}${this.EXTENSION}`)}`;

        if (!fs.existsSync(filePath)) return "";

        try {
            return await fs.promises.readFile(filePath, 'utf8');
        } catch (error) {
            console.error('Error reading file:', error);
            return "";
        }
    }

    private async setParams(html: string, params: string[]): Promise<string> {

        for (let index = 0; index < params.length; index++) {
            const param = `PARAM${index}`;
            const value = params[index];
            html = html.replace(param, value);
        }

        return await Promise.resolve(html);
    }
}

export default EmailService;