import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotifyOptions extends Omit<NotificationArgsProps, 'type'> {
  type?: NotificationType;
  placement?: NotificationPlacement;
}

export const useNotify = () => {
  const [api, contextHolder] = notification.useNotification();

  const notify = (options: NotifyOptions) => {
    const { type = 'info', placement = 'bottomRight', ...rest } = options;
    api[type]({
      placement,
      ...rest,
    });
  };

  return { notify, contextHolder };
};
