import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ProductsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
