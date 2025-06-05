import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './modules/common/redis/redis.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly redisService: RedisService
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  // set 一个redis key
  @Post('redis/set')
  async setRedis(@Body() body: any): Promise<any> {
    return await this.redisService.set(body.key, body.value);
  }

  // 获取redis key 的 value
  @Get('redis/get')
  async getRedis(@Query() query: any): Promise<any> {
    try {
      const { key } = query;
      console.log('开始处理 Redis GET 请求，key:', key);
      
      if (!key) {
        console.log('错误：key 参数为空');
        return { error: 'key parameter is required' };
      }
      
      console.log('准备调用 redisService.get');
      const res = await this.redisService.get(key);
      console.log('Redis GET 成功，结果:', res);
      return res;
    } catch (error) {
      console.error('Redis GET 错误:', error);
      throw error;
    }
  }

  // 获取redis基本信息
  @Get('redis/getInfo')
  async getRedisInfo(): Promise<any> {
    return await this.redisService.getInfo();
  }

  @Get('redis/keys')
  async getRedisKeys(): Promise<any> {
    return await this.redisService.keys();
  }
}
