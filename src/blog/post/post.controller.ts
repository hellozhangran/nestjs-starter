import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { RoleGuard, Roles } from 'src/auth/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/user/entities/user.entity';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @Roles('root', 'author')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  create(@Body() createPostDto: CreatePostDto, @Req() req: { user: UserEntity }) {
    return this.postService.create(req.user, createPostDto);
  }

  @Get('find/:id')
  @Roles('root', 'author', 'visitor')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  find(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Get('findAll')
  @Roles('root', 'author', 'visitor')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  findAll() {
    return this.postService.findAll();
  }
  
}
