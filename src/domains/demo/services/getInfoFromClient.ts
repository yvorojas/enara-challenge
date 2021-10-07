import { callToClient } from '../clients/demoClient';

export default class GetInfoFromClientUseCase {
  public execute = async () => callToClient();
}
