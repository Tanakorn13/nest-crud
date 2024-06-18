import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttractionDto } from './dto/create-attraction.dto';
import { UpdateAttractionDto } from './dto/update-attraction.dto';
import { Attraction } from './entities/attraction.entity';

@Injectable()
export class AttractionService {

  constructor(
    @InjectRepository(Attraction)
    private attractionRepository: Repository<Attraction>,
  ) {}


  async create(createAttractionDto: CreateAttractionDto) {
    const attraction = await this.attractionRepository.create(createAttractionDto)
    const toCreate = await this.attractionRepository.insert(attraction)
    return toCreate
  }

  async findAll() {
    const attractions = await this.attractionRepository.find()
    return attractions
  }

  async findOne(id: number) : Promise<Attraction | null>{
    const attraction = await this.attractionRepository.findOneBy({id:id})
    return attraction
  }

  async update(id: number, updateAttractionDto: UpdateAttractionDto) {
    let attraction = await this.attractionRepository.findOneBy({id:id})
    attraction = {
      ...attraction,
      ...updateAttractionDto
    }
    const toUpdate = await this.attractionRepository.save(attraction)
    return toUpdate
  }

  async remove(id: number) {
    const toDelete = await this.attractionRepository.delete({id:id})
    return toDelete
  }
}
