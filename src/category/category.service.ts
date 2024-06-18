import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(createCategoryDto)
    const toCreate = await this.categoryRepository.insert(category)
    return toCreate
  }

  async findAll() {
    const categories = await this.categoryRepository.find()
    return categories
  }

  async findOne(id: number) : Promise<Category | null>{
    const category = await this.categoryRepository.findOneBy({id: id})
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    let category = await this.categoryRepository.findOneBy({id: id})
    category = {
      ...category,
      ...updateCategoryDto
    }
    const toUpdate = await this.categoryRepository.save(category)
    return toUpdate
  }

  async remove(id: number) {
    const toDelete = await this.categoryRepository.delete({id: id})
    return toDelete
  }
}
