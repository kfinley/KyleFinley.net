import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { WebSocketsApi } from './websockets-api';
import { DataStores } from './data-stores';
import { createLambdaEdge } from './';
import { createAdditionalBehaviorsForRedirects } from './redirects';

// TODO: break this out  to /services/FrontEnd/Infrastructure?

export interface InfraStackProps extends StackProps {
  logLevel: "DEBUG" | "INFO" | "WARN" | "ERROR";
  gitHubClientId: string;
  gitHubClientSecret: string;
  node_env: string;
}

export class InfrastructureStack extends Stack {

  private functionsPath = '../../services/CloudFront/dist/functions';

  constructor(scope: Construct, id: string, props?: InfraStackProps) {
    super(scope, id, props);

    const domainName = this.node.tryGetContext('domainName');

    //TODO: Bad names from previous setup. Have to remove the resources in order to rename them.
    const dataStores = new DataStores(this, 'KyleFinleyNet-DatabaseStack', {
      domainName,
    });

    //TODO: Bad names from previous setup. Have to remove the resources in order to rename them.
    const webSocketsApi = new WebSocketsApi(this, 'KyleFinleyNet-WebSocketsStack', {
      logLevel: props?.logLevel!,
      connectionsTable: dataStores?.connectionsTable!,
      gitHubClientId: props!.gitHubClientId,
      gitHubClientSecret: props!.gitHubClientSecret,
      node_env: props!.node_env
    });

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

    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'CloudFrontOriginAccessIdentity', {
      comment: `${domainName} Domain Hosting Environment`,
    });

    // const apiOriginPolicy = new OriginRequestPolicy(this, 'apiOriginPolicy', {
    //   cookieBehavior: OriginRequestCookieBehavior.all(),
    //   headerBehavior: OriginRequestHeaderBehavior.none(),
    //   queryStringBehavior: OriginRequestQueryStringBehavior.all(),
    // });

    const origin = new origins.S3Origin(dataStores.frontEndBucket, {
      originAccessIdentity: cloudFrontOAI
    });

    const redirectLambda = createLambdaEdge(this, 'Redirects', '../../services/CloudFront/dist/functions', 'redirects.handler');
    const edgeLambdas = [
      {
        eventType: cdk.aws_cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
        functionVersion: redirectLambda.currentVersion
      }
    ];

    const cloudFrontDistribution = new cloudfront.Distribution(this, 'CloudFrontDistribution', {
      domainNames: [domainName],
      defaultBehavior: {
        origin,
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      // example of how to put a REST api behind CF
      // source: https://github.com/apoorvmote/cdk-examples/blob/master/http-api/lib/cloudfront-http-api-stack.ts
      // additionalBehaviors: {
      //   'api/*': {
      //     origin: new HttpOrigin(api.apiEndpoint.replace('https://', '')),
      //     allowedMethods: AllowedMethods.ALLOW_ALL,
      //     cachePolicy: CachePolicy.CACHING_DISABLED,
      //     compress: false,
      //     originRequestPolicy: apiOriginPolicy,
      //     viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      //   }
      // },

      // Handling redirects with Additional Behaviors
      additionalBehaviors: createAdditionalBehaviorsForRedirects({ origin, edgeLambdas }),
      errorResponses: [
        {
          httpStatus: 403,
          responsePagePath: '/index.html', //TODO: fix this...
          responseHttpStatus: 200,
          ttl: cdk.Duration.minutes(0),
        },
        {
          httpStatus: 404,
          responsePagePath: '/index.html', //TODO: fix this...
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
      enableLogging: true,
      logBucket: dataStores.logsBucket,
      logFilePrefix: 'cloudfront-web'
    });


    const imagesCloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'Images-CloudFrontOriginAccessIdentity', {
      comment: `images.${domainName} Domain Hosting Environment`,
    });

    //TODO: remove this and put it behind /media
    const imagesCloudFrontDistribution = new cloudfront.Distribution(this, 'Images-CloudFrontDistribution', {
      // domainNames: [domainName], //TODO: could use an images. subdomain here
      defaultBehavior: {
        origin: new origins.S3Origin(dataStores.mediaBucket, {
          originAccessIdentity: imagesCloudFrontOAI
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
          responsePagePath: '/index.html', //TODO: fix this...
          responseHttpStatus: 200,
          ttl: cdk.Duration.minutes(0),
        },
        {
          httpStatus: 404,
          responsePagePath: '/index.html', //TODO: fix this...
          responseHttpStatus: 200,
          ttl: cdk.Duration.minutes(0),
        },
      ],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      // enabled: true,
      // certificate: certificateManagerCertificate,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      // defaultRootObject: 'index.html',
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
      destinationBucket: dataStores.frontEndBucket,
      distribution: cloudFrontDistribution,
      distributionPaths: ['/*'],
    });

    new CfnOutput(this, 'DeployURL', {
      value: `https://${domainName}`,
    });
  }
}
