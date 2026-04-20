import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSectionsDto {
  @ApiProperty({ description: '섹션 제목' })
  @IsString()
  @IsNotEmpty()
  title: string;
}
