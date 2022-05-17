import { Subject } from 'rxjs';

const subject = new Subject();

export const messageService = {
    sendMessage: (message,type) => subject.next({ text: message,severity:type }),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
};