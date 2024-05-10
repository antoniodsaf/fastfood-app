import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
export const ApiOkResponseWrapper = <T extends Function>(
  data?: T,
  isArray: boolean = false,
  description?: string
) =>
  applyDecorators(
    ApiExtraModels(data),
    ApiOkResponse({
      description,
      schema: {
        oneOf: [
          {
            properties: {
              status: { type: 'number', default: 200 },
              message: { type: 'string' },
              data: getData(data, isArray)
            }
          }
        ]
      }
    })
  );

const getData = <T extends Function>(data?: T, isArray: boolean = false) => {
  if (isArray) {
    return { type: 'array', items: { $ref: getSchemaPath(data) } };
  }
  return {
    $ref: getSchemaPath(data)
  };
};
