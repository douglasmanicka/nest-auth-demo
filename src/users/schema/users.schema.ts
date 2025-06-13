import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware 'pre' para hash da senha antes de salvar
UserSchema.pre('save', async function (next) {
  const user = this; // "this" refere-se ao documento do usuário

  // Verifica se a senha foi alterada ou é um novo usuário
  if (!user.isModified('password')) return next();

  try {
    // Gerar um salt com 10 rounds
    const salt = await bcrypt.genSalt(10);

    // Hash da senha
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Substitui a senha em plain text pela senha hasheada
    user.password = hashedPassword;

    next(); // Continua o processo de salvamento
  } catch (err) {
    return next(err); // Caso ocorra um erro, passamos para o next com o erro
  }
});
