import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttractionService } from './attraction.service';
import { AttractionController } from './attraction.controller';
import { Attraction } from './entities/attraction.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Attraction])],
  controllers: [AttractionController],
  providers: [AttractionService],
})
export class AttractionModule {}
