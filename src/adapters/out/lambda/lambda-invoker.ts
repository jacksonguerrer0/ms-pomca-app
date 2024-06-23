import { Injectable } from '@nestjs/common';
import { Lambda } from 'aws-sdk';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LambdaInvoker {
  private lambda: Lambda;

  constructor() {
    this.lambda = new Lambda({
      region: process.env.AWS_REGION,
    });
  }

  invokeLambda<T>(functionName: string, payload: any): Observable<T> {
    const params = {
      FunctionName: functionName,
      Payload: JSON.stringify(payload),
    };

    return from(this.lambda.invoke(params).promise()).pipe(
      map((response) => {
        if (response.StatusCode !== 200) {
          throw new Error(
            `Error invocando la función Lambda: ${response.StatusCode}`,
          );
        }
        return JSON.parse(response.Payload as string);
      }),
    );
  }
}
