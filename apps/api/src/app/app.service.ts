import { SqliteTestClient, User } from '@full-stack/api/db';
import { UserCreateInput } from '@full-stack/api/generated/db-types';
import { OnModuleDestroy } from '@nestjs/common';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy{
  private readonly logger = new Logger(AppService.name)
  private readonly client: SqliteTestClient = new SqliteTestClient();
  async onModuleDestroy() {
    this.logger.log(`Disconnecting Prisma...`)
    await this.client.$disconnect()
    this.logger.log(`Disconnect Prisma successfully`)
  }
  async onModuleInit() {
    this.logger.log(`Disconnecting Prisma...`)
    await this.client.$connect()
    this.logger.log(`Connect Prisma successfully`)
  }
  async getData(): Promise<{ datas: User[] }> {
    const res = await this.client.user.findMany();
    return { datas: res };
  }

  async addData(dto: UserCreateInput): Promise<{ newData: User }> {
    const res = await this.client.user.create({
      data: dto,
    });
    return { newData: res };
  }
}
