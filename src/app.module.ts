import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { ConfigModule,ConfigService } from '@nestjs/config';
import { ConfigModule, } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', }),
    
    // Conectar ao MongoDB usando a variável MONGO_URI do .env
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URI,  // Acessando a variável de ambiente MONGO_URI
      }),
    }),

    //  // Conectar ao MongoDB usando a variável de ambiente
    //  MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService], // Injeta o ConfigService para acessar as variáveis
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGO_URI'), // Carrega a URI do MongoDB do .env
    //   }),
    // }),

  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
