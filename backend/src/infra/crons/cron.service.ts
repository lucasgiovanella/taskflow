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
    try {
      const computers = await this.findComputerToNotifyUseCase.execute();

      for (const computer of computers) {
        const { computerName, responsible } = computer;

        const data = {
          title: 'Verificar registro de instalação',
          computerName: computerName,
          body: `Caso o computador <b>${computerName}</b> esteja concluído, atualize o status do mesmo no <a href='http://192.168.0.22/installed-computers'>TaskFlow</a>`,
          to: responsible,
          token: 'elTLSIvorZSfju3pAvHssH0Yq2eEeQDTo3kKO5t6gKalLk705S',
        };

        const emailUrl = `${
          process.env.EMAIL_URL || 'http://192.168.0.22:5000'
        }/mail-send`;

        const response = await fetch(emailUrl, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao enviar email: ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error('Erro na execução do cron job:', error);
    }
  }
}
