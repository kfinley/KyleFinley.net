import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class InfrastructureStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const domainName = this.node.tryGetContext('domainName');

    const {
      accountId,
      region,
    } = new cdk.ScopedAws(this);

    const hostedZone = new route53.PublicHostedZone(this, 'HostedZone', {
      zoneName: domainName,
      comment: `Hosted zone for ${domainName}`
    });

    const certificateManagerCertificate = new acm.DnsValidatedCertificate(this, 'CertificateManagerCertificate', {
      domainName,
      hostedZone,
      region: region,
      validation: acm.CertificateValidation.fromDns(),
    });

    const s3Bucket = new s3.Bucket(this, 'S3Bucket', {
      bucketName: domainName,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'CloudFrontOriginAccessIdentity', {
      comment: `${domainName} Domain Hosting Environment`,
    });

    const cloudFrontDistribution = new cloudfront.Distribution(this, 'CloudFrontDistribution', {
      domainNames: [domainName],
      defaultBehavior: {
        origin: new origins.S3Origin(s3Bucket, {
          originAccessIdentity: cloudFrontOAI
        }),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responsePagePath: '/index.html',
          responseHttpStatus: 200,
          ttl: cdk.Duration.minutes(0),
        },
        {
          httpStatus: 404,
          responsePagePath: '/index.html',
          responseHttpStatus: 200,
          ttl: cdk.Duration.minutes(0),
        },
      ],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      enabled: true,
      certificate: certificateManagerCertificate,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      defaultRootObject: 'index.html',
      enableIpv6: true,
    });

    new route53.ARecord(this, 'ARecord', {
      recordName: domainName,
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(cloudFrontDistribution)
      ),
    });

    new route53.ARecord(this, 'FTPRecord', {
      recordName: `ftp.${domainName}`,
      zone: hostedZone,
      target: route53.RecordTarget.fromIpAddresses('143.95.251.45')
    })

    new route53.MxRecord(this, 'MXRecords', {
      recordName: domainName,
      zone: hostedZone,
      values: [{
        hostName: 'alt1.aspmx.l.google.com',
        priority: 5
      },
      {
        hostName: 'alt2.aspmx.l.google.com',
        priority: 5
      },
      {
        hostName: 'aspmx.l.google.com',
        priority: 1
      },
      {
        hostName: 'aspmx2.googlemail.com',
        priority: 10
      },
      {
        hostName: 'aspmx3.googlemail.com',
        priority: 10
      },
      {
        hostName: `mail.${domainName}`,
        priority: 20
      }
      ]
    });

    new route53.CnameRecord(this, 'MailCNameRecord', {
      recordName: `mail.${domainName}`,
      zone: hostedZone,
      domainName: 'ghs.google.com'
    })

    new route53.TxtRecord(this, 'TxtRecord', {
      recordName: domainName,
      zone: hostedZone,
      values: [
        'v=spf1 include:aspmx.googlemail.com ~all' //TODO: research this... ~all is probably to wide here. This was pulled from old DNS records.
      ]
    })

    new s3deploy.BucketDeployment(this, 'S3BucketDeploy', {
      sources: [s3deploy.Source.asset('../packages/vue2-client/dist')],
      destinationBucket: s3Bucket,
      distribution: cloudFrontDistribution,
      distributionPaths: ['/*'],
    });

    new CfnOutput(this, 'DeployURL', {
      value: `https://${domainName}`,
    });
  }
}
