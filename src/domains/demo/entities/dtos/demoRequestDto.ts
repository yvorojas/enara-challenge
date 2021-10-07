import joi from '@hapi/joi';
import EntityValidationException from '../../../../infrastructure/common/exceptions/EntityValidationException';

const getDemoRequestSchema = joi.object().keys({
  validAttribute: joi.string().required(),
});

export default class DemoRequestDto {
  validAttribute: string;
  constructor(request) {
    this.validAttribute = request.validAttribute;
    DemoRequestDto.validate(this);
  }

  static validate = request => {
    const { error } = getDemoRequestSchema.validate(request);
    if (error) {
      const message = error.details.map(({ message }) => message).join(', ');
      throw new EntityValidationException(message, 'DemoRequestDto');
    }
  };
}
