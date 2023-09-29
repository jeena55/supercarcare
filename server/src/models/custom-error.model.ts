export class CustomError {
    message!: string;
    status!: number;
    additionalInfo!: any;

    constructor(message: string, status: number = 500, additionalInfo: any = "ไม่มีข้อมูลเพิ่มเติมแนบมาด้วยจากการเกิดข้อผิดพลาด") {
        this.message = message;
        this.status = status;
        this.additionalInfo = additionalInfo
    }
}