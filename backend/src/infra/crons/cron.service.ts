import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FindComputerToNotifyUseCase } from '../../modules/computer/useCases/findComputerToNotifyUseCase/findComputerToNotifyUseCase';

@Injectable()
export class CronService {
  constructor(
    private readonly findComputerToNotifyUseCase: FindComputerToNotifyUseCase,
  ) {}

  @Cron('0 12,17 * * 1-5')
  async handleNotifyInstalacao() {
    try {
      const computers = await this.findComputerToNotifyUseCase.execute();

      for (const computer of computers) {
        const { computerName, responsible } = computer;

        const htmlBody = `
          <p>Caso o computador <strong>${computerName}</strong> esteja concluído, 
          atualize o status do mesmo no 
          <a href="http://192.168.0.22/computers-installation">TaskFlow</a></p>
        `.trim();

        const data = {
          title: 'Verificar registro de instalação',
          computerName: computerName,
          body: htmlBody,
          to: responsible,
          token: 'elTLSIvorZSfju3pAvHssH0Yq2eEeQDTo3kKO5t6gKalLk705S',
        };

        const emailUrl = `${
          process.env.EMAIL_URL || 'http://192.168.0.22:5000'
        }/mail-send`;

        const response = await fetch(emailUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.status !== 200) {
          const errorText = await response.text();
          throw new Error(`Erro ao enviar email: ${response.statusText} - ${errorText}`);
        }
      }
    } catch (error) {
      console.error('Erro na execução do cron job:', error);
    }
  }
}
