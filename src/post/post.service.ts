import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postRepo: typeof Post,
    private fileService: FilesService,
  ) {}

  async create(dto: CreatePostDto, img: any) {
    const fileName = await this.fileService.createFile(img);
    const post = await this.postRepo.create({ ...dto, img: fileName });
    return post;
  }
}
