import EmailRequest from "../../../api/requests/email-request";

interface IEmailService {
    send(template: string, request: EmailRequest): Promise<boolean>
}

export default IEmailService;
