import { Controller, Get, Query } from '@nestjs/common';

import { GetEstimateDto } from './dtos/get-estimate.dto';
import { GetRatesDto } from './dtos/get-rates.dto';
import { ExchangesService } from './services/exchanges.service';

@Controller()
export class AppController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Get('/estimate')
  getEstimate(@Query() params: GetEstimateDto) {
    return this.exchangesService.getEstimate(params);
  }

  @Get('/rates')
  getRates(@Query() params: GetRatesDto) {
    return this.exchangesService.getRates(params);
  }
}
