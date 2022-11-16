import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import { AttributeType, BillingMode, Table, TableEncryption } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DatabaseStack extends Stack {

  readonly connectionsTable: Table;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.connectionsTable = new Table(this, 'WebSockets-Connections', {
      partitionKey: { name: 'userId', type: AttributeType.STRING },
      sortKey: { name: 'connectionId', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
      encryption: TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: false // set to "true" to enable PITR
    });
  }
}
