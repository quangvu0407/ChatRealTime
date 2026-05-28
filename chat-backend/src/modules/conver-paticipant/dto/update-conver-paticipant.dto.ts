import { PartialType } from '@nestjs/mapped-types';
import { CreateConverPaticipantDto } from './create-conver-paticipant.dto';

export class UpdateConverPaticipantDto extends PartialType(CreateConverPaticipantDto) {}
