import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FindComputerToNotifyUseCase } from '../../modules/computer/useCases/findComputerToNotifyUseCase/findComputerToNotifyUseCase';

@Injectable()
export class CronService {
  constructor(
    private readonly findComputerToNotifyUseCase: FindComputerToNotifyUseCase,
  ) {}

  @Cron('0 9,14 * * 1-5')
  async handleNotifyInstalacao() {
    const computers = await this.findComputerToNotifyUseCase.execute();
    for (const computer of computers) {
      const { computerName, responsible } = computer;
      const token = process.env.EMAIL_TOKEN as string;
      await fetch(`${process.env.EMAIL_URL || 'http://192.168.0.22:5000'}/mail-send` as string, {
        method: 'POST',
        body: JSON.stringify({
          title: 'Verificar registro de instalação',
          computerName: computerName,
          body: `Caso o computador <b>${computerName}</b> esteja concluído, atualize o status do mesmo no <a href='http://192.168.0.22/installed-computers'>TaskFlow</a>`,
          to: responsible,
          token: token,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
}
