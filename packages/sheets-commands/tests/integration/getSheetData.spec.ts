import 'reflect-metadata'; 

import { container } from '../../src/inversify.config';
import { GetSheetData } from '../../src/getSheetData';
import { bootstrapper } from "../../src/bootstrapper";


describe('GetSheetDataCommand', () => {

  it('should get data', async () => {

    bootstrapper(container);

    const result = await new GetSheetData().runAsync({ id: '1MvHpVjLTaSGkCZzjmkSxL3nhZBLQOP9SQKYRxu4wWgg', sheet: 'Jazz Standards', range: 'A:B' });
    
    expect(result).toBeTruthy();
  });
});
