
export type MessageCommandProps = {
  connectionId: string,
  message: string | null
};

export interface IMessageCommand {

  runAsync(props: MessageCommandProps): Promise<any>;
}
