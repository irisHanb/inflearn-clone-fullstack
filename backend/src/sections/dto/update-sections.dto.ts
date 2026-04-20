import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateSectionsDto } from './create-sections.dto';

export class UpdateSectionsDto extends PartialType(CreateSectionsDto) {
  @ApiProperty({ description: '섹션 설명', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '섹션 순서', required: false })
  @IsNumber()
  @IsOptional()
  order?: number;
}
