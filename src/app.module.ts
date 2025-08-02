import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntriesModule } from './entries/entries.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EntriesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
