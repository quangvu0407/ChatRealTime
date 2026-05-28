import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConverPaticipantService } from './conver-paticipant.service';
import { CreateConverPaticipantDto } from './dto/create-conver-paticipant.dto';
import { UpdateConverPaticipantDto } from './dto/update-conver-paticipant.dto';

@Controller('conver-paticipant')
export class ConverPaticipantController {
  constructor(private readonly converPaticipantService: ConverPaticipantService) {}

  @Post()
  create(@Body() createConverPaticipantDto: CreateConverPaticipantDto) {
    return this.converPaticipantService.create(createConverPaticipantDto);
  }

  @Get()
  findAll() {
    return this.converPaticipantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.converPaticipantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConverPaticipantDto: UpdateConverPaticipantDto) {
    return this.converPaticipantService.update(+id, updateConverPaticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.converPaticipantService.remove(+id);
  }
}
