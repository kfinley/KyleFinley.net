import { Container } from "inversify-props";

export type MessageCommandProps = {
  connectionId: string,
  message: string | null,
  container: Container
};

export interface IMessageCommand {

  runAsync(props: MessageCommandProps): Promise<any>;
}
