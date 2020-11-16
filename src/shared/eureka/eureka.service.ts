import { BeforeApplicationShutdown, Injectable, OnModuleInit } from '@nestjs/common';
import { Eureka } from 'eureka-js-client';
import { AppLogger } from '../app-logger/app-logger.service';

@Injectable()
export class EurekaService implements OnModuleInit, BeforeApplicationShutdown {
  readonly client: Eureka;
  constructor(private appLogger: AppLogger) {
    this.appLogger.setContext("EurekaService");
    this.client = new Eureka({
      // application instance information
      instance: {
        app: "main-service",
        hostName: "localhost",
        instanceId: "main-service",
        ipAddr: "127.0.0.1",
        port: {
          $: parseInt(process.env.PORT) || 3000,
          "@enabled": true
        },
        statusPageUrl: "http://localhost:3000/actuator/info",
        healthCheckUrl: "http://localhost:3000/actuator/info",
        vipAddress: "main-service",
        dataCenterInfo: {
          "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
          name: "MyOwn"
        }
      },
      eureka: {
        // eureka server host / port
        host: "127.0.0.1",
        port: 8761,
        servicePath: "/eureka/apps/",
        fetchRegistry: true,
        registerWithEureka: true,
        maxRetries: 5,
        requestRetryDelay: 2000
      },
      logger: appLogger
    });
  }
  onModuleInit(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.start((error) => {
        if (error) {
          this.appLogger.error(error);
          reject(error);
          return;
        }
        this.appLogger.info("Main Server registered");
        resolve();
      });
    });
  }
  beforeApplicationShutdown(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.stop((error) => {
        if (error) {
          this.appLogger.error(error);
          return reject()
        }
        this.appLogger.info("Main Server de-registered");
        resolve()
      });
    });
  }
}
