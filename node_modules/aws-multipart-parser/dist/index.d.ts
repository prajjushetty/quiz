import { APIGatewayProxyEvent } from 'aws-lambda';
import { MultipartFormData } from './models';
export declare let parse: (event: APIGatewayProxyEvent, spotText: boolean) => MultipartFormData;
