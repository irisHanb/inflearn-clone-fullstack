import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateCourseDto } from 'src/courses/dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSectionsDto } from './dto/update-sections.dto';
import { CreateSectionsDto } from './dto/create-sections.dto';

@Injectable()
export class SectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    courseId: string,
    createSectionsDto: CreateSectionsDto,
    userId: string,
  ) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('코스를 찾을 수 없습니다.');
    }

    if (course.instructorId !== userId) {
      throw new UnauthorizedException(
        '이 코스에 섹션을 추가할 권한이 없습니다.',
      );
    }

    const lastSection = await this.prisma.section.findFirst({
      where: { courseId },
      orderBy: { order: 'desc' },
    });

    const order = lastSection ? lastSection.order + 1 : 0;

    return this.prisma.section.create({
      data: {
        ...createSectionsDto,
        order,
        course: { connect: { id: courseId } },
      },
    });
  }

  async findOne(sectionId: string, userId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        course: {
          select: {
            instructorId: true,
          },
        },
        lectures: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!section) {
      throw new NotFoundException('섹션을 찾을 수 없습니다.');
    }

    if (section.course.instructorId !== userId) {
      throw new UnauthorizedException('이 섹션을 가져올 권한이 없습니다.');
    }

    return section;
  }

  async update(
    sectionId: string,
    updateSectionsDto: UpdateSectionsDto,
    userId: string,
  ) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        course: {
          select: {
            instructorId: true,
          },
        },
      },
    });

    if (!section) {
      throw new NotFoundException('섹션을 찾을 수 없습니다.');
    }

    if (section.course.instructorId !== userId) {
      throw new UnauthorizedException('이 섹션을 수정할 권한이 없습니다.');
    }

    return this.prisma.section.update({
      where: { id: sectionId },
      data: updateSectionsDto,
    });
  }

  async delete(sectionId: string, userId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        course: {
          select: {
            instructorId: true,
          },
        },
        lectures: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!section) {
      throw new NotFoundException('섹션을 찾을 수 없습니다.');
    }

    if (section.course.instructorId !== userId) {
      throw new UnauthorizedException('이 섹션을 삭제할 권한이 없습니다.');
    }

    await this.prisma.section.delete({
      where: { id: sectionId },
    });

    return section;
  }
}
