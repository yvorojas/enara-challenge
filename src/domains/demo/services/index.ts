import GetInfoUseCase from './getInfo';
import GetInfoFromClientUseCase from './getInfoFromClient';

export default class DemoUseCases {
  public getInfo = () => new GetInfoUseCase().execute();
  public getInfoFromClient = async () =>
    new GetInfoFromClientUseCase().execute();
}
