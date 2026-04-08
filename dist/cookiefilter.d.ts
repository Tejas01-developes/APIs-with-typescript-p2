import { NextFunction, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
export declare const cookiefilter: (req: JwtPayload, resp: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=cookiefilter.d.ts.map