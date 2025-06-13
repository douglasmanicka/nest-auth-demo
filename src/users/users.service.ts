import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { User } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) // ← injeta o model Mongoose baseado no schema User
    private readonly userModel: Model<User>, // ← você agora pode acessar Mongo direto
  ) {}

  async signup(dto: SignupDto): Promise<Omit<User, 'password'>> {
    // Verifica se e-mail já está em uso
    const existingUser = await this.userModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Cria hash da senha
    const hash = await bcrypt.hash(dto.password, 10);

    // Cria usuário no banco
    const user = new this.userModel({
      name: dto.name,
      email: dto.email,
      password: hash,
    });

    const savedUser = await user.save();

    // Remove a senha antes de retornar (boas práticas de segurança)

    const { password, _id, ...result } = savedUser.toObject(); // remove a senha

    return {
      //   name: result.name,
      email: result.email,
    } as Omit<User, 'password'>;
  }
}
