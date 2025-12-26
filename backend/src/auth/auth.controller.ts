import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Kullanıcı kayıt endpoint'i
   * POST /auth/register
   * Yeni bir kullanıcı oluşturur ve JWT token döner
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Kullanıcı giriş endpoint'i
   * POST /auth/login
   * Email ve password ile giriş yapar ve JWT token döner
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Token doğrulama ve kullanıcı bilgilerini getirme endpoint'i
   * GET /auth/me
   * JWT token'ı doğrular ve mevcut kullanıcının bilgilerini döner
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getMe(@GetUser() user: User) {
    const { password, ...result } = user;
    return result;
  }
}

