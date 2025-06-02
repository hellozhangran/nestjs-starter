import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from './entities/post.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import { TagEntity } from '../tag/entities/tag.entity';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(CategoryEntity) 
    private readonly categoryRepository: Repository<CategoryEntity>,

    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async create(user: UserEntity, createPostDto: CreatePostDto) {
    const { title } = createPostDto;
    if (!title) {
      throw new BadRequestException('标题不能为空');
    }

    const doc = await this.postRepository.findOne({ where: { title } });
    if (doc) {
      throw new BadRequestException('标题已存在');
    }

    // 不需要先查询 category 和 tags
    const post = this.postRepository.create({
      ...createPostDto,
      category: { id: createPostDto.categoryId },  // 直接用对象字面量，只提供 id
      tags: createPostDto.tagIds?.map(id => ({ id })) || []  // 同上
    });

    const  created = await this.postRepository.save(post);
    return created.id;
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

}
