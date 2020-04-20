import { ConflictException } from "@nestjs/common";
import { IError } from "interfaces/IError";

/**
 * 코드 데이터 중복(`CONFLICT: 409`) 에러이다.
 */
export default class CdGrpDuplicateException extends ConflictException {
    constructor(errData?: IError | string, ...msgArgs: string[]) {
        if (errData) {
            if (typeof errData === "string") {
                super(errData);
            }
            else {
                const iError = errData as IError;
                iError.msgArgs = msgArgs;
                super(iError);
            }
        }
    }
}