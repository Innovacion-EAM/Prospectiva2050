import { Controller, Get } from '@nestjs/common';
import { HealthResponseDto } from './dto/health-response.dto';

@Controller('health')
export class HealthController {
  @Get()
  check(): HealthResponseDto {
    return {
      status: 'ok',
      servicio: 'hqp2050-api',
      timestamp: new Date().toISOString(),
    };
  }
}