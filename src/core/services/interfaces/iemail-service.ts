import EmailRequest from "../../requests/email-request";

interface IEmailService {
    send(template: string, request: EmailRequest): Promise<boolean>
}

export default IEmailService;
