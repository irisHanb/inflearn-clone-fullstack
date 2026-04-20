import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSectionsDto } from './dto/create-sections.dto';
import { Section as SectionEntity } from 'src/_gen/prisma-class/section';
import { UpdateSectionsDto } from './dto/update-sections.dto';
import type { Request } from 'express';

@ApiTags('섹션')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post('courses/:courseId/sections')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '섹션 생성',
    description: '특정 강좌에 섹션을 생성합니다.',
  })
  @ApiParam({ name: 'courseId', description: '코스 ID' })
  @ApiBody({ type: CreateSectionsDto })
  @ApiOkResponse({
    description: '섹션이 성공적으로 생성되었습니다.',
    type: SectionEntity,
  })
  create(
    @Param('courseId') courseId: string,
    @Body() createSectionsDto: CreateSectionsDto,
    @Req() req: Request,
  ) {
    return this.sectionsService.create(
      courseId,
      createSectionsDto,
      req.user!.sub,
    );
  }

  @Get(':sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '섹션 상세 정보',
    description: '섹션을 조회합니다.',
  })
  @ApiParam({ name: 'sectionId', description: '섹션 ID' })
  @ApiOkResponse({
    description: '섹션 정보가 성공적으로 조회되었습니다.',
    type: SectionEntity,
  })
  findOne(@Param('sectionId') sectionId: string, @Req() req: Request) {
    return this.sectionsService.findOne(sectionId, req.user!.sub);
  }

  @Patch(':sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '섹션 수정',
    description: '특정 섹션의 정보를 수정합니다.',
  })
  @ApiParam({ name: 'sectionId', description: '섹션 ID' })
  @ApiBody({ type: UpdateSectionsDto })
  @ApiOkResponse({
    description: '섹션 정보가 성공적으로 수정되었습니다.',
    type: SectionEntity,
  })
  update(
    @Param('sectionId') sectionId: string,
    @Body() updateSectionDto: UpdateSectionsDto,
    @Req() req: Request,
  ) {
    return this.sectionsService.update(
      sectionId,
      updateSectionDto,
      req.user!.sub,
    );
  }

  @Delete(':sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '섹션 삭제',
    description: '특정 섹션을 삭제합니다.',
  })
  @ApiParam({ name: 'sectionId', description: '섹션 ID' })
  @ApiOkResponse({
    description: '섹션 정보가 성공적으로 삭제되었습니다.',
    type: SectionEntity,
  })
  delete(@Param('sectionId') sectionId: string, @Req() req: Request) {
    return this.sectionsService.delete(sectionId, req.user!.sub);
  }
}
